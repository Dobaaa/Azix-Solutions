import { google } from "googleapis";
import { NextResponse } from "next/server";
import { Resend } from "resend";

type BookingPayload = {
  service: string;
  fullName: string;
  email: string;
  [key: string]: unknown;
};

function stringifyValue(value: unknown) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object" && value !== null) return JSON.stringify(value);
  return String(value ?? "");
}

function normalizeTitle(title: string) {
  return title.replace(/\s+/g, " ").trim().toLowerCase();
}

async function saveToGoogleSheets(payload: BookingPayload) {
  const clientEmail =
    process.env.GOOGLE_CLIENT_EMAIL ?? process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId =
    process.env.GOOGLE_SHEET_ID ?? process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error("Missing Google Sheets environment variables.");
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  const now = new Date().toLocaleString("en-EG");

  const tabNameMap: Record<string, string[]> = {
    ppl: [
      process.env.GOOGLE_TAB_PPL ?? "",
      "PPL Orders",
      "PPL  Orders",
      "PPL Order",
    ],
    "cold-calling": [
      process.env.GOOGLE_TAB_COLD_CALLING ?? "",
      "Cold Calling",
      "Cold  Calling",
    ],
    "virtual-assistant": [
      process.env.GOOGLE_TAB_VA ?? "",
      "Virtual Assistant",
      "Virtual  Assistant",
    ],
  };
  const tabCandidates = (tabNameMap[payload.service] ?? ["Orders"]).filter(Boolean);

  const meta = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  });
  const existingTitles =
    meta.data.sheets?.map((sheet) => sheet.properties?.title).filter(Boolean) ?? [];

  const normalizedToActual = new Map(
    existingTitles.map((title) => [normalizeTitle(title as string), title as string]),
  );

  const tabName =
    tabCandidates.find((candidate) => existingTitles.includes(candidate)) ??
    tabCandidates
      .map((candidate) => normalizedToActual.get(normalizeTitle(candidate)))
      .find(Boolean);

  const fallbackTab =
    process.env.GOOGLE_DEFAULT_TAB?.trim() ||
    existingTitles.find((title) => normalizeTitle(title as string) === normalizeTitle("الورقة1")) ||
    existingTitles[0];
  const resolvedTabName = tabName ?? fallbackTab;

  if (!resolvedTabName) {
    throw new Error("No sheet tabs found in the target spreadsheet.");
  }

  const escapedTabName = resolvedTabName.replace(/'/g, "''");

  const row =
    payload.service === "ppl"
      ? [
        now,
        payload.fullName,
        payload.email,
        stringifyValue(payload.leadsRequired),
        stringifyValue(payload.targetMarket),
        stringifyValue(payload.sqftRange),
        stringifyValue(payload.bedBathCount),
        stringifyValue(payload.propertyCondition),
        stringifyValue(payload.notes),
      ]
      : payload.service === "cold-calling"
        ? [
          now,
          payload.fullName,
          payload.email,
          stringifyValue(payload.targetMarket),
          stringifyValue(payload.callersNeeded),
          stringifyValue(payload.hoursPerDay),
          stringifyValue(payload.propertyTypeFocus),
          stringifyValue(payload.notes),
        ]
        : [
          now,
          payload.fullName,
          payload.email,
          stringifyValue(payload.tasksNeeded),
          stringifyValue(payload.hoursPerWeek),
          stringifyValue(payload.crmPlatform),
          stringifyValue(payload.notes),
        ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${escapedTabName}'!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

async function sendEmails(payload: BookingPayload) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.BOOKING_NOTIFICATION_EMAIL;
  const fromEmail = process.env.BOOKING_FROM_EMAIL;
  if (!resendApiKey || !toEmail || !fromEmail) return;

  const resend = new Resend(resendApiKey);
  const summary = Object.entries(payload)
    .map(([key, value]) => `<li><strong>${key}:</strong> ${stringifyValue(value)}</li>`)
    .join("");

  await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    subject: `New Azix booking: ${payload.service}`,
    html: `<h2>New booking received</h2><ul>${summary}</ul>`,
  });

  await resend.emails.send({
    from: fromEmail,
    to: [payload.email],
    subject: "We received your Azix booking",
    html: `<p>Hi ${payload.fullName},</p><p>Thanks for booking with Azix Solutions. Our team will contact you shortly.</p>`,
  });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as BookingPayload;
    console.log("=== DEBUG ===");
    console.log("CLIENT_EMAIL:", process.env.GOOGLE_CLIENT_EMAIL);
    console.log("SHEET_ID:", process.env.GOOGLE_SHEET_ID);
    console.log("KEY_EXISTS:", !!process.env.GOOGLE_PRIVATE_KEY);
    console.log("PAYLOAD:", payload);
    console.log("=============");
    if (!payload.service || !payload.fullName || !payload.email) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    await saveToGoogleSheets(payload);
    void sendEmails(payload).catch((emailError) => {
      console.error("Booking email error", emailError);
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Booking API error", error);
    const message = error instanceof Error ? error.message : "Could not process booking.";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 },
    );
  }
}

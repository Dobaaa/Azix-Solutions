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

async function saveToGoogleSheets(payload: BookingPayload) {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SHEETS_TAB_NAME ?? "Bookings";

  if (!clientEmail || !privateKey || !spreadsheetId) return;

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  const row = [
    new Date().toISOString(),
    payload.service,
    payload.fullName,
    payload.email,
    stringifyValue(payload),
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:E`,
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
    if (!payload.service || !payload.fullName || !payload.email) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    await Promise.allSettled([saveToGoogleSheets(payload), sendEmails(payload)]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Booking API error", error);
    return NextResponse.json(
      { ok: false, error: "Could not process booking." },
      { status: 500 },
    );
  }
}

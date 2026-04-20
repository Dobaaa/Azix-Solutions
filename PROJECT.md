# Azix Solutions — توثيق المشروع

موقع تسويقي وحجز لخدمات دعم العقارات، مبني على **Next.js (App Router)** مع **Tailwind CSS**، ونماذج حجز مربوطة بـ **Google Sheets** وإشعارات بريد اختيارية عبر **Resend**.

---

## نظرة عامة

| البند | الوصف |
|--------|--------|
| الاسم | `azix-solutions` |
| الإطار | Next.js 16 · React 19 · TypeScript |
| الأسلوب | Tailwind CSS v4 (`@import "tailwindcss"` في `app/globals.css`) |
| الخطوط | Geist Sans / Geist Mono عبر `next/font/google` |

---

## الصفحات والمسارات

| المسار | الملف | الوصف |
|--------|--------|--------|
| `/` | `app/page.tsx` | الصفحة الرئيسية (Hero، إحصائيات، خدمات، محتوى إضافي، آراء، CTA) |
| `/services` | `app/services/page.tsx` | الخدمات الثلاث |
| `/how-it-works` | `app/how-it-works/page.tsx` | آلية العمل خطوات |
| `/order` | `app/order/page.tsx` | صفحة الحجز + مكوّن `OrderForm` |
| `/contact` | `app/contact/page.tsx` | التواصل |

**SEO:** بيانات وصفية عامة في `app/layout.tsx`؛ `app/sitemap.ts` و `app/robots.ts` لخرائط الموقع والروبوتات.

---

## هيكل المجلدات (مهم)

```
app/
  layout.tsx          # الهيكل العام، الثيم CSS variables، Header/Footer
  page.tsx            # Home
  globals.css         # Tailwind + classes عامة (.card, .btn-primary, …)
  order/page.tsx
  services/page.tsx
  how-it-works/page.tsx
  contact/page.tsx
  api/bookings/route.ts   # POST حجوزات → Sheets (+ Resend اختياري)

components/
  layout/             # site-header, site-footer, section
  order/order-form.tsx
  home/hero-background.tsx
  animations/viewport-animator.tsx

lib/
  theme.ts            # ألوان ومسافات مركزية
  site-content.ts     # نصوص/إحصائيات/خدمات مشتركة
```

---

## التصميم والثيم (مكان واحد)

- **`lib/theme.ts`**: `siteConfig` + `theme.colors` + `theme.spacing`.
- **`app/layout.tsx`**: يحقن القيم كـ CSS variables على العنصر الخارجي (`--color-bg`, `--color-primary`, `--space-section-y`, …).
- **`app/globals.css`**: فئات مساعدة مثل `.container`, `.section`, `.card`, `.btn-primary`, `.eyebrow`, وأنيميشن الدخول للشاشة `[data-animate="reveal"]`.

تعديل الألوان أو المسافات يتم أساسًا من `lib/theme.ts` ثم مراجعة أي استخدامات Tailwind المباشرة إن وُجدت.

---

## شريط التنقل والتذييل

- **`components/layout/site-header.tsx`**: روابط + زر **Book Now**؛ قائمة موبايل بتوجل؛ رابط **Contact Us**.
- **`components/layout/site-footer.tsx`**: أعمدة الروابط وحقوق النشر.

---

## صفحة الحجز `/order`

- **`components/order/order-form.tsx`** (عميل `use client`):
  - تبويبات الخدمات: `ppl` · `cold-calling` · `virtual-assistant`.
  - حقول مختلفة حسب الخدمة؛ **React Hook Form**.
  - إرسال `POST` إلى `/api/bookings`.
  - بعد الاستجابة:
    - **نجاح (200 + `ok: true`)**: مودال بالإنجليزية يؤكد الاستلام.
    - **فشل أو خطأ شبكة**: مودال خطأ يطلب المحاولة أو التواصل عبر البريد (`hello@azixsolutions.com`).
  - البريد المعروض للدعم: ثابت `SUPPORT_EMAIL` في نفس الملف.

---

## واجهة برمجة الحجوزات — `POST /api/bookings`

**الملف:** `app/api/bookings/route.ts`

1. يتحقق من الحقول الأساسية: `service`, `fullName`, `email`.
2. **`saveToGoogleSheets`**:
   - مصادقة Google عبر **Service Account** (`GoogleAuth` + `googleapis`).
   - يقرأ أسماء التابات الفعلية من الجدول، ويطابق أسماء متوقعة أو يستخدم **`GOOGLE_DEFAULT_TAB`** أو أول تاب متاح (مناسب إذا كان الجدول يحتوي تابًا واحدًا مثل `الورقة1`).
   - أسماء التابات التي تحتوي مسافات تُستخدم مع اقتباس آمن في الـ range (مثل `'Sheet Name'!A1`).
   - صفوف مختلفة حسب `service` (أعمدة متوافقة مع حقول الفورم).

3. **`sendEmails`** (اختياري): إذا وُجدت مفاتيح Resend والبريد المرسل/المستلم، يُرسل إشعارًا للمسؤول وتأكيدًا للعميل.

**استجابة JSON:** `{ ok: true }` أو `{ ok: false, error: "..." }` مع رمز HTTP مناسب عند الفشل.

---

## متغيرات البيئة

ضع القيم في **`.env.local`** في جذر المشروع (لا ترفعها إلى Git؛ `.gitignore` يتجاهل `.env*` مع استثناء اختياري لـ `.env.example`).

### موقع عام

| المتغير | الوصف |
|---------|--------|
| `NEXT_PUBLIC_SITE_URL` | رابط الموقع الكامل (لـ metadata و sitemap) |

### Google Sheets

| المتغير | الوصف |
|---------|--------|
| `GOOGLE_CLIENT_EMAIL` أو `GOOGLE_SERVICE_ACCOUNT_EMAIL` | بريد حساب الخدمة |
| `GOOGLE_PRIVATE_KEY` | المفتاح الخاص (مع `\n` للأسطر داخل القيمة المقتبسة) |
| `GOOGLE_SHEET_ID` أو `GOOGLE_SHEETS_SPREADSHEET_ID` | معرف جدول Google Sheets |
| `GOOGLE_DEFAULT_TAB` | (اختياري) اسم التاب الافتراضي إن لم تُوجد أسماء مطابقة |
| `GOOGLE_TAB_PPL` / `GOOGLE_TAB_COLD_CALLING` / `GOOGLE_TAB_VA` | (اختياري) أسماء تابات صريحة لكل خدمة |

**ملاحظة:** شارك حساب الخدمة كـ **Editor** على ملف الجدول في Google Sheets.

### Resend (اختياري)

| المتغير | الوصف |
|---------|--------|
| `RESEND_API_KEY` | مفتاح Resend |
| `BOOKING_NOTIFICATION_EMAIL` | بريد استلام إشعارات الحجز |
| `BOOKING_FROM_EMAIL` | عنوان المرسل المعتمد في Resend |

---

## SEO

- Metadata في `app/layout.tsx` (`metadataBase`, `title` template, `openGraph`).
- `app/sitemap.ts` و `app/robots.ts`.
- محتوى الصفحات على الخادم (SSR) ضمن نموذج App Router الافتراضي.

---

## الأنيميشن (دخول العنصر للشاشة)

- **`components/animations/viewport-animator.tsx`**: `IntersectionObserver` مع إعادة الربط عند تغيير المسار (`usePathname`) حتى لا تبقى الصفحة فارغة بعد التنقل من الـ navbar.
- العناصر ذات `data-animate="reveal"` تظهر مرة واحدة مع fade + translateY؛ تدرج للعناصر الداخلية عند `data-stagger="true"`.
- احترام `prefers-reduced-motion`.

---

## الأصول (الصور)

- ملفات ثابتة تحت **`public/`** (مثل `public/assets/*.jpg`).
- الهيرو قد يستخدم `components/home/hero-background.tsx` لتبديل خلفيات.

---

## الأوامر

```bash
npm install    # التبعيات
npm run dev    # خادم التطوير — http://localhost:3000
npm run build  # بناء الإنتاج
npm run start  # تشغيل الإنتاج بعد build
npm run lint   # ESLint
```

---

## النشر

- متوافق مع **Vercel** أو أي استضافة تدعم Node لتشغيل `next start`.
- على الاستضافة، عرّف نفس متغيرات `.env.local` في لوحة الإعدادات البيئية للخادم.

---

## الأمان — تذكير سريع

- لا ترفع مفاتيح Google أو `.env.local` إلى المستودع.
- إذا ظهر المفتاح الخاص في مكان عام، **أعد إنشاء مفتاح جديد** في Google Cloud وأوقف القديم.

---

## ملخص المكتبات الرئيسية

| الحزمة | الاستخدام |
|--------|-----------|
| `next` | إطار التطبيق |
| `react` / `react-dom` | واجهة المستخدم |
| `tailwindcss` | التنسيق |
| `react-hook-form` | نماذج الحجز |
| `googleapis` | Google Sheets API |
| `resend` | بريد اختياري بعد الحجز |

---

*آخر تحديث للتوثيق يتزامن مع هيكل المستودع الحالي؛ إذا أُضيفت صفحات أو متغيرات جديدة، يُفضّل تحديث الأقسام ذات الصلة هنا.*

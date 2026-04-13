import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="container grid gap-8 py-10 md:grid-cols-4">
        <div>
          <p className="text-lg font-semibold">Azix Solutions</p>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Precision real estate support systems built for scale.
          </p>
        </div>
        <div>
          <p className="footer-title">Solutions</p>
          <ul className="footer-list">
            <li>
              <Link href="/services">Pay Per Lead</Link>
            </li>
            <li>
              <Link href="/services">Cold Calling</Link>
            </li>
            <li>
              <Link href="/services">Virtual Assistant</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-title">Company</p>
          <ul className="footer-list">
            <li>
              <Link href="/how-it-works">How It Works</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/order">Book Now</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-title">Legal</p>
          <ul className="footer-list">
            <li>
              <Link href="/contact">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/contact">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--color-border)] py-5 text-center text-xs text-[var(--color-muted)]">
        © {new Date().getFullYear()} Azix Solutions. Precision in Real Estate Support.
      </div>
    </footer>
  );
}

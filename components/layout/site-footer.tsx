import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/assets/Azix Solutions logo design.png";
export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="container grid gap-8 py-10 md:grid-cols-4 items-center text-center">
        <div>
          <div>          <Image src={Logo} alt="Azix Solutions" />
          </div>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Precision real estate support systems built for scale.
          </p>
        </div>
        <div>
          <p className="footer-title">Solutions</p>
          <ul className="footer-list">
            <li>
              <Link href="/services" className="hover:text-[var(--color-primary)]">Pay Per Lead</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-[var(--color-primary)]">Cold Calling</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-[var(--color-primary)]">Virtual Assistant</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-title">Company</p>
          <ul className="footer-list">
            <li>
              <Link href="/how-it-works" className="hover:text-[var(--color-primary)]">How It Works</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[var(--color-primary)]">Contact</Link>
            </li>
            <li>
              <Link href="/order" className="hover:text-[var(--color-primary)]">Book Now</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="footer-title">Legal</p>
          <ul className="footer-list">
            <li>
              <Link href="/contact" className="hover:text-[var(--color-primary)]">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[var(--color-primary)]">Terms of Service</Link>
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

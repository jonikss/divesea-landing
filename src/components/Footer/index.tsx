import React from "react";
import Link from "next/link";
import WaveLogo from "../icons/WaveLogo";
import styles from "./footer.module.scss";

const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Term & Conditions", href: "/terms" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <Link href="/" className={styles.logo}>
            <WaveLogo size={65} color="white" />
            <span className={styles.logoText}>DiveSea</span>
          </Link>
          <nav className={styles.nav}>
            {FOOTER_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.divider} />
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; 2023
          </p>
        </div>
      </div>
    </footer>
  );
}

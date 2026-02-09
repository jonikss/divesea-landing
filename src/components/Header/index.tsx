"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WaveLogo from "../icons/WaveLogo";
import CloseIcon from "../icons/CloseIcon";
import styles from "./header.module.scss";

const NAV_LINKS = [
  { label: "Discover", href: "/discover" },
  { label: "Creators", href: "/creators" },
  { label: "Sell", href: "/sell" },
  { label: "Stats", href: "/stats" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <WaveLogo size={46} />
            <span className={styles.logoText}>DiveSea</span>
          </Link>

          <nav className={styles.desktopNav}>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.overlayContent}>
              <div className={styles.overlayHeader}>
                <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
                  <WaveLogo size={46} />
                  <span className={styles.logoText}>DiveSea</span>
                </Link>
                <button
                  className={styles.closeBtn}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <CloseIcon />
                </button>
              </div>
              <div className={styles.overlayDivider} />
              <nav className={styles.mobileNav}>
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`${styles.mobileNavLink} ${pathname === link.href ? styles.active : ""}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import Mach2Logo from "@/components/Mach2Logo";

const NAV_LINKS = [
  { label: "Services", path: "/services" },
  { label: "WAF++", path: "/waf2p" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/#connect" },
] as const;

export default function Header() {
  const locale = useLocale();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [spacerHeight, setSpacerHeight] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState(300);
  const [scrolled, setScrolled] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  function localeHref(path: string) {
    return `/${locale}${path.startsWith("/#") ? path : path === "/" ? "" : path}`;
  }

  // ── Scroll: toggle header style past 20 px ────────────────────────────────
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Viewport: detect mobile on mount + resize, close menu on desktop ──────
  useEffect(() => {
    function check() {
      const mobile = window.innerWidth < 1024;
      setIsMobileViewport(mobile);
      if (!mobile) {
        setMobileMenuOpen(false);
        setSpacerHeight(0);
      }
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Open: measure scrollHeight → set spacerHeight → show ─────────────────
  const openMenu = useCallback(() => {
    if (!mobileMenuRef.current) return;
    const h = mobileMenuRef.current.scrollHeight;
    setTransitionDuration(Math.min(800, Math.max(250, 200 + h * 0.35)));
    setSpacerHeight(h);
    setMobileMenuOpen(true);
  }, []);

  // ── Close: set current height → double RAF → animate to 0 ────────────────
  const closeMenu = useCallback(() => {
    if (!mobileMenuRef.current) return;
    const h = mobileMenuRef.current.scrollHeight;
    setTransitionDuration(Math.min(800, Math.max(250, 200 + h * 0.35)));
    setMobileMenuOpen(false);
    // Establish current height in same paint, then let CSS transition to 0
    setSpacerHeight(h);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setSpacerHeight(0);
      });
    });
  }, []);

  const toggleMenu = useCallback(() => {
    if (mobileMenuOpen) closeMenu();
    else openMenu();
  }, [mobileMenuOpen, openMenu, closeMenu]);

  // ── Focus first link when menu opens ──────────────────────────────────────
  useEffect(() => {
    if (mobileMenuOpen) {
      requestAnimationFrame(() => {
        firstLinkRef.current?.focus();
      });
    }
  }, [mobileMenuOpen]);

  // ── Escape key closes menu ─────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && mobileMenuOpen) closeMenu();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen, closeMenu]);

  return (
    <>
      {/* ── Fixed header ──────────────────────────────────────────────────── */}
      <header
        className={[
          "site-header",
          scrolled ? "site-header--scrolled" : "",
        ].join(" ")}
      >
        {/* Bar row — always visible */}
        <div className="site-header-bar">
          <Link href={localeHref("/")} className="nav-logo">
            <Mach2Logo size={32} />
            <span>
              MaCh2<span className="text-white">.Cloud</span>
            </span>
          </Link>

          {/* Desktop nav: hidden below lg (1024 px) */}
          <ul className="nav-links hidden lg:flex">
            {NAV_LINKS.map(({ label, path }) => (
              <li key={path}>
                {path.startsWith("/#") ? (
                  <a href={localeHref(path)}>{label}</a>
                ) : (
                  <Link href={localeHref(path)}>{label}</Link>
                )}
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link href="/en/diagnosis" className="btn btn-p">
              Diagnosis
            </Link>

            {/* Hamburger: visible below lg only */}
            <button
              className="mobile-menu-trigger lg:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={toggleMenu}
            >
              {mobileMenuOpen ? (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile menu panel — measured container, height-animated ─── */}
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          role="navigation"
          aria-label="Mobile navigation"
          aria-hidden={!mobileMenuOpen}
          className={[
            "lg:hidden overflow-hidden",
            mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
          ].join(" ")}
          style={{
            height: `${spacerHeight}px`,
            transitionProperty: "height, opacity",
            transitionDuration: `${transitionDuration}ms`,
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Nav links */}
          <nav className="mobile-panel-nav">
            {NAV_LINKS.map(({ label, path }, i) =>
              path.startsWith("/#") ? (
                <a
                  key={path}
                  href={localeHref(path)}
                  ref={mobileMenuOpen && i === 0 ? firstLinkRef : undefined}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  className="mobile-panel-link"
                  onClick={closeMenu}
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={path}
                  href={localeHref(path)}
                  ref={mobileMenuOpen && i === 0 ? firstLinkRef : undefined}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  className="mobile-panel-link"
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              ),
            )}
          </nav>

          {/* CTA buttons */}
          <div className="mobile-panel-footer">
            <a
              href={localeHref("/#connect")}
              tabIndex={mobileMenuOpen ? 0 : -1}
              className="mobile-menu-btn-secondary"
              onClick={closeMenu}
            >
              Get in touch
            </a>
            <Link
              href="/en/diagnosis"
              tabIndex={mobileMenuOpen ? 0 : -1}
              className="mobile-menu-btn-primary"
              onClick={closeMenu}
            >
              Diagnose your architecture
            </Link>
          </div>
        </div>
      </header>

      {/* ── Spacer — normal-flow div that mirrors panel height ────────────── */}
      {/* Pages use pt-16 for the bar; this handles the extra menu expansion.  */}
      {isMobileViewport && (
        <div
          aria-hidden="true"
          style={{
            height: `${spacerHeight}px`,
            transitionProperty: "height",
            transitionDuration: `${transitionDuration}ms`,
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      )}
    </>
  );
}

"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#our-services" },
    { label: "About", href: "/aboutus" },
    { label: "Projects", href: "/projects" },
    { label: "Clients", href: "/clients" },
    { label: "Jobs", href: "/jobs" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl group-hover:scale-105 transition-transform">
            <Image
              src="/jcl-logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="bg-transparent"
            />
          </div>
          <span
            className={`font-bold text-xl tracking-tight transition-colors ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            JC&L Proserve Inc.
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav
          className={`hidden md:flex items-center gap-8 text-sm font-semibold transition-colors ${
            scrolled ? "text-black/80" : "text-white/90"
          }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-blue-500 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contactus"
            className="px-4 py-2 rounded-full bg-blue-600 text-primary-foreground font-bold hover:bg-blue-700 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 rounded-full transition-colors ${
            scrolled ? "bg-secondary text-foreground" : "bg-white/10 text-white"
          }`}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col px-6 py-8 space-y-6 text-lg font-medium">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="hover:text-blue-500 transition-colors text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contactus"
              onClick={() => setOpen(false)}
              className="hover:text-blue-500 transition-colors text-foreground"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

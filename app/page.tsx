"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Users,
  Briefcase,
  Shield,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

import SplitText from "@/components/SplitText";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
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
          className={`hidden md:flex items-center gap-10 text-sm font-semibold transition-colors ${
            scrolled ? "text-black/80" : "text-white/90"
          }`}
        >
          {["Home", "Services", "Jobs", "About"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-primary transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >
              {item}
            </Link>
          ))}
          <Button
            size="sm"
            className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30"
          >
            Contact Us
          </Button>
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
            {["Home", "Services", "Jobs", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />

      {/* HERO SECTION - Redesigned with dynamic split layout and high-quality imagery */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-blue-950/95 via-blue-900/80 to-transparent z-10" />
          <Image
            src="/images/about-image.png"
            alt="Professional team"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-foreground text-xs font-bold tracking-wider uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Top-Tier Staffing Solutions
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] text-white tracking-tight">
              Elevating
              <br />
              <span className="text-green-600 italic">
                <SplitText
                  text="Workforce"
                  className="text-5xl md:text-7xl font-extrabold text-center"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                  onLetterAnimationComplete={handleAnimationComplete}
                />
                <br />
              </span>{" "}
              Standards Globally
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed max-w-lg">
              Empowering businesses with elite, industry-vetted personnel. We
              bridge the gap between exceptional talent and visionary companies.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                className="rounded-full px-8 h-14 text-base font-bold shadow-xl shadow-primary/20 bg-blue-600 hover:bg-blue-700 group"
              >
                Find Talent
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-14 text-base font-bold bg-white/5 border-white/20 text-white hover:bg-white hover:text-blue-950 backdrop-blur-sm"
              >
                Join our Team
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-white/10">
              <div>
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-sm text-blue-200/60 uppercase tracking-widest font-semibold">
                  Active Clients
                </p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-3xl font-bold text-white">12k+</p>
                <p className="text-sm text-blue-200/60 uppercase tracking-widest font-semibold">
                  Deployed Staff
                </p>
              </div>
            </div>
          </div>

          {/* Floating Image Cards - Adds visual depth */}
          <div className="hidden lg:grid grid-cols-2 gap-6 relative">
            <div className="space-y-6 mt-12">
              <div className="relative aspect-3/4 rounded-3xl overflow-hidden shadow-2xl group border-2 border-white/10">
                <Image
                  src="/office-team.jpg"
                  alt="Talent"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-blue-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6 bg-white rounded-3xl shadow-xl flex items-center gap-4 border border-blue-50">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="font-bold text-foreground">Fast Deployment</p>
                  <p className="text-xs text-muted-foreground">
                    Average 48hr turnaround
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-blue-600 rounded-3xl shadow-xl text-white">
                <p className="text-4xl font-black mb-2 italic">98%</p>
                <p className="text-sm font-medium opacity-80 uppercase tracking-wider">
                  Client Retention
                </p>
              </div>
              <div className="relative aspect-3/4 rounded-3xl overflow-hidden shadow-2xl group border-2 border-white/10">
                <Image
                  src="/janitor-team.jpg"
                  alt="Expertise"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-blue-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION - Redesigned with icon-driven grid and glassmorphism */}
      <section id="services" className="py-32 relative bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">
                Core Expertise
              </h2>
              <p className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                Specialized Manpower for{" "}
                <span className="text-primary italic underline decoration-blue-100 underline-offset-8">
                  Every Industry
                </span>
              </p>
            </div>
            <p className="text-muted-foreground max-w-sm text-lg leading-relaxed">
              We provide tailored workforce solutions that integrate seamlessly
              with your operational requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Janitorial",
                desc: "Expert sanitation and facility maintenance services.",
                icon: Shield,
              },
              {
                title: "Construction",
                desc: "Skilled labor and safety-certified engineering support.",
                icon: Zap,
              },
              {
                title: "Office Staff",
                desc: "Professional administrative and executive personnel.",
                icon: Users,
              },
              {
                title: "Warehouse",
                desc: "Efficient logistics and inventory management teams.",
                icon: Briefcase,
              },
            ].map((service, i) => (
              <Card
                key={i}
                className="group hover:shadow-2xl transition-all duration-500 border-none bg-white rounded-[2rem] overflow-hidden"
              >
                <CardContent className="p-10 space-y-6">
                  <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <service.icon size={32} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                  <Link
                    href="#"
                    className="inline-flex items-center text-sm font-bold text-primary group-hover:translate-x-1 transition-transform"
                  >
                    Learn more <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - Feature-rich section with modern layout */}
      <section id="about" className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-60" />
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/ceo-solo.jpg"
                  alt="Our Team"
                  width={600}
                  height={800}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-2xl border max-w-70">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="w-5 h-5 bg-yellow-400 rounded-sm" />
                  ))}
                </div>
                <p className="text-sm font-medium italic text-muted-foreground">
                  &quot;The most professional staffing partner we've ever worked
                  with. Excellence in every deployment."
                </p>
                <p className="mt-4 font-bold text-foreground">
                  — CEO/ Managing Partner, JC&L Proserve Inc.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <h2 className="text-sm font-black text-primary uppercase tracking-[0.2em] mb-4">
                  The Advantage
                </h2>
                <h3 className="text-4xl font-extrabold tracking-tight mb-6 leading-tight">
                  Beyond Just Hiring—
                  <br />
                  We Build Partnerships
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our rigorous selection process ensures that every candidate we
                  provide isn't just qualified, but also aligns with your
                  company&apos;s culture and values.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  {
                    title: "Licensed & Compliant",
                    desc: "Full adherence to labor laws and safety standards.",
                  },
                  {
                    title: "Fast Deployment",
                    desc: "Rapid response to urgent staffing needs.",
                  },
                  {
                    title: "Vetted Talent",
                    desc: "Comprehensive background checks and skills testing.",
                  },
                  {
                    title: "Managed Payroll",
                    desc: "We handle the administrative heavy lifting.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="rounded-full px-8 h-14 bg-blue-600 text-background hover:bg-foreground/90 transition-all hover:shadow-lg"
              >
                View More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION - Bold, immersive section */}
      {/* <section id="jobs" className="px-6 py-20">
        <div className="max-w-7xl mx-auto rounded-[3rem] bg-blue-950 relative overflow-hidden px-10 py-24 text-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Ready to <span className="text-primary italic">Transform</span> Your Workforce?
            </h2>
            <p className="text-xl text-blue-100/70 max-w-xl mx-auto font-medium">
              Join hundreds of industry leaders who trust us with their most valuable asset—their people.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full px-12 h-16 text-lg font-extrabold shadow-2xl shadow-primary/40 bg-primary hover:bg-primary/90"
              >
                Partner With Us
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full px-12 h-16 text-lg font-extrabold border-white/20 text-white hover:bg-white hover:text-blue-950 backdrop-blur-sm bg-transparent"
              >
                Apply for Jobs
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      {/* FOOTER - Clean, authoritative layout */}
      <footer className="bg-slate-50 border-t py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-primary-foreground font-bold shadow-md">
                <Image
                  src="/jcl-logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="bg-transparent"
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight">
                <span className="text-green-600">J</span>
                <span className="text-blue-600">C&L </span>
                <span className="text-black/80">Proserve Inc.</span>
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              Setting the global standard in professional staffing and manpower
              management since 2025.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-widest text-xs">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
              {[
                "Find Talent",
                "Apply for Job",
                "Our Expertise",
                "Case Studies",
                "Contact Us",
              ].map((l) => (
                <li key={l}>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-widest text-xs">
              Company
            </h4>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
              {[
                "About Us",
                "Our Culture",
                "Careers",
                "Legal & Compliance",
                "Privacy Policy",
              ].map((l) => (
                <li key={l}>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-6 uppercase tracking-widest text-xs">
              Connect
            </h4>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                📍 12 Olandis Street Mercado Hagonoy, Bulacan 3002
              </p>
              <p className="flex items-center gap-2">📞 0994 843 0972</p>
              <p className="flex items-center gap-2">
                ✉️ louiemaglalang.jclproserve@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-20 mt-20 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground font-medium">
            © {new Date().getFullYear()} JC&L Proserve Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-xs font-bold text-muted-foreground hover:text-primary uppercase tracking-widest"
            >
              LinkedIn
            </Link>
            <Link
              href="#"
              className="text-xs font-bold text-muted-foreground hover:text-primary uppercase tracking-widest"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-xs font-bold text-muted-foreground hover:text-primary uppercase tracking-widest"
            >
              Instagram
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

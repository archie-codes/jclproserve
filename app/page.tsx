"use client";

import Link from "next/link";
import {
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

import SplitText from "@/components/SplitText";
import Counter from "@/components/Counter";
import ServicesSection from "@/components/ServicesSection";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

const testimonials = [
  {
    src: "/ceo-louie.jpg",
    message:
      '"The most professional staffing partner we\'ve ever worked with. Excellence in every deployment."',
    name: "— CEO/ Managing Partner, JC&L Proserve Inc.",
  },
  {
    src: "/vp-crisencia.jpg",
    message:
      '"Their commitment and expertise made our staffing seamless and efficient."',
    name: "— Vice President, JC&L Proserve Inc.",
  },
  {
    src: "/admin-hazel.jpg",
    message: '"Excellence in Crewing, trust in service"',
    name: "— Admin, JC&L Proserve Inc.",
  },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: "Home", href: "/" }, // your homepage
    { label: "Services", href: "/#our-services" }, // scroll to section on homepage
    { label: "Jobs", href: "/#jobs" }, // another page
    { label: "About", href: "/#about" }, // scroll to about section
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
          className={`hidden md:flex items-center gap-10 text-sm font-semibold transition-colors ${
            scrolled ? "text-black/80" : "text-white/90"
          }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-primary transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contactus"
            className="px-4 py-2 rounded-full bg-blue-600 text-primary-foreground font-bold hover:bg-blue-700 transition-colors"
          >
            Contact Us
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
            {[
              { name: "Home", href: "/" },
              { name: "Services", href: "/partnerwithus#our-services" },
              { name: "Jobs", href: "/jobs" },
              { name: "About", href: "/aboutus" },
              { name: "Contact", href: "/contactus" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default function HomePage() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />

      {/* HERO SECTION - Redesigned with dynamic split layout and high-quality imagery */}
      <section className="relative min-h-dvh w-full flex items-center pt-28 pb-16 overflow-hidden">
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
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center rounded-full px-8 h-14 text-base font-bold shadow-xl text-white shadow-primary/20 bg-blue-600 hover:bg-blue-700 group"
              >
                Apply For Jobs
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/partnerwithus"
                className="inline-flex items-center justify-center rounded-full px-8 h-14 text-base font-bold bg-white/5 border-white/20 text-white hover:bg-white hover:text-blue-950 backdrop-blur-sm"
              >
                Partner With Us
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-white/10">
              <div>
                <p className="text-3xl font-bold text-white">
                  <Counter end={500} suffix="+" />
                </p>
                <p className="text-sm text-blue-200/60 uppercase tracking-widest font-semibold">
                  Active Clients
                </p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div>
                <p className="text-3xl font-bold text-white">
                  <Counter end={12} suffix="k+" />
                </p>
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
      {/* <section id="services" className="py-32 relative bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-black text-blue-900 uppercase tracking-[0.2em] mb-4">
                Core Expertise
              </h2>
              <p className="text-4xl md:text-5xl font-extrabold text-blue-900 tracking-tight leading-tight">
                Specialized Manpower for{" "}
                <span className="text-green-600 italic underline decoration-blue-100 underline-offset-8">
                  Every Industry
                </span>
              </p>
            </div>
            <p className="text-slate-600 max-w-sm text-lg leading-relaxed">
              We provide tailored workforce solutions that integrate seamlessly
              with your operational requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Janitorial Services",
                desc: "Expert sanitation and facility maintenance services.",
                icon: Brush, // Note: Changed from BrushCleaning to Brush for standard Lucide support
                link: "/partnerwithus#our-services",
              },
              {
                title: "Recruitment and Staffing",
                desc: "Tailored hiring solutions for diverse business needs.",
                icon: Armchair,
                link: "/partnerwithus#our-services",
              },
              {
                title: "Manpower Services",
                desc: "Comprehensive staffing solutions across various sectors.",
                icon: Users,
                link: "/partnerwithus#our-services",
              },
              {
                title: "Workforce Outsourcing",
                desc: "Flexible outsourcing to optimize your workforce management.",
                icon: Phone,
                link: "/partnerwithus#our-services",
              },
              {
                title: "Skilled Deployment",
                desc: "Skilled labor for production and assembly lines.",
                icon: Users,
                link: "/partnerwithus#our-services",
              },
              // {
              //   title: "Facility Management",
              //   desc: "Comprehensive onsite management and technical support.",
              //   icon: Building2,
              // },
            ].map((service, i) => (
              <Card
                key={i}
                className="group hover:shadow-2xl transition-all duration-500 border-none bg-white rounded-[2rem] overflow-hidden"
              >
                <CardContent className="p-10 space-y-6">
                  <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <service.icon size={32} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-blue-900">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                  <Link
                    href={service.link}
                    className="inline-flex items-center text-sm font-bold text-blue-900 group-hover:translate-x-1 transition-transform"
                  >
                    Learn more <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}
      <ServicesSection />

      {/* WHY CHOOSE US - Feature-rich section with modern layout */}
      <section
        id="about"
        className="py-32 bg-slate-50/50 overflow-hidden relative"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Image & Testimonial */}
            <div className="relative w-full max-w-lg mx-auto lg:mx-0">
              {/* Decorative Background Elements */}
              <div className="absolute -top-12 -left-12 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl shadow-2xl" />
              <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-green-400/20 rounded-full blur-3xl shadow-2xl" />

              {/* Main Image Container */}
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-[6px] border-white group">
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <Image
                  src={testimonials[current].src}
                  alt="Our Team"
                  width={600}
                  height={800}
                  className="object-cover w-full aspect-4/5 transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Enhanced Testimonial Floating Card */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:-bottom-12 md:-right-12 w-[92%] sm:w-[85%] bg-white/90 backdrop-blur-3xl p-5 sm:p-8 rounded-3xl shadow-xl border border-white/60 z-20">
                <div className="flex gap-1.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                    />
                  ))}
                </div>
                <p className="text-sm sm:text-base font-semibold italic text-slate-700 leading-relaxed mb-4">
                  {testimonials[current].message}
                </p>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200/60">
                  <p className="font-bold text-blue-950 text-sm">
                    {testimonials[current].name}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={prevSlide}
                      className="p-2 bg-white rounded-full hover:bg-blue-600 hover:text-white text-slate-600 transition-all shadow-md border border-slate-100"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="p-2 bg-white rounded-full hover:bg-blue-600 hover:text-white text-slate-600 transition-all shadow-md border border-slate-100"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content & Features */}
            <div className="space-y-10 pt-16 lg:pt-0">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-800 font-bold tracking-widest text-xs uppercase shadow-sm border border-blue-100">
                  The JC&L Advantage
                </div>
                <h3 className="text-4xl sm:text-5xl font-extrabold text-blue-950 tracking-tight leading-[1.15]">
                  Beyond Just Hiring—
                  <br />
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-700 to-green-600">
                    We Build Partnerships
                  </span>
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                  Our rigorous selection process ensures that every candidate we
                  provide isn&apos;t just qualified, but absolutely aligns with
                  your company&apos;s operational culture and long-term targets.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
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
                  <div
                    key={i}
                    className="flex gap-4 group p-4 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100"
                  >
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-blue-600 transition-colors shadow-inner">
                      <CheckCircle2 size={26} />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-950 mb-1 text-base">
                        {item.title}
                      </h4>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/aboutus"
                  className="inline-flex items-center justify-center font-bold rounded-full h-14 px-10 bg-blue-950 text-white hover:bg-blue-800 transition-all shadow-xl hover:shadow-blue-900/20 hover:-translate-y-1 group"
                >
                  Discover Our Story
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION - Bold, immersive section */}
      <section id="jobs" className="px-6 py-20">
        <div className="max-w-7xl mx-auto rounded-[3rem] bg-blue-600 relative overflow-hidden px-10 py-24 text-center">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Ready to <span className="text-green-600 italic">Transform</span>{" "}
              Your Workforce?
            </h2>
            <p className="text-xl text-blue-100/70 max-w-xl mx-auto font-medium">
              Join hundreds of industry leaders who trust us with their most
              valuable asset—their people.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="/partnerwithus"
                className="w-full sm:w-auto h-16 px-12
               flex items-center justify-center
               text-lg font-extrabold
               rounded-full
               text-white
               shadow-2xl shadow-primary/40
               bg-green-600
               hover:bg-white hover:text-green-600
               transition-colors"
              >
                Partner With Us
              </Link>

              <Link
                href="/jobs"
                className="w-full sm:w-auto h-16 px-12
               flex items-center justify-center
               text-lg font-extrabold
               rounded-full
               border border-white/20
               text-white
               bg-white/10 backdrop-blur-sm
               hover:bg-white hover:text-blue-600
               transition-colors"
              >
                Apply for Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

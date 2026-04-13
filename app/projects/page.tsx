"use client";

import Navbar from "@/components/Navbar";
import {
  Monitor,
  Globe,
  ChevronRight,
  LayoutTemplate,
  Database,
  X,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ProjectsPage() {
  const [selectedSystem, setSelectedSystem] = useState<any>(null);

  const websites = [
    {
      name: "Professional Website Portfolio",
      type: "Web Design Portfolio",
      description:
        "A premium showcase of our state-of-the-art web design capabilities and creative UI/UX.",
      icon: LayoutTemplate,
      color: "from-purple-500 to-pink-500",
      link: "#",
      image: "/projects/portfolio_1.png",
    },
    {
      name: "RBP Petrostar Inc.",
      type: "Website Development",
      description:
        "A comprehensive corporate and operational platform built for top-tier performance.",
      icon: LayoutTemplate,
      color: "from-blue-500 to-cyan-400",
      link: "https://www.rbppetrostar.ph/",
      image: "/projects/rbp_screenshot.png",
    },
    {
      name: "FhernieOtso Corp.",
      type: "Website Development",
      description:
        "A modern, high-converting digital storefront focusing on user experience and brand identity.",
      icon: Globe,
      color: "from-green-500 to-emerald-400",
      link: "https://www.fhernieotso.com/",
      image: "/projects/fhernie_screenshot.png",
    },
    {
      name: "JC&L Proserve Inc.",
      type: "Website Development",
      description:
        "Our very own premium corporate portal designed for sophisticated staffing solutions.",
      icon: Globe,
      color: "from-indigo-500 to-blue-500",
      link: "https://www.jclproserve.com/",
      image: "/projects/jcl_screenshot.png",
    },
  ];

  const webApps = [
    {
      name: "Cheque Printing System",
      type: "Web Application",
      description:
        "A fast, automated web application for professional cheque issuance and voucher management.",
      icon: LayoutTemplate,
      color: "from-slate-800 to-slate-950",
      image: "/projects/cheque_printing.png",
      summary:
        "A specialized tool that simplifies the financial process by automating cheque printing and generating corresponding vouchers, ensuring accuracy and saving significant administrative time.",
      features: [
        "Automated Cheque Formatting",
        "Customizable Voucher Templates",
        "Print History & Audit Trail",
        "Secure User Access",
      ],
    },
    {
      name: "Official Business Form Generator",
      type: "Web Application",
      description:
        "An internal productivity tool designed to streamline the creation and approval of official business forms.",
      icon: Database,
      color: "from-slate-800 to-slate-950",
      image: "/projects/ob_form_generator.png",
      summary:
        "Streamline your HR and administrative processes. This application allows employees to quickly generate standardized official business forms with integrated digital approval routing.",
      features: [
        "Digital Form Creation",
        "Automated PDF Generation",
        "Approval Workflows",
        "Centralized Record Keeping",
      ],
    },
  ];

  const systems = [
    {
      name: "Otso Poultry Farm",
      type: "Sales Monitoring System",
      description:
        "A robust back-office system to track sales, manage inventory, and generate analytics in real-time.",
      icon: Database,
      color: "from-slate-800 to-slate-950",
      image: "/projects/fhernieotso_sale_monitoring_system.png",
      summary:
        "Designed specifically for agricultural and logistics operations, this robust back-office framework transforms raw data into actionable insights. It provides an intuitive interface for staff to accurately manage inventory, track expenses, and oversee comprehensive sales reports, accelerating business growth through data-driven decisions.",
      features: [
        "User Authentication & Role-Based Access",
        "Dashboard with Real-Time Summary",
        "Sales Monitoring Module",
        "Expense Tracking Module",
        "Automated Net Income Computation",
        "Farm - Based Reporting",
        "Printable & Exportable Reports",
        "Secure Cloud Database Setup",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 pb-20">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] w-full flex items-center pt-28 pb-16 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <Image
            src="/projects/projects_hero_bg.png"
            alt="Technology Background"
            fill
            className="object-cover opacity-40 mix-blend-screen"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-950/50 to-slate-950 z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase">
              Digital Excellence
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] text-white tracking-tight">
              Our Digital <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300 italic">
                Innovations
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl">
              Showcasing our cutting-edge website development and proprietary
              system solutions designed for modern enterprise needs.
            </p>
          </div>
        </div>
      </section>

      {/* WEBSITE PROJECTS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <Globe size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-blue-950">
                Website Projects
              </h2>
              <p className="text-slate-500 font-medium">
                Premium digital experiences
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {websites.map((project, idx) => (
              <a
                key={idx}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div
                  className={`w-full aspect-video rounded-3xl bg-linear-to-br ${project.color} p-8 flex flex-col justify-between relative overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2`}
                >
                  {project.image && (
                    <>
                      <Image
                        src={project.image}
                        alt={`${project.name} preview`}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10 z-10" />
                    </>
                  )}

                  <div className="absolute top-0 right-0 p-16 bg-white/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 z-20" />

                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/30 z-20 relative shadow-sm">
                    <project.icon size={24} />
                  </div>

                  <div className="space-y-2 z-20 relative">
                    <p className="text-white/90 text-sm font-bold tracking-wider uppercase drop-shadow-md">
                      {project.type}
                    </p>
                    <h3 className="text-2xl font-black text-white drop-shadow-lg">
                      {project.name}
                    </h3>
                  </div>
                </div>
                <div className="pt-6 px-2">
                  <p className="text-slate-600 font-medium leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-bold text-blue-600 group-hover:text-blue-800 transition-colors">
                    Visit Website{" "}
                    <ChevronRight
                      size={16}
                      className="ml-1 group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WEB APPLICATIONS SECTION */}
      <section className="py-24 bg-slate-50/50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-purple-900 rounded-xl flex items-center justify-center text-white shadow-lg">
              <LayoutTemplate size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Web Applications
              </h2>
              <p className="text-slate-500 font-medium">
                Streamlined productivity tools and utilities
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-x-12 gap-y-24 items-center mb-16">
            {webApps.map((project, idx) => (
              <div key={idx} className="contents">
                {/* Visual Representation */}
                <div
                  className="order-2 lg:order-1 relative aspect-video sm:aspect-square lg:aspect-video rounded-[2.5rem] bg-slate-900 overflow-hidden shadow-2xl border-[6px] border-white group cursor-pointer"
                  onClick={() => setSelectedSystem(project)}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-purple-900/40 to-transparent z-10 group-hover:from-purple-600/20 transition-colors duration-500 pointer-events-none" />
                  {/* Real System Image */}
                  <Image
                    src={project.image}
                    alt={`${project.name} preview`}
                    fill
                    className="object-cover object-top opacity-90 group-hover:opacity-100 transform group-hover:scale-[1.03] transition-all duration-700 pointer-events-none"
                  />
                </div>

                {/* Content */}
                <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white font-bold tracking-widest text-xs uppercase shadow-sm">
                    {project.type}
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
                    {project.name}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={() => setSelectedSystem(project)}
                      size="lg"
                      className="rounded-full px-8 h-14 bg-slate-900 text-white hover:bg-purple-600 transition-colors shadow-xl cursor-pointer"
                    >
                      Explore Capabilities
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEM PROJECTS (Darker theme section for contrast) */}
      <section className="py-24 bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Monitor size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                System Development
              </h2>
              <p className="text-slate-500 font-medium">
                Enterprise tools and architecture
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {systems.map((project, idx) => (
              <div key={idx} className="contents">
                {/* Visual Representation */}
                <div
                  className="order-2 lg:order-1 relative aspect-video sm:aspect-square lg:aspect-video rounded-[2.5rem] bg-slate-900 overflow-hidden shadow-2xl border-[6px] border-white group cursor-pointer"
                  onClick={() => setSelectedSystem(project)}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-blue-900/40 to-transparent z-10 group-hover:from-blue-600/20 transition-colors duration-500 pointer-events-none" />
                  {/* Real System Image */}
                  <Image
                    src={project.image}
                    alt={`${project.name} preview`}
                    fill
                    className="object-cover object-top opacity-90 group-hover:opacity-100 transform group-hover:scale-[1.03] transition-all duration-700 pointer-events-none"
                  />
                </div>

                {/* Content */}
                <div className="order-1 lg:order-2 space-y-8 lg:pl-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white font-bold tracking-widest text-xs uppercase shadow-sm">
                    {project.type}
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
                    {project.name}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={() => setSelectedSystem(project)}
                      size="lg"
                      className="rounded-full px-8 h-14 bg-slate-900 text-white hover:bg-blue-600 transition-colors shadow-xl cursor-pointer"
                    >
                      Explore Capabilities
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEM DETAILS MODAL */}
      {selectedSystem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity cursor-pointer"
            onClick={() => setSelectedSystem(null)}
          />

          <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-100 p-6 flex items-center justify-between z-10">
              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  {selectedSystem.name}
                </h3>
                <p className="text-sm font-medium text-blue-600">
                  {selectedSystem.type}
                </p>
              </div>
              <button
                onClick={() => setSelectedSystem(null)}
                className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8">
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
                  System Summary
                </h4>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {selectedSystem.summary}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Key Features
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {selectedSystem.features.map((feature: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100"
                    >
                      <div className="mt-0.5 text-blue-600">
                        <CheckCircle2 size={18} />
                      </div>
                      <span className="text-slate-700 font-semibold">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

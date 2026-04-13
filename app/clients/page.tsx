"use client";

import Navbar from "@/components/Navbar";
import { Users, Briefcase, Building2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ClientsPage() {
  const clients = [
    {
      name: "FhernieOtso Corporation",
      industry: "Logistics and Poultry",
      description:
        "Partnering to deliver high-quality, vetted workforce solutions tailored for maximum operational efficiency.",
      icon: Briefcase,
    },
    // Placeholders for future clients
    {
      name: "Global Enterprise Co.",
      industry: "Corporate Restructuring",
      description:
        "End-to-end talent acquisition and staff augmentation for enterprise-level demands.",
      icon: Building2,
    },
    {
      name: "Nexus Logistics",
      industry: "Supply Chain & Operations",
      description:
        "Providing resilient workforce deployment to keep modern supply chains running 24/7.",
      icon: Users,
    },
  ];

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] w-full flex items-center pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-blue-950/95 via-blue-900/90 to-blue-950/80 z-10" />
          <Image
            src="/building.jpg" // Using building as a generic corporate background
            alt="Corporate partners"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
            Trusted Over Years
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] text-white tracking-tight">
            Our Valued <br />
            <span className="text-green-600 italic">Partnerships</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed max-w-2xl mx-auto">
            We don&apos;t just provide manpower; we build long-lasting strategic
            relationships with industry leaders across the nation.
          </p>
        </div>
      </section>

      {/* CLIENTS GRID SECTION */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-black text-blue-800 uppercase tracking-[0.2em]">
              The JC&L Portfolio
            </h2>
            <p className="text-4xl md:text-5xl font-extrabold text-blue-950 tracking-tight">
              Companies We{" "}
              <span className="text-green-600 italic">Empower</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600 mb-8 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm relative z-10">
                  <client.icon size={32} />
                </div>

                <div className="space-y-4 relative z-10">
                  <div>
                    <span className="text-xs font-bold text-green-600 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">
                      {client.industry}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-950">
                    {client.name}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {client.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER WITH US CTA */}
      <section className="py-24 px-6 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-linear-to-br from-blue-900 to-blue-950 relative overflow-hidden px-10 py-20 text-center shadow-2xl">
          <div className="absolute top-0 right-0 p-32 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 p-32 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white mx-auto border border-white/20">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Ready to Join Our Network?
            </h2>
            <p className="text-lg text-blue-100/80 font-medium">
              Transform your workforce with JC&L Proserve. We are ready to
              partner with you to achieve operational excellence.
            </p>
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="h-16 px-10 rounded-full bg-green-600 hover:bg-white hover:text-green-600 text-lg font-extrabold shadow-xl transition-colors"
              >
                <Link href="/partnerwithus">Partner With Us Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

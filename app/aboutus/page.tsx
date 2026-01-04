"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  ChevronLeft,
  Target,
  Eye,
  Heart,
  Shield,
  Zap,
  Award,
  Globe,
} from "lucide-react";
import Image from "next/image";


export default function MissionPage() {
  const coreValues = [
    {
      title: "Integrity",
      description: "Honesty and transparency in every transaction.",
      icon: Shield,
    },
    {
      title: "Excellence",
      description: "Commitment to delivering top-quality manpower and service.",
      icon: Award,
    },
    {
      title: "Professionalism",
      description: "Respect, discipline, and responsibility in all dealings.",
      icon: Zap,
    },
    {
      title: "Customer Focus",
      description:
        "Ensuring client satisfaction through dependable and responsive service.",
      icon: Heart,
    },
    {
      title: "Growth & Innovation ",
      description:
        "Continuous improvement in recruitment and workforce management.",
      icon: Globe,
    },
    // {
    //   title: "Commitment",
    //   description:
    //     "We are dedicated to the long-term success of our partners, providing unwavering support throughout their journey.",
    //   icon: Briefcase,
    // },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-blue-600-foreground font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
              <Image src="/jcl-logo.png" alt="Logo" width={40} height={40} />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              JC&L Proserve Inc.
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-blue-600 transition-colors"
          >
            <ChevronLeft size={16} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative py-32 overflow-hidden bg-linear-to-br from-blue-950 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-10 bg-[radial-linear(circle_at_top_right,var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bluetext-blue-600/10 border border-bluetext-blue-600/20 text-white text-xs font-bold tracking-wider uppercase">
              Purpose & Principles
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] text-white tracking-tight">
              Driven by Purpose,{" "}
              <span className="text-blue-600 italic">Guided by Values</span>
            </h1>
            <p className="text-xl text-justify text-blue-100/80 leading-relaxed max-w-3xl mx-auto">
              JC&L Proserve, Inc. is a trusted manpower provider specializing in
              delivering reliable, skilled, and professional workers to meet the
              growing operational needs of businesses across various industries.
              Built on a foundation of integrity, excellence, and service
              commitment, the company aims to become one of the most dependable
              manpower service providers in the country. We strive to connect
              competent workers with reputable companies while ensuring the
              highest standards of recruitment, deployment, and workforce
              support. Through strong leadership and a passion for service, JC&L
              Proserve, Inc. continues to expand as a competitive manpower and
              recruitment solutions partner.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION SECTION */}
      <section className="py-32 bg-slate-50/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Mission Card */}
            <div className="relative group lg:mt-12">
              <div className="absolute -inset-4 bg-linear-to-br from-blue-900/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Card className="relative overflow-hidden border-none shadow-2xl bg-white rounded-[2.5rem] h-full">
                <CardContent className="p-12 space-y-8">
                  <div className="w-16 h-16 bg-bluetext-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600">
                    <Target size={32} />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em]">
                      Our Mission
                    </h2>
                    {/* <h3 className="text-4xl font-extrabold tracking-tight text-foreground">
                      Empowering Global Progress Through Exceptional Talent.
                    </h3> */}
                    <ul className="text-xl font-medium text-justify text-muted-foreground leading-relaxed list-disc pl-6">
                      <li>
                        To provide well-screened, trained, and reliable workers
                        ready to meet client demands.
                      </li>
                      <li>
                        To uphold ethical standards and transparent recruitment
                        practices.
                      </li>
                      <li>
                        To deliver manpower solutions that drive productivity
                        and operational efficiency.
                      </li>
                      <li>
                        To create meaningful job opportunities that uplift the
                        lives of Filipino workers.
                      </li>
                      <li>
                        To continuously improve our processes and adapt to the
                        evolving needs of industries.
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Vision Card */}
            <div className="relative group lg:mt-12">
              <div className="absolute -inset-4 bg-linear-to-br from-blue-900/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Card className="relative overflow-hidden border-none shadow-2xl bg-white rounded-[2.5rem] h-full">
                <CardContent className="p-12 space-y-8">
                  <div className="w-16 h-16 bg-blue-950/10 rounded-2xl flex items-center justify-center text-blue-600">
                    <Eye size={32} />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em]">
                      Our Vision
                    </h2>
                    {/* <h3 className="text-4xl font-extrabold tracking-tight text-foreground">
                      To be the Worlds Most Trusted Partner in Human Capital.
                    </h3> */}
                    <p className="text-xl font-medium text-muted-foreground leading-relaxed text-justify ">
                      To be a leading manpower and service solutions provider
                      known for high-quality workforce, exceptional service
                      delivery, and strong partnerships with clients across the
                      Philippines and abroad.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES SECTION */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.2em]">
              Our DNA
            </h2>
            <p className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              The <span className="text-blue-600 italic">Core Values</span> that
              Define Us
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              These principles are not just words on a wall—they are the
              foundation of our culture and the standard for our service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="group p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <value.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 px-6 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/staff.jpg"
            alt="Teamwork"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-blue-950 via-blue-950/90 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Aligned with Your <br />
              <span className="text-blue-600 italic">Goals & Values</span>
            </h2>
            <p className="text-xl text-blue-100/70 leading-relaxed font-medium">
              We look for more than just skills—we look for cultural alignment
              and shared purpose to ensure every placement is a long-term win.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full px-12 h-16 text-lg font-extrabold shadow-2xl shadow-blue bg-blue-600 hover:bg-blue-600/90 group"
              >
                <Link href="/partnerwithus">
                  Partner With Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

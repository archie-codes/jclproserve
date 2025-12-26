"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

import Image from "next/image";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur border-b-[#53a079] border-b-4">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-bold text-xl text-blue-900">
          <Image
            src="/main-logo.png"
            alt="Manpower workers"
            width={30}
            height={30}
            className="shadow-xl"
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-[16px] font-medium">
          <Link href="#">Home</Link>
          <Link href="#services">Services</Link>
          <Link href="#jobs">Jobs</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg border"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col px-6 py-4 space-y-4 text-sm">
            <Link href="#" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="#services" onClick={() => setOpen(false)}>
              Services
            </Link>
            <Link href="#jobs" onClick={() => setOpen(false)}>
              Jobs
            </Link>
            <Link href="#about" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="#contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800 pt-16">
      <Navbar />
      {/* HERO SECTION */}
      <section className="bg-linear-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Reliable Manpower Solutions
              <br />
              For Your Business
            </h1>
            <p className="mt-4 text-lg text-blue-100">
              Providing skilled, trained, and ready-to-work personnel across
              industries.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="bg-green-600 hover:bg-green-700">
                Hire Manpower
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900"
              >
                Apply for a Job
              </Button>
            </div>
          </div>
          {/* <div className="hidden md:block">
            <Image
              src="/main-logo.png"
              alt="Manpower workers"
              width={30}
              height={30}
              className="rounded-2xl shadow-xl"
            />
          </div> */}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center">Our Services</h2>
          <p className="text-center text-gray-500 mt-2">
            Manpower solutions tailored to your needs
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {["Janitorial", "Construction", "Office Staff", "Warehouse"].map(
              (service) => (
                <Card key={service} className="hover:shadow-lg transition">
                  <CardContent className="p-6 text-center">
                    <div className="text-xl font-medium">{service}</div>
                    <p className="mt-2 text-sm text-gray-500">
                      Professional and trained personnel
                    </p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      {/* JOB SEEKERS */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold">Looking for a Job?</h2>
            <p className="mt-3 text-gray-600">
              Apply online and get connected with employers quickly.
            </p>
            <Button className="mt-6 bg-blue-700 hover:bg-blue-800">
              Apply Now
            </Button>
          </div>
          <ul className="space-y-4">
            <li>✔ Browse available jobs</li>
            <li>✔ Submit your application</li>
            <li>✔ Attend interview</li>
            <li>✔ Get deployed</li>
          </ul>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold">Why Choose Us</h2>
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {[
              "Licensed & Compliant",
              "Background-Checked Workers",
              "Fast Deployment",
              "HR & Payroll Managed",
            ].map((item) => (
              <div key={item} className="p-6 border rounded-2xl">
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-blue-100 py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-lg">Manpower Agency</h3>
            <p className="text-sm mt-2">Your trusted workforce partner.</p>
          </div>
          <div>
            <p>📍 Office Address</p>
            <p>📞 Contact Number</p>
            <p>✉️ Email Address</p>
          </div>
          <div className="text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

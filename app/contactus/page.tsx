"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Linkedin,
  Facebook,
  Twitter,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [result, setResult] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");

    const form = event.currentTarget;

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "f447d150-8fc0-4eeb-9958-6161dc6be794");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.success) {
      toast.success("Message sent successfully!");
      setResult("Success");
      setTimeout(() => setResult(""), 2000);
      form.reset();
    } else {
      setResult("Error");
      toast.error("Something went wrong");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-blue-600/20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] w-full flex items-center pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-r from-blue-950/95 via-blue-900/90 to-blue-950/80 z-10" />
          <Image
            src="/building.jpg"
            alt="Contact Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
            Get In Touch
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] text-white tracking-tight">
            Let's Start a <br />
            <span className="text-cyan-400 italic">Conversation</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100/80 leading-relaxed max-w-2xl mx-auto">
            Have questions about our customized software systems, digital
            portfolio, or staffing expertise? Our dedicated team is here to
            assist you and move your business forward.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-20 -mt-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-900 text-white rounded-[2rem] p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-16 bg-blue-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />

                <h3 className="text-2xl font-black mb-8 tracking-tight">
                  Contact Information
                </h3>

                <div className="space-y-8 relative z-10 w-full">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 shrink-0 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-blue-600/20 transition-colors">
                      <Phone className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                        Call Us
                      </p>
                      <p className="text-lg font-semibold text-slate-100">
                        +63 (993) 190-8150
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 shrink-0 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-blue-600/20 transition-colors">
                      <Mail className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                        Email Us
                      </p>
                      <p className="text-lg font-semibold text-slate-100 break-all max-w-[200px] sm:max-w-full">
                        hr.jclproserve@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 shrink-0 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-blue-600/20 transition-colors">
                      <MapPin className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                        Office
                      </p>
                      <p className="text-md font-medium text-slate-300 leading-relaxed pr-2">
                        Unit 203 2nd Floor Landmark Bldg, Mc. Arthur Highway,
                        Quebiawan, City of San Fernando, Pampanga
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-5">
                    Follow Us
                  </p>
                  <div className="flex gap-4">
                    <Link
                      href="#"
                      className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 text-slate-400 border border-white/5"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Link>
                    <Link
                      href="#"
                      className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 text-slate-400 border border-white/5"
                    >
                      <Facebook className="w-4 h-4" />
                    </Link>
                    <Link
                      href="#"
                      className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 text-slate-400 border border-white/5"
                    >
                      <Twitter className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-50 pointer-events-none group-hover:bg-blue-100 transition-colors" />
                <div className="flex items-center gap-4 mb-6 relative">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">
                    Business Hours
                  </h4>
                </div>
                <ul className="space-y-4 text-slate-600 relative">
                  <li className="flex justify-between items-center pb-4 border-b border-slate-100/80 hover:bg-slate-50/50 rounded-lg px-2 -mx-2 transition-colors">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="font-bold text-slate-900">
                      8:00 AM - 5:00 PM
                    </span>
                  </li>
                  <li className="flex justify-between items-center pb-4 border-b border-slate-100/80 hover:bg-slate-50/50 rounded-lg px-2 -mx-2 transition-colors">
                    <span className="font-medium">Saturday</span>
                    <span className="font-bold text-slate-900">
                      8:00 AM - 3:00 PM
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-rose-500 font-medium px-2 -mx-2">
                    <span>Sunday</span>
                    <span className="bg-rose-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider group-hover:bg-rose-100 transition-colors">
                      Closed
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-8 md:p-12 mb-10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-full blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 transform -translate-x-1/2 translate-y-1/2 pointer-events-none" />

              <div className="relative z-10 mb-10">
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                  Send Us a Message
                </h2>
                <p className="text-slate-500 font-medium text-lg max-w-2xl">
                  Complete the form below and one of our specialists will get
                  back to you within 24 hours to discuss how we can help.
                </p>
              </div>

              <form onSubmit={onSubmit} className="relative z-10 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label
                      htmlFor="first-name"
                      className="text-slate-700 font-bold ml-1"
                    >
                      First Name
                    </Label>
                    <Input
                      id="first-name"
                      type="name"
                      name="name"
                      placeholder="John"
                      className="bg-slate-50 border-slate-200 h-14 px-5 rounded-2xl focus-visible:ring-blue-500 focus-visible:border-blue-500 text-lg shadow-xs"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="last-name"
                      className="text-slate-700 font-bold ml-1"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="last-name"
                      type="last-name"
                      name="last-name"
                      placeholder="Doe"
                      className="bg-slate-50 border-slate-200 h-14 px-5 rounded-2xl focus-visible:ring-blue-500 focus-visible:border-blue-500 text-lg shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-slate-700 font-bold ml-1"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      className="bg-slate-50 border-slate-200 h-14 px-5 rounded-2xl focus-visible:ring-blue-500 focus-visible:border-blue-500 text-lg shadow-xs"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="phone"
                      className="text-slate-700 font-bold ml-1"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="+63 900 000 0000"
                      className="bg-slate-50 border-slate-200 h-14 px-5 rounded-2xl focus-visible:ring-blue-500 focus-visible:border-blue-500 text-lg shadow-xs"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="subject"
                    className="text-slate-700 font-bold ml-1"
                  >
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    type="subject"
                    name="subject"
                    placeholder="Inquiry about staffing solutions / web design"
                    className="bg-slate-50 border-slate-200 h-14 px-5 rounded-2xl focus-visible:ring-blue-500 focus-visible:border-blue-500 text-lg shadow-xs"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="message"
                    className="text-slate-700 font-bold ml-1"
                  >
                    How can we help?
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us what you're looking for..."
                    className="min-h-40 bg-slate-50 border-slate-200 p-5 rounded-2xl resize-none focus-visible:ring-blue-500 focus-visible:border-blue-500 text-lg shadow-xs"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={result === "Sending...."}
                  className="w-full sm:w-auto px-12 h-14 text-lg font-bold rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-colors shadow-xl ml-auto flex items-center justify-center gap-2 group cursor-pointer border border-transparent"
                >
                  {result === "Sending...." ? (
                    <>
                      Sending Message...{" "}
                      <Loader2 className="animate-spin" size={20} />
                    </>
                  ) : result === "Success" ? (
                    "Message Sent!"
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mb-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="relative h-112.5 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl group">
            {/* Google Map Embed */}
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1926.4400398087903!2d120.66096612930504!3d15.05474781220588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f6de62e1513f%3A0x9e35e6381eef50b9!2sLandmark%20Bldg.%2C%20Diamond%20Street%2C%20San%20Fernando%2C%20Pampanga!5e0!3m2!1sen!2sph!4v1767322001437!5m2!1sen!2sph"
              className="absolute inset-0 w-full h-full border-0 grayscale opacity-80 group-hover:grayscale-0 transition-all duration-1000"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

            {/* Center Info Card */}
            <div className="absolute bottom-8 left-8 right-8 md:left-auto md:right-8 md:bottom-8 lg:right-12 lg:bottom-12 md:max-w-sm pointer-events-none">
              <div className="bg-slate-900/90 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 border border-white/10 flex flex-col gap-4 relative overflow-hidden pointer-events-auto transition-transform hover:-translate-y-2 duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl font-mono text-white/5">
                  01
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-xl text-white tracking-tight">
                    Headquarters
                  </span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mt-2">
                  Unit 203 2nd Floor Landmark Building, Mc. Arthur Highway,
                  Kalayaan Village Service Road, Quebiawan, City of San Fernando
                  Pampanga
                </p>

                <a
                  href="https://maps.app.goo.gl/rsMgCJ8mbq5TmDgP7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 w-full rounded-2xl bg-white text-slate-900 px-6 py-4 text-sm font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

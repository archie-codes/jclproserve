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
  ChevronLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

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
      toast.success("Email sent successfully!");
      setResult("Success");

      form.reset();
    } else {
      setResult("Error");
      toast.error("Something went wrong");
    }
  };

  return (
    <main className="min-h-screen">
      {/* NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-blue-600-foreground font-bold text-xl group-hover:scale-105 transition-transform">
              <Image
                src="/jcl-logo.png"
                alt="Logo"
                width={40}
                height={40}
              />
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

      {/* Hero Section */}
      <section className="relative h-112.5 flex items-center justify-center overflow-hidden bg-linear-to-br from-blue-950 via-blue-900 to-slate-900">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/modern-office-building-exterior-at-night.jpg"
            alt="Contact Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-blue-950 via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 px-4 text-center text-white max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Get In Touch
          </h1>
          <p className="text-lg md:text-xl text-blue-100 text-pretty">
            Have questions about our selection process or need staffing
            solutions? Our team of experts is ready to help you find the perfect
            talent or your next career move.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-20 -mt-24">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6 text-center lg:text-left">
              <Card className="border-none shadow-xl bg-blue-600 text-primary-foreground transition-transform hover:-translate-y-1">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6">
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start justify-center lg:justify-start gap-4">
                      <div className="bg-white/10 p-3 rounded-xl">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-primary-foreground/70 text-sm font-medium uppercase tracking-wider">
                          Call Us
                        </p>
                        <p className="text-md font-semibold">
                          +63 (993) 190-8150
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start justify-center lg:justify-start gap-4">
                      <div className="bg-white/10 p-3 rounded-xl">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-primary-foreground/70 text-sm font-medium uppercase tracking-wider">
                          Email Us
                        </p>
                        <p className="text-md font-semibold">
                          hr.jclproserve@gmail.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start justify-center lg:justify-start gap-4">
                      <div className="bg-white/10 p-3 rounded-xl">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-primary-foreground/70 text-sm font-medium uppercase tracking-wider">
                          Office
                        </p>
                        <p className="text-md font-semibold">
                          Unit 203 2nd Floor Landmark Building, Mc. Arthur
                          Highway, Kalayaan Village Service Road,
                          <br />
                          Quebiawan, City of San Fernando Pampanga
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-9 pt-6 border-t border-white/10">
                    <p className="text-sm font-medium uppercase tracking-wider mb-4">
                      Follow Us
                    </p>
                    <div className="flex justify-center lg:justify-start gap-4">
                      <Link
                        href="#"
                        className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </Link>
                      <Link
                        href="#"
                        className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                      >
                        <Facebook className="w-5 h-5" />
                      </Link>
                      <Link
                        href="#"
                        className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl">
                <CardContent className="p-5">
                  <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                    <h4 className="font-bold">Business Hours</h4>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium text-foreground">
                        8:00 AM - 5:00 PM
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium text-foreground">
                        8:00 AM - 03:00 PM
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium text-destructive">
                        Closed
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-2 border-none shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="mb-10 text-center md:text-left">
                  <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
                  <p className="text-muted-foreground">
                    Complete the form below and one of our specialists will get
                    back to you within 24 hours.
                  </p>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        type="name"
                        name="name"
                        placeholder="John"
                        className="bg-muted/50 rounded-xl focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        type="last-name"
                        name="last-name"
                        placeholder="Doe"
                        className="bg-muted/50 rounded-xl focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        className="bg-muted/50 rounded-xl focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="09941234567"
                        className="bg-muted/50 rounded-xl focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      type="subject"
                      name="subject"
                      placeholder="Inquiry about staffing solutions"
                      className="bg-muted/50 rounded-xl focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">How can we help?</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your needs..."
                      className="min-h-37.5 bg-muted/50 rounded-xl resize-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={result === "Sending...."}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      opacity: result === "Sending...." ? 0.5 : 1,
                    }}
                    className="w-full px-10 h-12 text-lg rounded-full bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    {result === "Sending...." ? (
                      <>
                        {/* 2. Show the icon with a spin animation */}
                        Sending...{" "}
                        <Loader2 className="animate-spin" size={20} />
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mt-24 mb-10">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="relative h-112.5 rounded-3xl overflow-hidden border shadow-xl">
            {/* Google Map Embed */}
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1926.4400398087903!2d120.66096612930504!3d15.05474781220588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f6de62e1513f%3A0x9e35e6381eef50b9!2sLandmark%20Bldg.%2C%20Diamond%20Street%2C%20San%20Fernando%2C%20Pampanga!5e0!3m2!1sen!2sph!4v1767322001437!5m2!1sen!2sph"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />

            {/* Center Info Card */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div
                className="bg-primary/95 text-primary-foreground
                     backdrop-blur-md rounded-2xl shadow-2xl
                     px-6 py-5 flex flex-col items-center gap-3
                     ring-1 ring-white/20"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-6 h-6" />
                  <span className="font-semibold text-lg">
                    Our Headquarters
                  </span>
                </div>

                <p className="text-sm text-primary-foreground/80 text-center">
                  Unit 203 2nd Floor Landmark Building, Mc. Arthur Highway,
                  Kalayaan Village Service Road,
                  <br />
                  Quebiawan, City of San Fernando Pampanga
                </p>

                <a
                  href="https://maps.app.goo.gl/rsMgCJ8mbq5TmDgP7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2
                       rounded-full bg-white/90 text-primary
                       px-5 py-2 text-sm font-medium
                       hover:bg-white transition"
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

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  Globe2,
  Users2,
  Building2,
  ChevronLeft,
  Loader2,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ServicesSection from "@/components/ServicesSection";


export default function PartnerWithUsPage() {
  const [result, setResult] = useState("");


  // State for the form message (to pre-fill it)
  const [formMessage, setFormMessage] = useState("");

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
    <div className="min-h-screen bg-white font-sans text-slate-900">
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

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-950 via-blue-900 to-slate-900 text-white py-24 lg:py-32">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Build Your Workforce with{" "}
            <span className="text-emerald-400">Precision</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10">
            Partner with a global manpower leader. We bridge the gap between
            world-class talent and industry-leading organizations.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-teal-900 hover:bg-slate-100 font-semibold"
              onClick={() =>
                document
                  .getElementById("partner-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Start Partnership
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-emerald-400 text-emerald-100 hover:bg-emerald-900/50 hover:text-white"
              onClick={() =>
                document
                  .getElementById("our-services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Our Services
            </Button>
          </div>
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>
      </section>

      {/* --- VALUE PROPOSITION SECTION --- */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              We don&apos;t just fill positions; we build teams that drive your
              business forward through rigorous screening and global reach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="border-t-4 border-t-teal-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe2 className="w-6 h-6 text-teal-700" />
                </div>
                <CardTitle className="text-xl text-blue-900">
                  Global Talent Pool
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-base">
                  Access thousands of skilled professionals from vetted
                  international markets ready to deploy to your location.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="border-t-4 border-t-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-blue-700" />
                </div>
                <CardTitle className="text-xl text-blue-900">
                  Rigorous Vetting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-base">
                  Our multi-stage screening process ensures only the top 5% of
                  candidates make it to your interview table.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="border-t-4 border-t-emerald-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Users2 className="w-6 h-6 text-emerald-700" />
                </div>
                <CardTitle className="text-xl text-blue-900">
                  Rapid Deployment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 text-base">
                  We handle visa processing, medicals, and documentation to get
                  your workforce on-site in record time.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION WITH MODAL --- */}

      <ServicesSection />

      {/* --- FORM SECTION --- */}
      <section id="partner-form" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left Side: Context */}
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
                Ready to Grow Your Team?
              </h2>
              <p className="text-lg text-slate-600">
                Fill out the form to schedule a consultation with our manpower
                strategists. We will tailor a recruitment plan specifically for
                your industry needs.
              </p>

              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-4">
                  <div className="bg-teal-50 p-3 rounded-full">
                    <Building2 className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">
                      Corporate Headquarters
                    </h4>
                    <p className="text-sm text-slate-500">
                      Unit 203 2nd Floor Landmark Building, Mc. Arthur Highway,
                      Kalayaan Village Service Road,
                      <br />
                      Quebiawan, City of San Fernando Pampanga
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-teal-50 p-3 rounded-full">
                    <Users2 className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">
                      Dedicated Support
                    </h4>
                    <p className="text-sm text-slate-500">
                      hr.jclproserve@gmail.com
                    </p>
                    <p className="text-sm text-slate-500">+63 (993) 190-8150</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Shadcn Form */}
            <div className="lg:w-1/2 w-full">
              <Card className="border-slate-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-900">
                    Partnership Inquiry
                  </CardTitle>
                  <CardDescription>
                    Tell us about your hiring needs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="Name"
                          placeholder="Juan"
                          className="border-slate-300 focus:ring-teal-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="Lastname"
                          placeholder="Dela Cruz"
                          className="border-slate-300 focus:ring-teal-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        name="Company"
                        placeholder="Acme Inc."
                        className="border-slate-300 focus:ring-teal-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="Phone"
                        placeholder="+63 (993) 123-4561"
                        className="border-slate-300 focus:ring-teal-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email</Label>
                      <Input
                        id="email"
                        type="email"
                        name="Email"
                        placeholder="john@company.com"
                        className="border-slate-300 focus:ring-teal-500"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select name="Industry" required>
                        <SelectTrigger className="border-slate-300">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="construction">
                            Construction
                          </SelectItem>
                          <SelectItem value="it">
                            Information Technology
                          </SelectItem>
                          <SelectItem value="hospitality">
                            Hospitality
                          </SelectItem>
                          <SelectItem value="manufacturing">
                            Manufacturing
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">How can we help?</Label>
                      <Textarea
                        id="message"
                        name="Message"
                        // BIND VALUE TO STATE
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder="We are looking for 50 skilled nurses..."
                        className="min-h-30 border-slate-300 focus:ring-teal-500"
                        required
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
        </div>
      </section>

      {/* --- CTA / FOOTER SLICE --- */}
      <section className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-2xl font-bold">
              Ready to transform your recruitment?
            </h3>
            <p className="text-blue-200">
              Join 500+ companies trusting us globally.
            </p>
          </div>

          {/* WRAP BUTTON IN DIALOG */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white hover:text-blue-900 transition-colors"
              >
                Contact Sales Direct
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md bg-white">
              <DialogHeader>
                <DialogTitle className="text-blue-900 text-xl">
                  Contact Our Agent Team
                </DialogTitle>
                <DialogDescription className="text-slate-600">
                  Skip the queue. Connect with a senior manpower strategist
                  directly.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                {/* Option A: Phone Call */}
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-teal-500 hover:bg-teal-50 transition-all cursor-pointer group"
                >
                  <div className="bg-blue-100 p-2 rounded-full group-hover:bg-teal-600 group-hover:text-white transition-colors text-blue-700">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Call Us Now</p>
                    <p className="text-sm text-slate-500">+63 (993) 190-8150</p>
                  </div>
                </a>

                {/* Option B: Email */}
                <a
                  href="mailto:sales@agency.com"
                  className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-teal-500 hover:bg-teal-50 transition-all cursor-pointer group"
                >
                  <div className="bg-blue-100 p-2 rounded-full group-hover:bg-teal-600 group-hover:text-white transition-colors text-blue-700">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Email Direct</p>
                    <p className="text-sm text-slate-500">
                      hr.jclproserve@gmail.com
                    </p>
                  </div>
                </a>

                {/* Option C: WhatsApp (Very popular for Manpower) */}
                <a
                  href="https://web.whatsapp.com/send?phone=+639931908150"
                  target="_blank"
                  className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all cursor-pointer group"
                >
                  <div className="bg-emerald-100 p-2 rounded-full group-hover:bg-emerald-600 group-hover:text-white transition-colors text-emerald-700">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      WhatsApp Chat
                    </p>
                    <p className="text-sm text-slate-500">Instant Response</p>
                  </div>
                </a>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Added for navigation
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  CheckCircle2, 
  ArrowRight, 
  Brush, 
  Armchair, 
  Users, 
  Phone,
} from "lucide-react";

// 1. DATA DEFINITION
const servicesData = [
  {
    title: "Janitorial Support Services",
    id: "janitorial",
    desc: "Expert sanitation and facility maintenance services.",
    details: [
      "Deep cleaning and sanitization protocols",
      "Waste management and recycling",
      "24/7 onsite maintenance support",
      "Green cleaning product compliance"
    ],
    icon: Brush,
  },
  {
    title: "Recruitment and Staffing",
    id: "recruitment",
    desc: "Tailored hiring solutions for diverse business needs.",
    details: [
      "Executive search and headhunting",
      "Technical skills assessment",
      "Background checks and vetting",
      "Interview coordination"
    ],
    icon: Armchair,
  },
  {
    title: "Manpower Services",
    id: "manpower",
    desc: "Comprehensive staffing solutions across various sectors.",
    details: ["Construction labor", "Factory workers", "Agricultural staff"],
    icon: Users,
  },
  {
    title: "Workforce Outsourcing",
    id: "outsourcing",
    desc: "Flexible outsourcing to optimize your workforce management.",
    details: ["Payroll management", "HR compliance", "Benefits administration"],
    icon: Phone,
  },
  {
    title: "Skilled Deployment",
    id: "skilled",
    desc: "Skilled labor for production and assembly lines.",
    details: ["Certified welders", "Electricians", "Machine operators"],
    icon: Users,
  },
];

// 2. THE COMPONENT
type Service = typeof servicesData[number];

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const router = useRouter();


  const handleGetQuote = () => {
    if (selectedService) {
      setSelectedService(null);

      // LOGIC: If the form exists on this page, scroll to it.
      // If not (e.g., we are on Home page), go to the Partner page form.
      const formElement = document.getElementById('partner-form');
      
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Navigate to partner page and scroll to form
        router.push('/partnerwithus#partner-form');
      }
    }
  };

  return (
    <section id="our-services" className="py-32 relative bg-slate-50/50">
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
          {servicesData.map((service, i) => (
            <Card
              key={i}
              onClick={() => setSelectedService(service)}
              className="group cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-none bg-white rounded-[2rem] overflow-hidden"
            >
              <CardContent className="p-10 space-y-6">
                <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <service.icon size={32} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-blue-900">{service.title}</h3>
                  <p className="text-slate-500 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <div className="inline-flex items-center text-sm font-bold text-teal-600 group-hover:translate-x-1 transition-transform">
                  View Details <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="bg-white sm:max-w-lg border-t-8 border-teal-600 max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <selectedService.icon className="w-8 h-8 text-blue-900" />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-blue-900">
                    {selectedService.title}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-lg text-slate-600">
                  {selectedService.desc}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <h4 className="font-semibold text-slate-900 mb-3">Service Inclusions:</h4>
                <ul className="space-y-2">
                  {selectedService.details?.map((detail: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <DialogFooter className="gap-2 sm:gap-2 mt-4 pt-4 border-t border-slate-100">
                <Button 
                    variant="outline" 
                    className="w-full sm:w-auto" 
                    onClick={() => setSelectedService(null)}
                >
                    Close
                </Button>
                <Button 
                    className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800" 
                    onClick={handleGetQuote}
                >
                    Get a Quote
                </Button>
            </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
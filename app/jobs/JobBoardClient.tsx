"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle2,
  ListChecks,
  Flame,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getJobs } from "@/lib/actions/jobActions";

export type Job = {
  id: number;
  title: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[] | null;
  qualifications: string[] | null;
  experience: string[] | null;
  skills: string[] | null;
  salary: string | null;
  urgent: boolean | null;
};

export default function JobBoardClient({
  initialJobs,
}: {
  initialJobs: Job[];
}) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Fetch fresh data ONLY when the page is loaded/refreshed
    async function fetchFreshJobs() {
      try {
        const freshData = await getJobs();
        if (freshData && freshData.length > 0) {
          setJobs(freshData as Job[]);
        }
      } catch (error) {
        console.error("Failed to refresh jobs:", error);
      }
    }

    // Call it once on mount to bypass any stale Next.js cache
    fetchFreshJobs();

    // (The setInterval polling has been removed for performance/safety)
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase());

      const matchesType = typeFilter === "all" || job.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [search, typeFilter, jobs]);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50/50">
      {/* NAVIGATION HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600 shadow-sm group-hover:scale-105 transition-transform">
              <Image src="/jcl-logo.png" alt="Logo" width={40} height={40} />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              JC&L Proserve Inc.
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft size={16} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* --- JOB LISTING SECTION --- */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Current Openings
            </h1>
            <p className="text-gray-500 mt-2">
              Find the role that fits you best.
            </p>
          </div>

          {/* 🔎 Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="relative flex-1">
              <Input
                placeholder="Search job title or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-4 border-gray-200"
              />
            </div>

            {/* HYDRATION FIX */}
            {isMounted ? (
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="md:w-48 border-gray-200">
                  <SelectValue placeholder="Employment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-Time">Full-Time</SelectItem>
                  <SelectItem value="Part-Time">Part-Time</SelectItem>
                  <SelectItem value="Contractual">Contractual</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="h-10 md:w-48 rounded-md border border-gray-200 bg-white" />
            )}
          </div>

          {/* Job Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`
                    relative cursor-pointer overflow-hidden rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1
                    ${
                      job.urgent
                        ? "bg-white border-2 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]"
                        : "bg-white border border-gray-100 shadow-sm hover:shadow-xl"
                    }
                  `}
                >
                  {/* URGENT BADGE */}
                  {job.urgent && (
                    <div className="absolute top-0 right-0 z-20">
                      <div className="bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest flex items-center gap-1 shadow-sm animate-pulse">
                        <Flame size={12} className="fill-white" />
                        Massive Hiring
                      </div>
                    </div>
                  )}

                  {/* Decorative Background Hover Effect */}
                  <div
                    className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0 
                    ${job.urgent ? "bg-orange-500" : "bg-blue-600"}`}
                  />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset transition-colors
                        ${
                          job.urgent
                            ? "bg-orange-50 text-orange-700 ring-orange-700/10 group-hover:bg-white/20 group-hover:text-white group-hover:ring-white/30"
                            : "bg-blue-50 text-blue-700 ring-blue-700/10 group-hover:bg-white/20 group-hover:text-white group-hover:ring-white/30"
                        }`}
                      >
                        {job.type}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-white transition-colors">
                      {job.title}
                    </h2>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 group-hover:text-white/90 transition-colors">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {job.location}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 grow group-hover:text-white/90 transition-colors">
                      {job.description}
                    </p>

                    <div
                      className={`flex items-center text-sm font-semibold transition-colors
                      ${
                        job.urgent
                          ? "text-orange-600 group-hover:text-white"
                          : "text-blue-600 group-hover:text-white"
                      }`}
                    >
                      View Details
                      <ChevronLeft className="rotate-180 ml-1 h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-gray-500">
                No jobs found matching your criteria.
              </div>
            )}
          </div>

          {/* Detailed Job Modal */}
          <Dialog
            open={!!selectedJob}
            onOpenChange={(open) => !open && setSelectedJob(null)}
          >
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col p-0 gap-0">
              {selectedJob && (
                <>
                  {/* Modal Header */}
                  <div className="p-6 border-b border-gray-100">
                    <DialogHeader>
                      <div className="flex flex-col gap-2">
                        {/* URGENT BANNER IN MODAL */}
                        {selectedJob.urgent && (
                          <div className="w-full bg-orange-100 text-orange-800 text-xs font-bold px-3 py-2 rounded-md border border-orange-200 mb-2 flex items-center gap-2">
                            <Flame size={14} className="fill-orange-800" />
                            URGENTLY HIRING FOR THIS POSITION
                          </div>
                        )}
                        <span className="w-fit inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                          {selectedJob.type}
                        </span>
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                          {selectedJob.title}
                        </DialogTitle>
                        <DialogDescription className="flex items-center gap-4 text-sm mt-1">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            {selectedJob.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-gray-400" />
                            posted recently
                          </span>
                        </DialogDescription>
                        {selectedJob.salary && (
                          <div className="mt-4">
                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                              Salary: {selectedJob.salary}
                            </span>
                          </div>
                        )}
                      </div>
                    </DialogHeader>
                  </div>

                  {/* Scrollable Modal Body */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Description */}
                    <section>
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-blue-600" />
                        About the Role
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">
                        {selectedJob.description}
                      </p>
                    </section>

                    {/* Responsibilities */}
                    {selectedJob.responsibilities &&
                      selectedJob.responsibilities.length > 0 && (
                        <section>
                          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <ListChecks className="w-4 h-4 text-blue-600" />
                            Key Responsibilities
                          </h3>
                          <ul className="space-y-2">
                            {selectedJob.responsibilities.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-3 text-sm text-gray-600"
                              >
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}

                    {/* Qualifications */}
                    {selectedJob.qualifications &&
                      selectedJob.qualifications.length > 0 && (
                        <section>
                          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                            Qualifications
                          </h3>
                          <ul className="space-y-2">
                            {selectedJob.qualifications.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-3 text-sm text-gray-600"
                              >
                                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}

                    {/* Skills */}
                    {selectedJob.skills && selectedJob.skills.length > 0 && (
                      <section>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          Required Skills
                        </h3>
                        <ul className="space-y-2">
                          {selectedJob.skills.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-sm text-gray-600"
                            >
                              <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {/* Experience Requirements */}
                    {selectedJob.experience &&
                      selectedJob.experience.length > 0 && (
                        <section>
                          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                            Experience (Optional but Advantageous)
                          </h3>
                          <ul className="space-y-2">
                            {selectedJob.experience.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-3 text-sm text-gray-600"
                              >
                                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}
                  </div>

                  {/* Modal Footer / Apply Actions */}
                  <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col gap-3">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=hr.jclproserve@gmail.com&su=Application for ${encodeURIComponent(
                        selectedJob.title,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full text-center rounded-lg text-white py-3 font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-md
                      ${
                        selectedJob.urgent
                          ? "bg-orange-600 shadow-orange-200"
                          : "bg-blue-600 shadow-blue-200"
                      }`}
                    >
                      Apply Now via Gmail
                    </a>

                    <p className="text-xs text-center text-gray-500">
                      Or email your resume directly to{" "}
                      <span className="font-semibold text-gray-700">
                        hr.jclproserve@gmail.com
                      </span>
                    </p>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </main>
  );
}

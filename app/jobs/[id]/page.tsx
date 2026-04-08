import { getJobById } from "@/lib/actions/jobActions";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Briefcase,
  CheckCircle2,
  ListChecks,
  Flame,
  ChevronLeft,
  Banknote,
  Wrench,
  History,
} from "lucide-react";

// 1. Next.js 15 requires params to be a Promise
export default async function SingleJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 2. We await the promise before accessing .id
  const resolvedParams = await params;
  const job = await getJobById(Number(resolvedParams.id));

  // If someone types in a bad ID, show the Next.js 404 page
  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* NAVIGATION HEADER */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft size={16} /> Back to All Jobs
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg tracking-tight text-gray-900 hidden sm:block">
              JC&L Proserve
            </span>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <Image
                src="/jcl-logo.png"
                alt="Logo"
                width={20}
                height={20}
                className="brightness-0 invert"
              />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 sm:py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          {/* HEADER SECTION */}
          <div className="p-8 sm:p-10 border-b border-gray-100 relative">
            {job.urgent && (
              <div className="w-fit bg-orange-100 text-orange-800 text-xs font-bold px-3 py-2 rounded-md border border-orange-200 mb-6 flex items-center gap-2">
                <Flame size={16} className="fill-orange-800" /> URGENTLY HIRING
                FOR THIS POSITION
              </div>
            )}

            <span className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 mb-4">
              {job.type}
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                <MapPin className="h-4 w-4 text-gray-400" /> {job.location}
              </span>
              <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                <Clock className="h-4 w-4 text-gray-400" /> Full-time
              </span>
              {job.salary && (
                <span className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-100 font-medium">
                  <Banknote className="h-4 w-4 text-green-600" /> {job.salary}
                </span>
              )}
            </div>
          </div>

          {/* DETAILS SECTION */}
          <div className="p-8 sm:p-10 space-y-10">
            <section>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" /> About the Role
              </h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {job.description}
              </p>
            </section>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <section>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <ListChecks className="w-5 h-5 text-blue-600" /> Key
                  Responsibilities
                </h3>
                <ul className="space-y-3">
                  {job.responsibilities.map((item: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {job.qualifications && job.qualifications.length > 0 && (
              <section>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />{" "}
                  Qualifications
                </h3>
                <ul className="space-y-3">
                  {job.qualifications.map((item: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {job.skills && job.skills.length > 0 && (
              <section>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-blue-600" /> Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((item: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg text-sm text-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {job.experience && job.experience.length > 0 && (
              <section>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-600" /> Experience
                </h3>
                <ul className="space-y-3">
                  {job.experience.map((item: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* CALL TO ACTION BOTTOM */}
          <div className="p-8 sm:p-10 bg-gray-50 border-t border-gray-200 flex flex-col items-center">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=hr.jclproserve@gmail.com&su=Application for ${encodeURIComponent(job.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full max-w-md text-center rounded-xl text-white py-4 text-lg font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-lg ${job.urgent ? "bg-orange-600 shadow-orange-200" : "bg-blue-600 shadow-blue-200"}`}
            >
              Apply Now via Gmail
            </a>
            <p className="text-sm text-center text-gray-500 mt-4">
              Or email your resume directly to{" "}
              <span className="font-semibold text-gray-900">
                hr.jclproserve@gmail.com
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

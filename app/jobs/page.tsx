// "use client";

// import { useState, FormEvent, useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { toast } from "sonner";

// import {
//   ChevronLeft,
//   MapPin,
//   Clock,
//   DollarSign,
//   CheckCircle2,
//   Loader2,
//   UploadCloud,
//   File,
//   X
// } from "lucide-react";

// // --- MOCK DATA FOR THIS SPECIFIC JOB ---
// const JOB = {
//   title: "Senior Software Engineer",
//   department: "Engineering",
//   location: "Remote / Hybrid",
//   type: "Full-time",
//   salary: "₱80k - ₱120k",
//   posted: "2 days ago",
//   description: "We are seeking a talented Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining high-quality web applications. If you are passionate about clean code and scalable architecture, we want to hear from you.",
//   responsibilities: [
//     "Architect and build scalable front-end applications using React and Next.js.",
//     "Collaborate with designers and product managers to deliver excellent user experiences.",
//     "Mentor junior developers and conduct code reviews.",
//     "Optimize applications for maximum speed and scalability."
//   ],
//   requirements: [
//     "5+ years of experience with JavaScript/TypeScript.",
//     "Strong proficiency in React, Next.js, and Tailwind CSS.",
//     "Experience with RESTful APIs and GraphQL.",
//     "Excellent problem-solving skills and attention to detail."
//   ]
// };

// export default function JobDetailsPage() {
//   // --- FORM LOGIC ---
//   const [isSending, setIsSending] = useState(false);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [fileError, setFileError] = useState<string>("");
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     setFileError("");

//     if (!file) {
//       setSelectedFile(null);
//       return;
//     }

//     // Validate file type
//     if (file.type !== "application/pdf") {
//       setFileError("Please upload a PDF file only.");
//       setSelectedFile(null);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//       return;
//     }

//     // Validate file size (5MB max)
//     const maxSize = 5 * 1024 * 1024; // 5MB in bytes
//     if (file.size > maxSize) {
//       setFileError("File size must be less than 5MB.");
//       setSelectedFile(null);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//       return;
//     }

//     setSelectedFile(file);
//   };

//   const handleRemoveFile = () => {
//     setSelectedFile(null);
//     setFileError("");
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setIsSending(true);
//     setFileError("");

//     const form = event.currentTarget;
//     const formData = new FormData(form);

//     // Add specific access key
//     formData.append("access_key", "f447d150-8fc0-4eeb-9958-6161dc6be794");
//     // Add context so you know which job they applied for
//     formData.append("subject", `New Application for ${JOB.title}`);

//     // Ensure resume file is included if selected
//     if (selectedFile && fileInputRef.current?.files?.[0]) {
//       formData.append("resume", selectedFile);
//     }

//     try {
//       const response = await fetch("https://api.web3forms.com/submit", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();

//       if (data.success) {
//         toast.success("Application sent successfully!");
//         form.reset();
//         setSelectedFile(null);
//         if (fileInputRef.current) {
//           fileInputRef.current.value = "";
//         }
//       } else {
//         toast.error("Something went wrong. Please try again.");
//       }
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       toast.error("Network error. Please check your connection.");
//     } finally {
//       setIsSending(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-slate-50">

//       {/* --- HEADER --- */}
//       <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <Link href="/" className="flex items-center gap-3 group">
//             <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-50 to-white border border-blue-100 flex items-center justify-center shadow-sm">
//               <Image src="/jcl-logo.png" alt="Logo" width={28} height={28} className="object-contain" />
//             </div>
//             <span className="font-bold text-xl tracking-tight text-slate-800">
//               JC&L Proserve Inc<span className="text-blue-600">.</span>
//             </span>
//           </Link>
//           <Link href="/" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors bg-slate-100 hover:bg-blue-50 px-4 py-2 rounded-full">
//             <ChevronLeft size={16} />
//             Back to Jobs
//           </Link>
//         </div>
//       </header>

//       <div className="container mx-auto max-w-7xl px-6 py-10">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

//           {/* --- LEFT COLUMN: JOB DETAILS --- */}
//           <div className="lg:col-span-2 space-y-8">

//             {/* Job Header Card */}
//             <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
//               <div className="mb-6">
//                 <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
//                   {JOB.department}
//                 </span>
//               </div>
//               <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
//                 {JOB.title}
//               </h1>

//               <div className="flex flex-wrap gap-4 md:gap-8 border-t border-slate-100 pt-6">
//                 <div className="flex items-center gap-2 text-slate-600">
//                   <MapPin className="text-blue-500" size={20} />
//                   <span>{JOB.location}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-slate-600">
//                   <Clock className="text-blue-500" size={20} />
//                   <span>{JOB.type}</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-slate-600">
//                   <DollarSign className="text-blue-500" size={20} />
//                   <span>{JOB.salary}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Description Section */}
//             <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8">
//               <section>
//                 <h2 className="text-xl font-bold text-slate-900 mb-4">About the Role</h2>
//                 <p className="text-slate-600 leading-relaxed text-lg">
//                   {JOB.description}
//                 </p>
//               </section>

//               <section>
//                 <h2 className="text-xl font-bold text-slate-900 mb-4">Key Responsibilities</h2>
//                 <ul className="space-y-3">
//                   {JOB.responsibilities.map((item, i) => (
//                     <li key={i} className="flex items-start gap-3 text-slate-600">
//                       <CheckCircle2 className="text-green-500 mt-1 shrink-0" size={20} />
//                       <span className="leading-relaxed">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </section>

//               <section>
//                 <h2 className="text-xl font-bold text-slate-900 mb-4">Requirements</h2>
//                 <ul className="space-y-3">
//                   {JOB.requirements.map((item, i) => (
//                     <li key={i} className="flex items-start gap-3 text-slate-600">
//                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0" />
//                       <span className="leading-relaxed">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </section>
//             </div>
//           </div>

//           {/* --- RIGHT COLUMN: APPLICATION FORM (STICKY) --- */}
//           <div className="relative">
//             <div className="sticky top-24">
//               <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl shadow-blue-900/5">
//                 <div className="mb-6">
//                   <h3 className="text-xl font-bold text-slate-900">Apply for this position</h3>
//                   <p className="text-sm text-slate-500 mt-1">Fill out the form below to submit your application.</p>
//                 </div>

//                 <form onSubmit={onSubmit} className="space-y-4">
//                   {/* Name Input */}
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
//                     <input
//                       required
//                       type="text"
//                       name="name"
//                       placeholder="Juan Dela Cruz"
//                       className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
//                     />
//                   </div>

//                   {/* Email Input */}
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
//                     <input
//                       required
//                       type="email"
//                       name="email"
//                       placeholder="juan@example.com"
//                       className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
//                     />
//                   </div>

//                   {/* Cover Letter */}
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 mb-1.5">Cover Letter / Message</label>
//                     <textarea
//                       required
//                       name="message"
//                       rows={4}
//                       placeholder="Tell us why you're a great fit..."
//                       className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
//                     />
//                   </div>

//                   {/* File Upload */}
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 mb-1.5">
//                       Resume (PDF)
//                       <span className="text-slate-400 font-normal ml-1">(Optional, max 5MB)</span>
//                     </label>

//                     {!selectedFile ? (
//                       <div className="relative">
//                         <input
//                           ref={fileInputRef}
//                           type="file"
//                           name="resume"
//                           accept="application/pdf"
//                           onChange={handleFileChange}
//                           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//                         />
//                         <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 hover:border-blue-300 transition-all cursor-pointer group">
//                           <UploadCloud className="mx-auto text-slate-400 group-hover:text-blue-500 transition-colors mb-2" size={28} />
//                           <p className="text-sm text-slate-600 font-medium">Click to upload or drag and drop</p>
//                           <p className="text-xs text-slate-400 mt-1">PDF only, max 5MB</p>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="border-2 border-blue-200 bg-blue-50 rounded-xl p-4 flex items-center justify-between gap-3">
//                         <div className="flex items-center gap-3 flex-1 min-w-0">
//                           <div className="bg-blue-100 p-2 rounded-lg shrink-0">
//                             <File className="text-blue-600" size={20} />
//                           </div>
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm font-medium text-slate-900 truncate">
//                               {selectedFile.name}
//                             </p>
//                             <p className="text-xs text-slate-500">
//                               {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
//                             </p>
//                           </div>
//                         </div>
//                         <button
//                           type="button"
//                           onClick={handleRemoveFile}
//                           className="p-1.5 hover:bg-blue-200 rounded-lg transition-colors shrink-0"
//                           aria-label="Remove file"
//                         >
//                           <X className="text-slate-600" size={18} />
//                         </button>
//                       </div>
//                     )}

//                     {fileError && (
//                       <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
//                         <X size={14} />
//                         {fileError}
//                       </p>
//                     )}
//                   </div>

//                   {/* Submit Button */}
//                   <button
//                     type="submit"
//                     disabled={isSending}
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
//                   >
//                     {isSending ? (
//                       <>
//                         <Loader2 className="animate-spin" size={20} />
//                         Sending...
//                       </>
//                     ) : (
//                       "Submit Application"
//                     )}
//                   </button>

//                   <p className="text-xs text-center text-slate-400 mt-4">
//                     By submitting, you agree to our privacy policy.
//                   </p>
//                 </form>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </main>
//   );
// }
"use client";

import { useMemo, useState } from "react";
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
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Job = {
  id: number;
  title: string;
  location: string;
  type: string;
  description: string;
};

const jobList: Job[] = [
  {
    id: 1,
    title: "Janitorial Position",
    location: "City of San Fernando, Pampanga",
    type: "Full-Time",
    description:
      "To maintain cleanliness and orderliness of assigned areas, ensuring a hygienic environment. Duties include sweeping, mopping, dusting, trash removal. May also assist with minor maintenance tasks. Must follow safety protocols and use cleaning equipment properly.",
  },
  {
    id: 2,
    title: "Production Staff",
    location: "City of San Fernando, Pampanga",
    type: "Full-Time",
    description:
      "To assist in the manufacturing process by operating machinery, assembling products. Responsibilities include quality control, packaging, and maintaining a safe work environment. Must follow production schedules and meet output targets. Attention to detail and teamwork are essential.",
  },
];

export default function CareerList() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  /* 🔍 Filter Logic */
  const filteredJobs = useMemo(() => {
    return jobList.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase());

      const matchesType = typeFilter === "all" || job.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  return (
    <main className="flex flex-col bg-background">
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

      {/* --- JOB LISTING SECTION --- */}
      <section className="relative pt-8 pb-12 overflow-hidden ">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* 🔎 Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 px-5">
            <Input
              placeholder="Search job title or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="md:max-w-sm"
            />

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="md:w-48">
                <SelectValue placeholder="Employment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-Time">Full-Time</SelectItem>
                <SelectItem value="Part-Time">Part-Time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Job Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 flex flex-col justify-between group relative cursor-pointer overflow-hidden ring-1 ring-gray-900/5 transform hover:scale-105 hover:-translate-y-1 "
              >
                <span className="absolute top-2 left-2 z-0 h-1 w-1 rounded-full bg-blue-600 transition-all duration-300 group-hover:scale-[180] -translate-y-4 -translate-x-4"></span>
                <span className="absolute hidden top-2 left-2 h-14 w-14 place-items-center rounded-full bg-blue-600 transition-all duration-300 group-hover:bg-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8 text-white transition-all"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z"
                      clipRule="evenodd"
                    />
                    <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
                  </svg>
                </span>
                {/* <h2 className="text-lg font-bold mb-1">{job.title}</h2>
                <p className="text-sm text-muted-foreground mb-2">
                  {job.location} · {job.type}
                </p>
                <p className="text-sm text-gray-600">
                  {job.description.slice(0, 90)}...
                </p>

                <span className="inline-block mt-3 text-sm font-medium text-blue-600">
                  View Details →
                </span> */}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-white relative font-sans group-hover:translate-x-4 transition-all duration-300 tracking-wide">
                    {job.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2 group-hover:text-white relative font-sans flex align-middle transition-all duration-300 tracking-wide">
                    {job.location} · {job.type}
                  </p>
                  <p className="text-gray-700 text-sm mb-2 group-hover:text-white relative font-sans flex align-middle transition-all duration-300 tracking-wide">
                    {job.description.slice(0, 100)}...
                  </p>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="text-blue-400 text-sm font-medium hover:underline group-hover:text-white relative font-sans flex align-middle transition-all duration-300 tracking-wide"
                  >
                    View More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* shadcn Dialog */}
          <Dialog
            open={!!selectedJob}
            onOpenChange={() => setSelectedJob(null)}
          >
            <DialogContent className="max-w-lg">
              {selectedJob && (
                <>
                  <DialogHeader>
                    <DialogTitle>{selectedJob.title}</DialogTitle>
                    <DialogDescription>
                      {selectedJob.location} · {selectedJob.type}
                    </DialogDescription>
                  </DialogHeader>

                  <p className="text-sm text-muted-foreground mt-4">
                    {selectedJob.description}
                  </p>

                  <div className="flex flex-col gap-3 mt-6">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=hr.jclproserve@gmail.com&su=Application for ${encodeURIComponent(
                        selectedJob.title
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center rounded-full bg-blue-600 text-white py-2 font-semibold hover:bg-blue-700 transition"
                    >
                      Apply via Gmail
                    </a>

                    <p className="text-xs text-center text-muted-foreground">
                      Or send your resume to{" "}
                      <span className="font-medium">
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

// "use client";

// import { useState, useEffect } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   createJob,
//   deleteJob,
//   getJobs,
//   updateJob,
// } from "@/lib/actions/jobActions";
// import { logout } from "@/lib/actions/authActions"; // 👈 Your new logout action
// import { useRouter } from "next/navigation";
// import {
//   Plus,
//   Trash2,
//   Loader2,
//   ExternalLink,
//   Pencil,
//   X,
//   Eye,
//   MapPin,
//   Clock,
//   Briefcase,
//   ListChecks,
//   CheckCircle2,
//   Flame,
//   Wrench,
//   History,
//   Banknote,
//   LogOut,
//   LayoutDashboard,
// } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import { toast } from "sonner";

// // 1. Validation Schema
// const formSchema = z.object({
//   title: z.string().min(2, "Job title is required"),
//   location: z.string().min(2, "Location is required"),
//   type: z.string().min(1, "Employment type is required"),
//   salary: z.string().optional(),
//   description: z.string().min(10, "Please provide a detailed description"),
//   urgent: z.boolean().optional(),
//   responsibilities: z.array(z.object({ value: z.string().min(1) })).min(1),
//   qualifications: z.array(z.object({ value: z.string().min(1) })).min(1),
//   skills: z.array(z.object({ value: z.string() })).optional(),
//   experience: z.array(z.object({ value: z.string() })).optional(),
// });

// export default function AdminDashboard() {
//   const router = useRouter();

//   // State Management
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isLoadingList, setIsLoadingList] = useState(true);
//   const [activeJobs, setActiveJobs] = useState<any[]>([]);
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);

//   // Form Setup
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       location: "City of San Fernando, Pampanga",
//       type: "",
//       salary: "",
//       description: "",
//       urgent: false,
//       responsibilities: [{ value: "" }],
//       qualifications: [{ value: "" }],
//       skills: [],
//       experience: [],
//     },
//   });

//   const watchedValues = form.watch();

//   const {
//     fields: respFields,
//     append: appendResp,
//     remove: removeResp,
//   } = useFieldArray({ control: form.control, name: "responsibilities" });
//   const {
//     fields: qualFields,
//     append: appendQual,
//     remove: removeQual,
//   } = useFieldArray({ control: form.control, name: "qualifications" });
//   const {
//     fields: skillFields,
//     append: appendSkill,
//     remove: removeSkill,
//   } = useFieldArray({ control: form.control, name: "skills" });
//   const {
//     fields: expFields,
//     append: appendExp,
//     remove: removeExp,
//   } = useFieldArray({ control: form.control, name: "experience" });

//   useEffect(() => {
//     loadJobs();
//   }, []);

//   async function loadJobs() {
//     setIsLoadingList(true);
//     try {
//       const data = await getJobs();
//       setActiveJobs(data);
//     } catch (e) {
//       console.error(e);
//       toast.error("Failed to load jobs.");
//     } finally {
//       setIsLoadingList(false);
//     }
//   }

//   // --- Handlers ---
//   const handleSignOut = async () => {
//     await logout();
//     toast.success("Signed out successfully");
//     router.push("/admin/login");
//   };

//   const handleEdit = (job: any) => {
//     setEditingId(job.id);
//     form.reset({
//       ...job,
//       responsibilities: job.responsibilities.map((r: string) => ({ value: r })),
//       qualifications: job.qualifications.map((q: string) => ({ value: q })),
//       skills: job.skills?.map((s: string) => ({ value: s })) || [],
//       experience: job.experience?.map((e: string) => ({ value: e })) || [],
//     });
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     toast.info(`Editing: ${job.title}`);
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     form.reset({
//       title: "",
//       location: "City of San Fernando, Pampanga",
//       type: "",
//       salary: "",
//       description: "",
//       urgent: false,
//       responsibilities: [{ value: "" }],
//       qualifications: [{ value: "" }],
//       skills: [],
//       experience: [],
//     });
//   };

//   async function handleDelete(id: number) {
//     if (
//       confirm("Permanently delete this job listing? This cannot be undone.")
//     ) {
//       const result = await deleteJob(id);
//       if (result.success) {
//         toast.success("Job removed.");
//         await loadJobs();
//       }
//     }
//   }

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsSubmitting(true);
//     try {
//       const formattedData = {
//         ...values,
//         responsibilities: values.responsibilities.map((r) => r.value),
//         qualifications: values.qualifications.map((q) => q.value),
//         skills: values.skills?.map((s) => s.value).filter(Boolean) || [],
//         experience:
//           values.experience?.map((e) => e.value).filter(Boolean) || [],
//       };

//       const result = editingId
//         ? await updateJob(editingId, formattedData)
//         : await createJob(formattedData);

//       if (result.success) {
//         toast.success(editingId ? "Update Successful!" : "Job Posted Live!");
//         cancelEdit();
//         await loadJobs();
//       } else {
//         toast.error("Failed to save job.");
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("An unexpected error occurred.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50/50 flex flex-col">
//       {/* --- TOP NAVIGATION BAR --- */}
//       <nav className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-sm">
//                 <Image src="/jcl-logo.png" alt="Logo" width={28} height={28} />
//               </div>
//               <div>
//                 <h1 className="font-bold text-lg text-gray-900 leading-tight">
//                   JC&L Proserve
//                 </h1>
//                 <p className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
//                   HR Portal
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <Link href="/jobs" target="_blank">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="text-gray-500 hover:text-blue-600 hidden md:flex"
//                 >
//                   <ExternalLink className="w-4 h-4 mr-2" /> Live Board
//                 </Button>
//               </Link>
//               <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={handleSignOut}
//                 className="text-gray-600 hover:text-red-600 hover:bg-red-50"
//               >
//                 <LogOut className="w-4 h-4 mr-2" /> Sign Out
//               </Button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* --- MAIN CONTENT AREA --- */}
//       <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-8">
//         {/* Page Header */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
//           <div>
//             <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
//               {editingId ? (
//                 <Pencil className="text-amber-500 w-8 h-8" />
//               ) : (
//                 <LayoutDashboard className="text-blue-600 w-8 h-8" />
//               )}
//               {editingId ? "Edit Job Listing" : "Create Job Listing"}
//             </h2>
//             <p className="text-gray-500 mt-1">
//               {editingId
//                 ? "Update the details below. Changes will reflect instantly."
//                 : "Draft a new vacant position to publish to the careers page."}
//             </p>
//           </div>
//           <div className="flex items-center gap-2">
//             <Button
//               variant="outline"
//               onClick={() => setIsPreviewOpen(true)}
//               className="bg-white"
//             >
//               <Eye className="w-4 h-4 mr-2 text-gray-500" /> Preview Post
//             </Button>
//             {editingId && (
//               <Button variant="destructive" onClick={cancelEdit}>
//                 <X className="w-4 h-4 mr-2" /> Cancel Edit
//               </Button>
//             )}
//           </div>
//         </div>

//         {/* --- FORM CARD --- */}
//         <div
//           className={`bg-white p-8 rounded-2xl shadow-sm border transition-all duration-500 relative overflow-hidden ${editingId ? "border-amber-400 ring-4 ring-amber-50" : "border-gray-200"}`}
//         >
//           {/* Subtle colored accent line at the top of the card */}
//           <div
//             className={`absolute top-0 left-0 w-full h-1 ${editingId ? "bg-amber-500" : "bg-blue-600"}`}
//           />

//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//               {/* Basic Details Section */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
//                   Basic Details
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <FormField
//                     control={form.control}
//                     name="title"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-gray-700">
//                           Job Title
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             className="bg-gray-50 focus:bg-white"
//                             placeholder="e.g. Area Manager"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="location"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-gray-700">
//                           Location
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             className="bg-gray-50 focus:bg-white"
//                             placeholder="e.g. San Fernando, Pampanga"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="type"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-gray-700">
//                           Employment Type
//                         </FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           value={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger className="bg-gray-50 focus:bg-white">
//                               <SelectValue placeholder="Select Type" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             <SelectItem value="Full-Time">Full-Time</SelectItem>
//                             <SelectItem value="Part-Time">Part-Time</SelectItem>
//                             <SelectItem value="Contractual">
//                               Contractual
//                             </SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="salary"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="text-gray-700">
//                           Salary (Optional)
//                         </FormLabel>
//                         <FormControl>
//                           <Input
//                             className="bg-gray-50 focus:bg-white"
//                             placeholder="e.g. Php 15,000 - 20,000"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//               </div>

//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-gray-700">
//                       Job Description Overview
//                     </FormLabel>
//                     <FormControl>
//                       <Textarea
//                         className="h-32 bg-gray-50 focus:bg-white resize-none"
//                         placeholder="Provide a brief summary of the role..."
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* Dynamic Lists Section */}
//               <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-8">
//                 {/* Responsibilities */}
//                 <div className="space-y-3">
//                   <div className="flex items-center justify-between">
//                     <FormLabel className="text-base font-semibold text-gray-900">
//                       Key Responsibilities
//                     </FormLabel>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       onClick={() => appendResp({ value: "" })}
//                       className="bg-white"
//                     >
//                       <Plus className="w-3 h-3 mr-2" /> Add Item
//                     </Button>
//                   </div>
//                   <div className="space-y-2">
//                     {respFields.map((field, index) => (
//                       <FormField
//                         key={field.id}
//                         control={form.control}
//                         name={`responsibilities.${index}.value`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormControl>
//                               <div className="flex items-center gap-2">
//                                 <Input
//                                   className="bg-white"
//                                   placeholder="What will they do?"
//                                   {...field}
//                                 />
//                                 <Button
//                                   type="button"
//                                   variant="ghost"
//                                   size="icon"
//                                   onClick={() => removeResp(index)}
//                                   disabled={respFields.length === 1}
//                                   className="text-gray-400 hover:text-red-500 hover:bg-red-50"
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                 </Button>
//                               </div>
//                             </FormControl>
//                           </FormItem>
//                         )}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Qualifications */}
//                 <div className="space-y-3 border-t border-gray-200 pt-6">
//                   <div className="flex items-center justify-between">
//                     <FormLabel className="text-base font-semibold text-gray-900">
//                       Qualifications
//                     </FormLabel>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       onClick={() => appendQual({ value: "" })}
//                       className="bg-white"
//                     >
//                       <Plus className="w-3 h-3 mr-2" /> Add Item
//                     </Button>
//                   </div>
//                   <div className="space-y-2">
//                     {qualFields.map((field, index) => (
//                       <FormField
//                         key={field.id}
//                         control={form.control}
//                         name={`qualifications.${index}.value`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormControl>
//                               <div className="flex items-center gap-2">
//                                 <Input
//                                   className="bg-white"
//                                   placeholder="Minimum requirements..."
//                                   {...field}
//                                 />
//                                 <Button
//                                   type="button"
//                                   variant="ghost"
//                                   size="icon"
//                                   onClick={() => removeQual(index)}
//                                   disabled={qualFields.length === 1}
//                                   className="text-gray-400 hover:text-red-500 hover:bg-red-50"
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                 </Button>
//                               </div>
//                             </FormControl>
//                           </FormItem>
//                         )}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Skills */}
//                 <div className="space-y-3 border-t border-gray-200 pt-6">
//                   <div className="flex items-center justify-between">
//                     <FormLabel className="text-base font-semibold text-gray-900">
//                       Required Skills{" "}
//                       <span className="text-gray-400 font-normal">
//                         (Optional)
//                       </span>
//                     </FormLabel>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       onClick={() => appendSkill({ value: "" })}
//                       className="bg-white"
//                     >
//                       <Plus className="w-3 h-3 mr-2" /> Add Skill
//                     </Button>
//                   </div>
//                   <div className="space-y-2">
//                     {skillFields.map((field, index) => (
//                       <FormField
//                         key={field.id}
//                         control={form.control}
//                         name={`skills.${index}.value`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormControl>
//                               <div className="flex items-center gap-2">
//                                 <Input
//                                   className="bg-white"
//                                   placeholder="e.g. Communication, Microsoft Office"
//                                   {...field}
//                                 />
//                                 <Button
//                                   type="button"
//                                   variant="ghost"
//                                   size="icon"
//                                   onClick={() => removeSkill(index)}
//                                   className="text-gray-400 hover:text-red-500 hover:bg-red-50"
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                 </Button>
//                               </div>
//                             </FormControl>
//                           </FormItem>
//                         )}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Experience */}
//                 <div className="space-y-3 border-t border-gray-200 pt-6">
//                   <div className="flex items-center justify-between">
//                     <FormLabel className="text-base font-semibold text-gray-900">
//                       Experience{" "}
//                       <span className="text-gray-400 font-normal">
//                         (Optional)
//                       </span>
//                     </FormLabel>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       onClick={() => appendExp({ value: "" })}
//                       className="bg-white"
//                     >
//                       <Plus className="w-3 h-3 mr-2" /> Add Experience
//                     </Button>
//                   </div>
//                   <div className="space-y-2">
//                     {expFields.map((field, index) => (
//                       <FormField
//                         key={field.id}
//                         control={form.control}
//                         name={`experience.${index}.value`}
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormControl>
//                               <div className="flex items-center gap-2">
//                                 <Input
//                                   className="bg-white"
//                                   placeholder="e.g. 2 years in manpower agency"
//                                   {...field}
//                                 />
//                                 <Button
//                                   type="button"
//                                   variant="ghost"
//                                   size="icon"
//                                   onClick={() => removeExp(index)}
//                                   className="text-gray-400 hover:text-red-500 hover:bg-red-50"
//                                 >
//                                   <Trash2 className="w-4 h-4" />
//                                 </Button>
//                               </div>
//                             </FormControl>
//                           </FormItem>
//                         )}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Status / Submit Section */}
//               <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t">
//                 <FormField
//                   control={form.control}
//                   name="urgent"
//                   render={({ field }) => (
//                     <FormItem className="flex items-center space-x-3 rounded-xl border border-orange-200 bg-orange-50/50 p-4 pr-6 cursor-pointer hover:bg-orange-50 transition-colors w-full sm:w-auto">
//                       <FormControl>
//                         <Checkbox
//                           checked={field.value}
//                           onCheckedChange={field.onChange}
//                           className="data-[state=checked]:bg-orange-600 border-orange-300"
//                         />
//                       </FormControl>
//                       <div className="space-y-0.5">
//                         <FormLabel className="text-orange-900 font-bold cursor-pointer flex items-center gap-1">
//                           <Flame className="w-4 h-4 text-orange-600" />
//                           Mark as Urgent Hiring
//                         </FormLabel>
//                         <p className="text-xs text-orange-700 font-medium">
//                           Adds a glowing banner to the job card.
//                         </p>
//                       </div>
//                     </FormItem>
//                   )}
//                 />

//                 <Button
//                   type="submit"
//                   size="lg"
//                   className={`w-full sm:w-64 text-md shadow-lg ${editingId ? "bg-amber-600 hover:bg-amber-700 shadow-amber-200" : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"}`}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <Loader2 className="animate-spin mr-2" />
//                   ) : editingId ? (
//                     "Update Job Post"
//                   ) : (
//                     "Publish Job Live"
//                   )}
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>

//         {/* --- MANAGE ACTIVE JOBS LIST --- */}
//         <div className="mt-16 mb-24">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//               Active Listings
//               {!isLoadingList && (
//                 <span className="bg-blue-100 text-blue-700 text-xs py-0.5 px-2.5 rounded-full">
//                   {activeJobs.length}
//                 </span>
//               )}
//             </h2>
//           </div>

//           <div className="space-y-3">
//             {isLoadingList ? (
//               <div className="flex justify-center py-12 bg-white border border-gray-200 rounded-2xl">
//                 <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
//               </div>
//             ) : activeJobs.length === 0 ? (
//               <div className="py-16 text-center bg-white border border-dashed border-gray-300 rounded-2xl">
//                 <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <Briefcase className="w-8 h-8 text-gray-300" />
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-900 mb-1">
//                   No active postings
//                 </h3>
//                 <p className="text-gray-500 text-sm">
//                   Create a new job listing above to see it here.
//                 </p>
//               </div>
//             ) : (
//               activeJobs.map((job) => (
//                 <div
//                   key={job.id}
//                   className={`bg-white border p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between group transition-all hover:shadow-md ${editingId === job.id ? "border-amber-400 bg-amber-50/10" : "border-gray-200 hover:border-blue-300"}`}
//                 >
//                   <div className="mb-4 sm:mb-0">
//                     <div className="flex items-center gap-3 mb-1">
//                       <h3 className="font-bold text-lg text-gray-900">
//                         {job.title}
//                       </h3>
//                       {job.urgent && (
//                         <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 uppercase tracking-wider">
//                           <Flame size={10} /> Urgent
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex items-center gap-3 text-sm text-gray-500">
//                       <span className="flex items-center gap-1">
//                         <MapPin size={14} /> {job.location}
//                       </span>
//                       <span className="text-gray-300">•</span>
//                       <span className="font-medium text-gray-700">
//                         {job.type}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 w-full sm:w-auto border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
//                     <Link
//                       href="/jobs"
//                       target="_blank"
//                       className="flex-1 sm:flex-none"
//                     >
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="w-full text-gray-600 hover:text-blue-600 bg-white"
//                       >
//                         <ExternalLink className="w-4 h-4 sm:mr-0 md:mr-2" />{" "}
//                         <span className="hidden md:inline">View</span>
//                       </Button>
//                     </Link>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => handleEdit(job)}
//                       className="flex-1 sm:flex-none text-gray-600 hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50 bg-white"
//                     >
//                       <Pencil className="w-4 h-4 sm:mr-0 md:mr-2" />{" "}
//                       <span className="hidden md:inline">Edit</span>
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => handleDelete(job.id)}
//                       className="flex-1 sm:flex-none text-gray-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 bg-white"
//                     >
//                       <Trash2 className="w-4 h-4 sm:mr-0 md:mr-2" />{" "}
//                       <span className="hidden md:inline">Delete</span>
//                     </Button>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* PREVIEW MODAL */}
//         <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
//           <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
//             <DialogHeader>
//               <div className="flex flex-col gap-2">
//                 {watchedValues.urgent && (
//                   <div className="w-full bg-orange-100 text-orange-800 text-xs font-bold px-3 py-2 rounded-md flex items-center gap-2 mb-2">
//                     <Flame size={14} className="fill-orange-800" /> URGENTLY
//                     HIRING
//                   </div>
//                 )}
//                 <span className="w-fit bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 rounded-md">
//                   {watchedValues.type || "Employment Type"}
//                 </span>
//                 <DialogTitle className="text-2xl font-bold">
//                   {watchedValues.title || "Job Title Preview"}
//                 </DialogTitle>
//                 <div className="flex items-center gap-4 text-sm text-gray-500">
//                   <span className="flex items-center gap-1.5">
//                     <MapPin className="h-4 w-4" /> {watchedValues.location}
//                   </span>
//                   {watchedValues.salary && (
//                     <span className="flex items-center gap-1.5">
//                       <Banknote className="h-4 w-4 text-green-600" />{" "}
//                       {watchedValues.salary}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </DialogHeader>

//             <div className="space-y-6 pt-4">
//               <section>
//                 <h3 className="font-bold text-sm uppercase text-gray-400 mb-2 flex items-center gap-2">
//                   <Briefcase className="w-4 h-4" /> Description
//                 </h3>
//                 <p className="text-sm whitespace-pre-wrap text-gray-600">
//                   {watchedValues.description}
//                 </p>
//               </section>

//               <section>
//                 <h3 className="font-bold text-sm uppercase text-gray-400 mb-2 flex items-center gap-2">
//                   <ListChecks className="w-4 h-4" /> Key Responsibilities
//                 </h3>
//                 <ul className="space-y-1">
//                   {watchedValues.responsibilities?.map(
//                     (r, i) =>
//                       r.value && (
//                         <li
//                           key={i}
//                           className="text-sm text-gray-600 flex gap-2"
//                         >
//                           <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />{" "}
//                           {r.value}
//                         </li>
//                       ),
//                   )}
//                 </ul>
//               </section>

//               <section>
//                 <h3 className="font-bold text-sm uppercase text-gray-400 mb-2 flex items-center gap-2">
//                   <CheckCircle2 className="w-4 h-4" /> Qualifications
//                 </h3>
//                 <ul className="space-y-1">
//                   {watchedValues.qualifications?.map(
//                     (q, i) =>
//                       q.value && (
//                         <li
//                           key={i}
//                           className="text-sm text-gray-600 flex gap-2"
//                         >
//                           <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />{" "}
//                           {q.value}
//                         </li>
//                       ),
//                   )}
//                 </ul>
//               </section>

//               {watchedValues.skills &&
//                 watchedValues.skills.some((s) => s.value) && (
//                   <section>
//                     <h3 className="text-sm font-bold uppercase mb-2 flex items-center gap-2 text-gray-400">
//                       <Wrench size={16} /> Required Skills
//                     </h3>
//                     <div className="flex flex-wrap gap-2">
//                       {watchedValues.skills.map(
//                         (s, i) =>
//                           s.value && (
//                             <span
//                               key={i}
//                               className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600"
//                             >
//                               {s.value}
//                             </span>
//                           ),
//                       )}
//                     </div>
//                   </section>
//                 )}

//               {watchedValues.experience &&
//                 watchedValues.experience.some((e) => e.value) && (
//                   <section>
//                     <h3 className="text-sm font-bold uppercase mb-2 flex items-center gap-2 text-gray-400">
//                       <History size={16} /> Experience
//                     </h3>
//                     <ul className="space-y-1">
//                       {watchedValues.experience.map(
//                         (e, i) =>
//                           e.value && (
//                             <li key={i} className="text-sm text-gray-600">
//                               • {e.value}
//                             </li>
//                           ),
//                       )}
//                     </ul>
//                   </section>
//                 )}
//             </div>
//             <div className="p-6 mt-4 border-t bg-gray-50 flex flex-col gap-3">
//               <Button
//                 className={`w-full pointer-events-none opacity-50 ${watchedValues.urgent ? "bg-orange-600" : "bg-blue-600"}`}
//               >
//                 Apply Now via Gmail (Preview Mode)
//               </Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </main>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  createJob,
  deleteJob,
  getJobs,
  updateJob,
} from "@/lib/actions/jobActions";
import { logout } from "@/lib/actions/authActions";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Loader2,
  ExternalLink,
  Pencil,
  X,
  Eye,
  MapPin,
  Briefcase,
  ListChecks,
  CheckCircle2,
  Flame,
  Wrench,
  History,
  Banknote,
  LogOut,
  LayoutDashboard,
  Megaphone,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// 1. Validation Schema
const formSchema = z.object({
  title: z.string().min(2, "Job title is required"),
  location: z.string().min(2, "Location is required"),
  type: z.string().min(1, "Employment type is required"),
  salary: z.string().optional(),
  description: z.string().min(10, "Please provide a detailed description"),
  urgent: z.boolean().optional(),
  responsibilities: z.array(z.object({ value: z.string().min(1) })).min(1),
  qualifications: z.array(z.object({ value: z.string().min(1) })).min(1),
  skills: z.array(z.object({ value: z.string() })).optional(),
  experience: z.array(z.object({ value: z.string() })).optional(),
});

export default function AdminDashboard() {
  const router = useRouter();

  // State Management
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [activeJobs, setActiveJobs] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Form Setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "City of San Fernando, Pampanga",
      type: "",
      salary: "",
      description: "",
      urgent: false,
      responsibilities: [{ value: "" }],
      qualifications: [{ value: "" }],
      skills: [],
      experience: [],
    },
  });

  const watchedValues = form.watch();

  const {
    fields: respFields,
    append: appendResp,
    remove: removeResp,
  } = useFieldArray({ control: form.control, name: "responsibilities" });
  const {
    fields: qualFields,
    append: appendQual,
    remove: removeQual,
  } = useFieldArray({ control: form.control, name: "qualifications" });
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ control: form.control, name: "skills" });
  const {
    fields: expFields,
    append: appendExp,
    remove: removeExp,
  } = useFieldArray({ control: form.control, name: "experience" });

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    setIsLoadingList(true);
    try {
      const data = await getJobs();
      setActiveJobs(data);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load jobs.");
    } finally {
      setIsLoadingList(false);
    }
  }

  const handleSignOut = async () => {
    await logout();
    toast.success("Signed out successfully");
    router.push("/admin/login");
  };

  const handleEdit = (job: any) => {
    setEditingId(job.id);
    form.reset({
      ...job,
      responsibilities: job.responsibilities.map((r: string) => ({ value: r })),
      qualifications: job.qualifications.map((q: string) => ({ value: q })),
      skills: job.skills?.map((s: string) => ({ value: s })) || [],
      experience: job.experience?.map((e: string) => ({ value: e })) || [],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.info(`Editing: ${job.title}`);
  };

  const cancelEdit = () => {
    setEditingId(null);
    form.reset({
      title: "",
      location: "City of San Fernando, Pampanga",
      type: "",
      salary: "",
      description: "",
      urgent: false,
      responsibilities: [{ value: "" }],
      qualifications: [{ value: "" }],
      skills: [],
      experience: [],
    });
  };

  async function handleDelete(id: number) {
    if (
      confirm("Permanently delete this job listing? This cannot be undone.")
    ) {
      const result = await deleteJob(id);
      if (result.success) {
        toast.success("Job removed.");
        await loadJobs();
      }
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const formattedData = {
        ...values,
        responsibilities: values.responsibilities.map((r) => r.value),
        qualifications: values.qualifications.map((q) => q.value),
        skills: values.skills?.map((s) => s.value).filter(Boolean) || [],
        experience:
          values.experience?.map((e) => e.value).filter(Boolean) || [],
      };

      const result = editingId
        ? await updateJob(editingId, formattedData)
        : await createJob(formattedData);

      if (result.success) {
        toast.success(editingId ? "Update Successful!" : "Job Posted Live!");
        cancelEdit();
        await loadJobs();
      } else {
        toast.error("Failed to save job.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* --- TOP NAVIGATION BAR --- */}
      <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
                <Image
                  src="/jcl-logo.png"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="brightness-0 invert"
                />
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-900 leading-tight">
                  JC&L Proserve
                </h1>
                <p className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                  HR Portal
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/jobs" target="_blank">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 sm:mr-2" />{" "}
                  <span className="hidden sm:inline">Live Board</span>
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4 sm:mr-2" />{" "}
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
              {editingId ? (
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Pencil className="text-amber-600 w-6 h-6" />
                </div>
              ) : (
                <div className="p-2 bg-blue-100 rounded-lg">
                  <LayoutDashboard className="text-blue-600 w-6 h-6" />
                </div>
              )}
              {editingId ? "Edit Job Listing" : "Create Job Listing"}
            </h2>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              {editingId
                ? "Update the details below. Changes will reflect instantly on the public board."
                : "Draft a new vacant position to publish directly to the careers page."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsPreviewOpen(true)}
              className="bg-white shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all"
            >
              <Eye className="w-4 h-4 mr-2" /> Preview
            </Button>
            {editingId && (
              <Button
                variant="ghost"
                onClick={cancelEdit}
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <X className="w-4 h-4 mr-2" /> Cancel Edit
              </Button>
            )}
          </div>
        </div>

        {/* --- FORM CARD --- */}
        <div
          className={`bg-white rounded-2xl shadow-sm border transition-all duration-500 relative flex flex-col ${editingId ? "border-amber-300 shadow-[0_0_40px_rgba(251,191,36,0.15)]" : "border-gray-200"}`}
        >
          {/* Top Accent Line */}
          <div
            className={`h-1.5 w-full rounded-t-2xl ${editingId ? "bg-amber-500" : "bg-blue-600"}`}
          />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col h-full"
            >
              <div className="p-6 sm:p-8 space-y-10">
                {/* 1. Basic Details Grid */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6 flex items-center gap-2">
                    <Megaphone className="w-4 h-4" /> The Basics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="lg:col-span-2">
                          <FormLabel className="text-gray-700 font-semibold">
                            Job Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-gray-50 focus:bg-white h-11 transition-colors"
                              placeholder="e.g. Area Manager"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">
                            Employment Type
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-gray-50 focus:bg-white h-11 transition-colors">
                                <SelectValue placeholder="Select Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Full-Time">
                                Full-Time
                              </SelectItem>
                              <SelectItem value="Part-Time">
                                Part-Time
                              </SelectItem>
                              <SelectItem value="Contractual">
                                Contractual
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem className="lg:col-span-2">
                          <FormLabel className="text-gray-700 font-semibold">
                            Location
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-gray-50 focus:bg-white h-11 transition-colors"
                              placeholder="e.g. San Fernando, Pampanga"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="salary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-semibold">
                            Salary{" "}
                            <span className="text-gray-400 font-normal">
                              (Optional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="bg-gray-50 focus:bg-white h-11 transition-colors"
                              placeholder="e.g. Php 15,000"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* 2. Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold text-base">
                        Job Overview
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="h-32 bg-gray-50 focus:bg-white resize-none text-base p-4 transition-colors leading-relaxed"
                          placeholder="Write a compelling overview of the role..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 3. UX Upgrade: 2-Column Grid for Dynamic Lists */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-50/50 p-6 sm:p-8 rounded-2xl border border-gray-100">
                  {/* Responsibilities Column */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <FormLabel className="text-base font-bold text-gray-900 flex items-center gap-2">
                        <ListChecks className="w-5 h-5 text-blue-600" />{" "}
                        Responsibilities
                      </FormLabel>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => appendResp({ value: "" })}
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {respFields.map((field, index) => (
                        <FormField
                          key={field.id}
                          control={form.control}
                          name={`responsibilities.${index}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <Input
                                    className="bg-white"
                                    placeholder="What will they do?"
                                    {...field}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeResp(index)}
                                    disabled={respFields.length === 1}
                                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 shrink-0"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Qualifications Column */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <FormLabel className="text-base font-bold text-gray-900 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />{" "}
                        Qualifications
                      </FormLabel>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => appendQual({ value: "" })}
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {qualFields.map((field, index) => (
                        <FormField
                          key={field.id}
                          control={form.control}
                          name={`qualifications.${index}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <Input
                                    className="bg-white"
                                    placeholder="Minimum requirements..."
                                    {...field}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeQual(index)}
                                    disabled={qualFields.length === 1}
                                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 shrink-0"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Skills Column */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <FormLabel className="text-base font-bold text-gray-900 flex items-center gap-2">
                        <Wrench className="w-5 h-5 text-purple-600" /> Required
                        Skills{" "}
                        <span className="text-gray-400 text-sm font-normal">
                          (Opt)
                        </span>
                      </FormLabel>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => appendSkill({ value: "" })}
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {skillFields.map((field, index) => (
                        <FormField
                          key={field.id}
                          control={form.control}
                          name={`skills.${index}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <Input
                                    className="bg-white"
                                    placeholder="e.g. Microsoft Office"
                                    {...field}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeSkill(index)}
                                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 shrink-0"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Experience Column */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <FormLabel className="text-base font-bold text-gray-900 flex items-center gap-2">
                        <History className="w-5 h-5 text-indigo-600" />{" "}
                        Experience{" "}
                        <span className="text-gray-400 text-sm font-normal">
                          (Opt)
                        </span>
                      </FormLabel>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => appendExp({ value: "" })}
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {expFields.map((field, index) => (
                        <FormField
                          key={field.id}
                          control={form.control}
                          name={`experience.${index}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <Input
                                    className="bg-white"
                                    placeholder="e.g. 2 years in manpower"
                                    {...field}
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeExp(index)}
                                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 shrink-0"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* UX Upgrade: STICKY FOOTER ACTION BAR */}
              <div className="sticky bottom-0 z-20 bg-white border-t border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <FormField
                  control={form.control}
                  name="urgent"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 rounded-xl border border-orange-200 bg-orange-50 p-3 sm:pr-6 cursor-pointer hover:bg-orange-100 transition-colors w-full sm:w-auto">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-orange-600 border-orange-400"
                        />
                      </FormControl>
                      <div className="space-y-0.5 leading-none">
                        <FormLabel className="text-orange-900 font-bold cursor-pointer flex items-center gap-1">
                          <Flame className="w-4 h-4 text-orange-600" /> Mark as
                          Urgent
                        </FormLabel>
                        <p className="text-xs text-orange-700/80 font-medium hidden sm:block">
                          Adds a glowing banner to the live job card.
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className={`w-full sm:w-64 h-14 text-base font-bold text-white transition-all duration-300 ${
                    editingId
                      ? "bg-amber-600 hover:bg-amber-500 hover:shadow-lg hover:shadow-amber-500/30"
                      : "bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30"
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : null}
                  {isSubmitting
                    ? "Saving..."
                    : editingId
                      ? "Save Changes"
                      : "Publish to Live Board"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* --- MANAGE ACTIVE JOBS LIST --- */}
        <div className="mt-16 mb-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 tracking-tight">
              Active Listings
              {!isLoadingList && (
                <span className="bg-blue-100 text-blue-700 text-sm py-0.5 px-3 rounded-full font-bold">
                  {activeJobs.length}
                </span>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {isLoadingList ? (
              <div className="flex justify-center py-20 bg-white border border-gray-100 rounded-3xl shadow-sm">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : activeJobs.length === 0 ? (
              <div className="py-20 text-center bg-white border border-dashed border-gray-300 rounded-3xl shadow-sm">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-blue-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  No active postings
                </h3>
                <p className="text-gray-500 text-sm">
                  Create a new job listing above to see it here.
                </p>
              </div>
            ) : (
              activeJobs.map((job) => (
                <div
                  key={job.id}
                  className={`bg-white border rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between group transition-all duration-300
                    ${
                      editingId === job.id
                        ? "border-amber-400 bg-amber-50/20 shadow-md ring-4 ring-amber-50"
                        : "border-gray-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5"
                    }`}
                >
                  <div className="mb-4 md:mb-0 w-full md:w-auto">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      {job.urgent && (
                        <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider">
                          <Flame size={12} /> Urgent
                        </span>
                      )}
                      <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {job.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={16} className="text-gray-400" />{" "}
                        {job.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                    <Link
                      href={`/jobs/${job.id}`}
                      target="_blank"
                      className="flex-1 md:flex-none"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-gray-600 hover:text-blue-600 bg-white border-gray-200"
                      >
                        <ExternalLink className="w-4 h-4 md:mr-2" />{" "}
                        <span className="hidden md:inline">View Public</span>
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(job)}
                      className="flex-1 md:flex-none text-gray-600 hover:text-amber-600 hover:border-amber-300 hover:bg-amber-50 bg-white border-gray-200 transition-colors"
                    >
                      <Pencil className="w-4 h-4 md:mr-2" />{" "}
                      <span className="hidden md:inline">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(job.id)}
                      className="flex-1 md:flex-none text-gray-600 hover:text-red-600 hover:border-red-300 hover:bg-red-50 bg-white border-gray-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 md:mr-2" />{" "}
                      <span className="hidden md:inline">Delete</span>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* PREVIEW MODAL */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex flex-col gap-2">
                {watchedValues.urgent && (
                  <div className="w-full bg-orange-100 text-orange-800 text-xs font-bold px-3 py-2 rounded-md flex items-center gap-2 mb-2">
                    <Flame size={14} className="fill-orange-800" /> URGENTLY
                    HIRING
                  </div>
                )}
                <span className="w-fit bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 rounded-md">
                  {watchedValues.type || "Employment Type"}
                </span>

                {/* THIS IS THE REQUIRED DIALOG TITLE */}
                <DialogTitle className="text-2xl font-bold">
                  {watchedValues.title || "Job Title Preview"}
                </DialogTitle>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> {watchedValues.location}
                  </span>
                  {watchedValues.salary && (
                    <span className="flex items-center gap-1.5">
                      <Banknote className="h-4 w-4 text-green-600" />{" "}
                      {watchedValues.salary}
                    </span>
                  )}
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 pt-4">
              <section>
                <h3 className="font-bold text-sm uppercase text-gray-400 mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Description
                </h3>
                <p className="text-sm whitespace-pre-wrap text-gray-600">
                  {watchedValues.description ||
                    "Job description will appear here..."}
                </p>
              </section>

              {watchedValues.responsibilities &&
                watchedValues.responsibilities.some((r) => r.value) && (
                  <section>
                    <h3 className="font-bold text-sm uppercase text-gray-400 mb-2 flex items-center gap-2">
                      <ListChecks className="w-4 h-4" /> Key Responsibilities
                    </h3>
                    <ul className="space-y-1">
                      {watchedValues.responsibilities.map(
                        (r, i) =>
                          r.value && (
                            <li
                              key={i}
                              className="text-sm text-gray-600 flex gap-2"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />{" "}
                              {r.value}
                            </li>
                          ),
                      )}
                    </ul>
                  </section>
                )}

              {watchedValues.qualifications &&
                watchedValues.qualifications.some((q) => q.value) && (
                  <section>
                    <h3 className="font-bold text-sm uppercase text-gray-400 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Qualifications
                    </h3>
                    <ul className="space-y-1">
                      {watchedValues.qualifications.map(
                        (q, i) =>
                          q.value && (
                            <li
                              key={i}
                              className="text-sm text-gray-600 flex gap-2"
                            >
                              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />{" "}
                              {q.value}
                            </li>
                          ),
                      )}
                    </ul>
                  </section>
                )}

              {watchedValues.skills &&
                watchedValues.skills.some((s) => s.value) && (
                  <section>
                    <h3 className="text-sm font-bold uppercase mb-2 flex items-center gap-2 text-gray-400">
                      <Wrench size={16} /> Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {watchedValues.skills.map(
                        (s, i) =>
                          s.value && (
                            <span
                              key={i}
                              className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600"
                            >
                              {s.value}
                            </span>
                          ),
                      )}
                    </div>
                  </section>
                )}

              {watchedValues.experience &&
                watchedValues.experience.some((e) => e.value) && (
                  <section>
                    <h3 className="text-sm font-bold uppercase mb-2 flex items-center gap-2 text-gray-400">
                      <History size={16} /> Experience
                    </h3>
                    <ul className="space-y-1">
                      {watchedValues.experience.map(
                        (e, i) =>
                          e.value && (
                            <li key={i} className="text-sm text-gray-600">
                              • {e.value}
                            </li>
                          ),
                      )}
                    </ul>
                  </section>
                )}
            </div>

            <div className="p-6 mt-4 border-t bg-gray-50 flex flex-col gap-3">
              <Button
                className={`w-full pointer-events-none opacity-50 ${watchedValues.urgent ? "bg-orange-600" : "bg-blue-600"}`}
              >
                Apply Now via Gmail (Preview Mode)
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}

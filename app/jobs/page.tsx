import { getJobs } from "@/lib/actions/jobActions";
import JobBoardClient from "./JobBoardClient";

export default async function JobsPage() {
  // Fetch the live data directly from Neon via Drizzle
  const jobs = await getJobs();

  // Pass the data to your beautiful client-side UI
  return <JobBoardClient initialJobs={jobs} />;
}

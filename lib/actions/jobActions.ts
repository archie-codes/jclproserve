"use server";

import { db } from "../db";
import { jobs } from "../db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";

// 1. Define input types
export type CreateJobInput = {
  title: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  experience?: string[];
  skills?: string[];
  urgent?: boolean;
};

// 2. Fetch jobs (Renamed to getJobs to match your Dashboard import)
export async function getJobs() {
  // 2. ADD THIS MAGIC HAMMER:
  // This tells Next.js: "NEVER cache this query. Always ask Neon Postgres directly."
  noStore();

  try {
    const data = await db
      .select()
      .from(jobs)
      // Remove this .where line if you don't have an isActive column!
      // .where(eq(jobs.isActive, true))
      .orderBy(desc(jobs.createdAt));

    return data;
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return [];
  }
}
// 3. Create a new job
export async function createJob(data: CreateJobInput) {
  try {
    await db.insert(jobs).values({
      title: data.title,
      location: data.location,
      type: data.type,
      salary: data.salary || null,
      description: data.description,
      responsibilities: data.responsibilities,
      qualifications: data.qualifications,
      experience: data.experience || [],
      skills: data.skills || [],
      urgent: data.urgent || false,
    });

    // Refresh both the public page and the admin dashboard
    revalidatePath("/jobs");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Failed to create job:", error);
    return { success: false, error: "Failed to create job posting" };
  }
}

// 4. Delete a job
export async function deleteJob(id: number) {
  try {
    await db.delete(jobs).where(eq(jobs.id, id));

    // Refresh both pages
    revalidatePath("/jobs");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false };
  }
}

// 5. Update a job
export async function updateJob(id: number, data: CreateJobInput) {
  try {
    await db
      .update(jobs)
      .set({
        ...data,
        salary: data.salary || null,
        urgent: data.urgent || false,
      })
      .where(eq(jobs.id, id));

    revalidatePath("/jobs");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Update Error:", error);
    return { success: false };
  }
}

// 6. Get job by ID
export async function getJobById(id: number) {
  try {
    const allJobs = await getJobs();
    const job = allJobs.find((j: any) => j.id === Number(id));
    return job || null;
  } catch (error) {
    console.error("Failed to fetch job by ID:", error);
    return null;
  }
}

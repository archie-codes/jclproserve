"use server";

import { cookies } from "next/headers";

export async function loginAuth(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const ADMIN_USER = process.env.ADMIN_USER;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
    // 1. Await the cookies object first (Next.js 15 requirement)
    const cookieStore = await cookies();

    // 2. Then set the cookie
    cookieStore.set("jcl_admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    return { success: true };
  } else {
    return { error: "Invalid username or password" };
  }
}

export async function logout() {
  // Await the cookies object first before deleting
  const cookieStore = await cookies();
  cookieStore.delete("jcl_admin_session");
}

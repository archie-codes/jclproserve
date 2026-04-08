"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAuth } from "@/lib/actions/authActions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Lock,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setErrorMessage(null); // Clear any previous errors

    try {
      const result = await loginAuth(formData);

      if (result?.error) {
        // Display the error directly inside the form instead of a toast
        setErrorMessage(result.error);
        setIsLoading(false);
      } else {
        // Keep the toast for success, it feels rewarding!
        // toast.success("Authentication successful");
        router.push("/admin");
        router.refresh();
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-[20%] right-[-5%] w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative z-10">
        {/* Header / Logo */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16  rounded-2xl flex items-center justify-center  mb-5">
            <Image
              src="/jcl-logo.png"
              alt="JC&L Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight">
            Admin Portal
          </h1>
          <p className="text-gray-500 text-sm mt-2 flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            Secure HR Management
          </p>
        </div>

        {/* Login Form */}
        <form action={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Username
            </label>
            <Input
              name="username"
              type="text"
              required
              disabled={isLoading}
              placeholder="Enter your admin username"
              className="w-full bg-gray-50 focus:bg-white h-11 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                disabled={isLoading}
                placeholder="••••••••••••"
                className="w-full bg-gray-50 focus:bg-white h-11 pr-10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Form-Level Error Message Box */}
          {errorMessage && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2 border border-red-100 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>{errorMessage}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white h-12 text-base font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-80 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
            ) : (
              <Lock className="mr-2 h-5 w-5" />
            )}
            {isLoading ? "Authenticating..." : "Secure Sign In"}
          </Button>
        </form>

        {/* Footer text */}
        <p className="mt-8 text-center text-xs text-gray-400">
          JC&L Proserve Inc. © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

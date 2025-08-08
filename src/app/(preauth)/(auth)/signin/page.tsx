import SignInForm from "@/components/auth/sign-in-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignInForm />
      </div>
    </div>
  );
}

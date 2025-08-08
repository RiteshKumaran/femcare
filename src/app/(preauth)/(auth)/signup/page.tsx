import SignUpForm from "@/components/auth/sign-up-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new account",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignUpForm />
      </div>
    </div>
  );
}

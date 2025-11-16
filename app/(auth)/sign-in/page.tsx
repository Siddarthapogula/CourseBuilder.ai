"use client";
import LoadingDisplay from "@/components/LoadingDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Layers } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import z from "zod";

const userCredentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export default function () {
  const session = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState("Idle");
  const router = useRouter();
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setStatus("Submitting");
    setError({ email: "", password: "" });
    setFormError("");
    const validationResult = userCredentialsSchema.safeParse({
      email,
      password,
    });
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setError({
        email: fieldErrors.email?.[0] || "",
        password: fieldErrors.password?.[0] || "",
      });
      setStatus("Idle");
      return;
    }
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        setFormError(result.error);
        toast.error("Login unsuccessfull.");
      } else {
        router.push("/");
        toast.success("Login successfull.");
      }
    } catch (e: any) {
      setFormError(e.message);
    } finally {
      setStatus("Idle");
    }
  };
  const handleGoogleSignIn = async (e: any) => {
    e.preventDefault();
    setStatus("Submitting");
    setFormError("");
    try {
      await signIn("google", { callbackUrl: "/" });
      toast.success("Login successfull.");
    } catch (e) {
      setFormError("Failed to initiate Google sign-in");
      toast.error("Login unsuccessfull.");
    }
  };
  useEffect(() => {
    if (session && session.status == "authenticated") {
      router.push("/");
    }
  }, [session?.status]);
  if (session && session.status == "loading") {
    return <LoadingDisplay message="Loading" />;
  }
  return (
    <div className="min-h-screen py-16 px-4 flex items-center">
      <main className="w-full max-w-md mx-auto">
        <div className="bg-muted p-6 rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex justify-center items-center gap-2 pb-4">
            <span className="text-2xl font-semibold">Sign In</span>
            <Layers />
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="hello@example.com"
              />
              <p className="text-red-600 text-sm">{error.email}</p>
            </div>

            <div className="space-y-1">
              <Label>Password</Label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
              />
              <p className="text-red-600 text-sm">{error.password}</p>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={handleLogin}
                disabled={status === "Submitting"}
              >
                {status === "Submitting" && <Spinner />}
                {status === "Idle" ? "Sign In" : "Submitting"}
              </Button>

              <Button
                className="w-full"
                onClick={handleGoogleSignIn}
                variant="destructive"
                disabled={status === "Submitting"}
              >
                Continue with Google
              </Button>
            </div>

            <p className="text-red-600 text-sm">{formError}</p>

            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <Link className="underline" href="/sign-up">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

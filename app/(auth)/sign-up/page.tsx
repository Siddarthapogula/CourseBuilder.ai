"use client";
import { registerUser } from "@/actions/user";
import LoadingDisplay from "@/components/LoadingDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Layers } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import z from "zod";

const userRegistrationSchema = z.object({
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
  const handleRegister = async (e: any) => {
    e.preventDefault();
    setStatus("Submitting");
    setError({ email: "", password: "" });
    setFormError("");
    const validationResult = userRegistrationSchema.safeParse({
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
      await registerUser({ email, password });
      toast.success("Account Registered Successfully.");
      router.push("/api/auth/signin");
    } catch (e: any) {
      console.log(e);
      toast.error("Registration unsuccessfull");
      setFormError(e.message);
    } finally {
      setStatus("Idle");
    }
  };

  useEffect(() => {
    if (session && session.status == "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);
  if (session && session.status == "loading") {
    return <LoadingDisplay message="Loading" />;
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-muted p-6 rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex justify-center items-center gap-2 pb-4">
          <span className="text-2xl font-semibold">Sign Up</span>
          <Layers />
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleRegister}>
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

          <Button disabled={status === "Submitting"} className="w-full">
            {status === "Submitting" && <Spinner />}
            {status === "Idle" ? "Register" : "Submitting"}
          </Button>

          <p className="text-red-600 text-sm">{formError}</p>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link className="underline" href="/api/auth/signin">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

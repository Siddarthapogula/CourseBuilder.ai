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
      } else {
        router.push("/");
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
    } catch (e) {
      setFormError("Failed to initiate Google sign-in");
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
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-4 py-8 bg-muted rounded-md">
        <div className=" flex justify-center space-y-2 pb-4 gap-2">
          <span className=" text-xl font-medium text-center">Sign In</span>
          <Layers />
        </div>
        <form className=" space-y-2 min-w-md p-2" onSubmit={handleLogin}>
          <div className=" space-y-2">
            <Label className=" text-md">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="hello@example.com"
            />
            <p className=" text-red-600">{error.email}</p>
          </div>
          <div className=" space-y-2">
            <Label className=" text-md">Password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
            <p className=" text-red-600">{error.password}</p>
          </div>
          <div className=" flex gap-3">
            <Button onClick={handleLogin} disabled={status == "Submitting"}>
              {status == "Submitting" && <Spinner />}
              {status == "Idle" ? "Sign In" : "Submitting"}
            </Button>
            <Button
              onClick={handleGoogleSignIn}
              variant={"destructive"}
              disabled={status == "Submitting"}
            >
              Continue with Google
            </Button>
          </div>
          <p className=" text-red-600">{formError}</p>
          <div className=" space-y-2">
            <p>
              don't have account?{" "}
              <Link className=" underline" href={"/sign-up"}>
                Sign Up
              </Link>{" "}
              with Credentials
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

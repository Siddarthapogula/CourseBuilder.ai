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
      router.push("/api/auth/signin");
    } catch (e: any) {
      console.log(e);
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
    <div className="min-h-screen flex justify-center items-center">
      <div className=" p-4 py-8 bg-muted rounded-md ">
        <div className=" flex flex-col">
          <div className=" flex justify-center space-y-2 pb-4 gap-2">
            <span className=" text-xl font-medium text-center">Sign Up</span>
            <Layers />
          </div>
        </div>
        <form className=" space-y-2 min-w-md p-2" onSubmit={handleRegister}>
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
          <div className="space-y-2">
            <Label className=" text-md">Password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            />
            <p className=" text-red-600">{error.password}</p>
          </div>
          <Button disabled={status == "Submitting"}>
            {status == "Submitting" && <Spinner />}
            {status == "Idle" ? "Register" : "Submitting"}
          </Button>
          <p className=" text-red-600">{formError}</p>
          <div className=" spacey-2">
            <p>
              have account already?{" "}
              <Link className=" underline" href={"/api/auth/signin"}>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./ModeToggle";

export default function UserButtons() {
  const { data } = useSession();
  return (
    <div className=" hidden md:flex gap-2">
      {data?.user ? (
        <div className=" flex md:gap-2 lg:gap-3 items-center">
          <Link href={`/profile`}>
            {data.user.image ? (
              <Image
                width={35}
                height={35}
                className=" rounded-full"
                alt=""
                src={data.user.image}
              />
            ) : (
              <User className=" w-6 h-6" />
            )}
          </Link>
          <Button onClick={() => signOut({ callbackUrl: "/" })}>Logout</Button>
        </div>
      ) : (
        <div className=" flex gap-3">
          <Link className=" hidden md:block" href="/sign-up">
            <Button variant={"outline"}>Sign Up</Button>
          </Link>
          <Link href={"/sign-in"}>
            <Button>Sign In</Button>
          </Link>
        </div>
      )}
      <ModeToggle />{" "}
    </div>
  );
}

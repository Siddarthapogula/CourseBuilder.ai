"use client";
import { Layers, Menu, User } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function SideSheetForMobileView() {
  const { status, data } = useSession();
  return (
    <Sheet>
      <SheetTrigger>
        {/* <Button variant="outline" size="icon"> */}
        <Menu className="h-5 w-5" />
        {/* <span className="sr-only">Toggle navigation menu</span> */}
        {/* </Button> */}
      </SheetTrigger>
      <SheetContent className="w-[300px] md:w-[540px]">
        <SheetTitle className=" pt-3" asChild>
          <Link href="/" className="flex justify-center items-center gap-2">
            <span className="text-xl font-semi-bold">
              <Layers />
            </span>
          </Link>
        </SheetTitle>
        <div className="grid gap-6 p-6">
          <div className="grid gap-3">
            <Link
              href="/course/all"
              className={buttonVariants({ variant: "ghost" })}
            >
              All Courses
            </Link>
            {status == "authenticated" && (
              <Link
                href="/course/me"
                className={buttonVariants({ variant: "ghost" })}
              >
                My Courses
              </Link>
            )}
            <Link href="/#how" className={buttonVariants({ variant: "ghost" })}>
              How It Works?
            </Link>
          </div>
          <div className="grid gap-3">
            {status == "unauthenticated" ? (
              <div className="grid gap-3">
                <Link href="/sign-in">
                  <Button className="w-full">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant="outline" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-3">
                <Link
                  href={`/profile`}
                  className=" flex gap-2 justify-center items-center"
                >
                  {data?.user?.image ? (
                    <Image
                      width={35}
                      height={35}
                      className=" rounded-full"
                      alt=""
                      src={data?.user?.image}
                    />
                  ) : (
                    <User className=" w-6 h-6" />
                  )}
                  <span className=" text-sm">{data?.user?.name}</span>
                </Link>
                <Button onClick={() => signOut({ callbackUrl: "/" })}>
                  Logout
                </Button>
              </div>
            )}
            <div className=" flex justify-center items-center">
              <ModeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

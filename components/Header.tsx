import Link from "next/link";
import { Layers } from "lucide-react";
import HeaderClient from "./HeaderClient ";
import UserButtons from "./UserButtons";

export default async function Header() {
  return (
    <header
      className=" fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 
     supports-backdrop-filter:bg-background/60 "
    >
      <nav className=" flex justify-around py-4 items-center">
        <Link href="/" className="flex items-center gap-2">
          <Layers className="h-5 w-5" />
          <span className="text-lg font-medium">CourseBuilder AI</span>
        </Link>
        <HeaderClient />
        <UserButtons />
      </nav>
    </header>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  return (
    <div className="flex justify-center mt-34">
      <Card className=" p-3">
        <p>Could not find requested resource : {" " + pathname}</p>

        <Button>
          <Link href="/">Return Home</Link>
        </Button>
      </Card>
    </div>
  );
}

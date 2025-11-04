"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: { digest: string };
  reset: () => void;
}) {
  return (
    <Card className=" min-h-screen  min-w-screen flex justify-center items-center">
      <div className=" p-10 border-2 rounded-md border-muted space-y-2 flex flex-col">
        <h1 className=" text-red-500">Some thing went wrong{error.digest}</h1>
        <Button variant={"outline"} onClick={() => reset()}>
          Refresh
        </Button>
      </div>
    </Card>
  );
}

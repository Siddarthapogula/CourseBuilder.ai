"use client";
import { GitFork, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CourseData } from "@/lib/utils/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";

export default function CourseCard({ course }: { course: any }) {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`${course.courseId}`)}
      key={course?.courseId}
      className=" cursor-pointer"
    >
      <CardHeader>
        <div className="text-sm flex gap-2 font-medium text-primary py-2">
          Author :{" "}
          {course.user.image ? (
            <Image alt="" width={20} height={20} src={course.user.image} />
          ) : (
            <User className="w-4 h-4" />
          )}
          <span className=" text-muted-foreground">{course?.user?.name}</span>
        </div>
        <CardTitle>{course.courseName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          {course.modules.length > 0 ? course.modules[0].title : ""}
        </p>
      </CardContent>
      <CardFooter className=" space-x-3 mb-2">
        <Button className="" variant={"outline"}>
          <div className="flex items-center space-x-2">
            <GitFork className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Fork {course.forks}
            </span>
          </div>
        </Button>
      </CardFooter>
    </Card>
  );
}

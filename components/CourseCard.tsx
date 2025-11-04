"use client";
import { GitFork, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import { forkCourse } from "@/actions/course";
import { CourseData } from "@/lib/utils/types";
import { Badge } from "./ui/badge";

export default function CourseCard({ course }: { course: CourseData }) {
  const router = useRouter();
  const handleForkClick = async (courseId: string) => {
    const wantToFork = confirm(
      `Are you sure want to fork course : ${course.courseName}`
    );
    if (!wantToFork) return;
    try {
      await forkCourse(courseId);
    } catch (e: any) {
      console.log(e.message);
    }
  };
  return (
    <Card key={course?.courseId} className=" cursor-pointer">
      <CardHeader>
        <div
          className="text-sm flex gap-2 items-center font-medium text-primary py-2"
          onClick={() => router.push(`/user/${course.userId}`)}
        >
          Author :{" "}
          {course.user.image ? (
            <Image
              alt=""
              width={20}
              className=" rounded-full"
              height={20}
              src={course?.user?.image}
            />
          ) : (
            <User className="w-4 h-4" />
          )}
          <span className=" text-muted-foreground">{course?.user?.name}</span>
          {course.forkedFromId && (
            <Badge variant={"outline"}>
              <span>forked</span>
            </Badge>
          )}
        </div>
        <CardTitle onClick={() => router.push(`${course.courseId}`)}>
          {course.courseName}
        </CardTitle>
      </CardHeader>
      <CardContent onClick={() => router.push(`${course.courseId}`)}>
        <p className="text-muted-foreground">
          {course.modules.length > 0 ? course.modules[0].title : ""}
        </p>
      </CardContent>
      <CardFooter className=" space-x-3 mb-2">
        <Button
          onClick={() => handleForkClick(course.courseId)}
          className=""
          variant={"outline"}
        >
          <div className="flex items-center space-x-2">
            <GitFork className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Fork {course._count.forks}
            </span>
          </div>
        </Button>
      </CardFooter>
    </Card>
  );
}

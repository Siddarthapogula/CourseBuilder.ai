"use client";
import {
  deleteCourseWithId,
  forkCourse,
  getCourseWithId,
} from "@/actions/course";
import LoadingDisplay from "@/components/LoadingDisplay";
import ModuleDisplay from "@/components/ModuleDisplay";
import QuizDisplay from "@/components/QuizDisplay";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CourseData } from "@/lib/utils/types";
import { useQuery } from "@tanstack/react-query";
import { GitFork, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

async function getCourseDetailsWithId(courseId: string) {
  if (!courseId) return;
  try {
    const { data } = await getCourseWithId(courseId);
    return data;
  } catch (e) {
    alert("error" + e);
  }
}

export default function CourseWithId({ params }: any) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const courseId = usePathname().split("/")[2];
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Course", courseId],
    queryFn: () => getCourseDetailsWithId(courseId),
  });

  if (isError && !isLoading) {
    return <h1 className=" py-24">Error</h1>;
  }
  if (isLoading) {
    return (
      <div className=" py-24 mx-auto container max-2-2xl md:max-w-4xl">
        {" "}
        <LoadingDisplay message="Just a sec" />{" "}
      </div>
    );
  }
  const courseData = data;
  const handleForkClick = async (courseId: string) => {
    const wantToFork = confirm(
      `Are you sure want to fork course : ${courseData.courseName}`
    );
    if (!wantToFork) return;
    try {
      await forkCourse(courseId);
    } catch (e: any) {
      console.log(e.message);
    }
  };
  const handleDeleteCourseClick = async (courseId: string) => {
    const wantToDelete = confirm(
      `Are you sure want to Delete course : ${courseData.courseName}`
    );
    if (!wantToDelete) return;
    try {
      setIsDeleting(true);
      await deleteCourseWithId(courseId);
      router.push("/course/me");
    } catch (e: any) {
      console.log("deletion unsuccessfull" + e.message);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className=" min-h-screen pt-24 mb-12">
      <main className=" mx-auto max-w-2xl w-full px-3 md:max-w-4xl md:px-5">
        {courseData.modules && (
          <div className=" px-2 m-2 space-y-2">
            <h1 className=" text-xl md:text-2xl font-medium">
              {courseData?.courseName}:{" "}
            </h1>
            <div className=" flex justify-between items-center">
              <div className=" flex gap-2 items-center">
                <span>Author : </span>
                <Link href={`/user/${courseData.user.id}`}>
                  <div className=" flex gap-1">
                    {courseData?.user?.image ? (
                      <Image
                        alt=""
                        width={20}
                        className=" rounded-full"
                        height={20}
                        src={courseData.user.image}
                      />
                    ) : (
                      <User className=" w-5 h-5" />
                    )}
                    <span>{courseData?.user?.name}</span>
                  </div>
                </Link>
                <Button
                  onClick={() => handleForkClick(courseData.courseId)}
                  className=""
                  variant={"outline"}
                >
                  <div className="flex items-center space-x-2">
                    <GitFork className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Fork {courseData._count.forks}
                    </span>
                  </div>
                </Button>
              </div>
              {data?.user?.id == courseData.userId && (
                <Button
                  onClick={() => handleDeleteCourseClick(courseData?.courseId)}
                >
                  {isDeleting ? <Spinner className=" w-4 h-4" /> : "Delete"}
                </Button>
              )}
            </div>
            <ModuleDisplay modulesData={courseData.modules} />
          </div>
        )}
        <div className="px-4 my-2">
          {courseData?.quiz && (
            <QuizDisplay
              courseName={courseData?.courseName as string}
              quizData={courseData?.quiz}
            />
          )}
        </div>
      </main>
    </div>
  );
}

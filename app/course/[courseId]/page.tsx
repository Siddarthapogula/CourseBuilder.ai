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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GitFork, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

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
  const queryClient = useQueryClient();
  const router = useRouter();
  const userData: any = useSession();
  const courseId = usePathname().split("/")[2];
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Course", courseId],
    queryFn: () => getCourseDetailsWithId(courseId),
  });

  const { mutate: deleteMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteCourseWithId,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["Course", courseId] });
      queryClient.invalidateQueries({ queryKey: ["MyCourses"] });
      router.push("/course/me");
    },
    onError: (e: any) => {
      console.log("deletion unsuccessful", e.message);
      alert("Failed to Delete " + e.message);
    },
  });

  const { mutate: forkMutation, isPending: isForking } = useMutation({
    mutationFn: forkCourse,
    onSuccess: () => {
      queryClient.setQueryData(["Course", courseId], (oldData: any) => {
        if (!oldData) return;
        return {
          ...oldData,
          _count: {
            ...oldData._count,
            forks: oldData._count.forks + 1,
          },
        };
      });
      queryClient.invalidateQueries({ queryKey: ["Course", courseId] });
      queryClient.invalidateQueries({ queryKey: ["MyCourses"] });
    },
    onError: (e: any) => {
      console.log("forking unsuccessful", e.message);
      alert("Failed to fork" + e.message);
    },
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
  let courseData = data;

  const handleForkClick = async (courseId: string) => {
    const wantToFork = confirm(
      `Are you sure want to fork course : ${courseData.courseName}`
    );
    if (!wantToFork) return;
    forkMutation(courseId);
  };
  const handleDeleteCourseClick = async (courseId: string) => {
    const wantToDelete = confirm(
      `Are you sure want to Delete course : ${courseData.courseName}`
    );
    if (!wantToDelete) return;
    deleteMutation(courseId);
  };
  return (
    <div className=" min-h-screen pt-24 mb-12">
      <main className=" mx-auto max-w-2xl w-full px-3 md:max-w-4xl md:px-5">
        {courseData?.modules && (
          <div className=" px-2 m-2 space-y-2">
            <h1 className=" text-xl md:text-2xl font-medium">
              {courseData?.courseName}:{" "}
            </h1>
            <div className=" flex justify-between items-center">
              <div className=" flex gap-2 items-center">
                <div className="flex">
                  <span className="  text-sm md:text-md">Author : </span>
                  <Link href={`/user/${courseData.user.id}`}>
                    <div className=" flex gap-1 items-center">
                      {courseData?.user?.image ? (
                        <Image
                          alt=""
                          width={20}
                          className="rounded-full"
                          height={20}
                          src={courseData.user.image}
                        />
                      ) : (
                        <User className=" w-4 h-4 md:w-5 md:h-5" />
                      )}
                      <span className="   text-sm md:text-md">
                        {courseData?.user?.name}
                      </span>
                    </div>
                  </Link>
                </div>
                <Button
                  onClick={() => handleForkClick(courseData.courseId)}
                  className=""
                  variant={"outline"}
                  disabled={userData?.data?.user?.id == courseData.userId}
                >
                  <div className="flex items-center space-x-2">
                    <GitFork className="h-4 w-4 text-muted-foreground" />
                    <div className=" flex items-center">
                      <span className=" hidden md:block text-sm text-muted-foreground">
                        Fork{" "}
                      </span>
                      <span className=" text-sm text-muted-foreground">
                        {" " + courseData._count.forks}
                      </span>
                    </div>
                  </div>
                </Button>
                {userData?.data?.user?.id == courseData.userId && (
                  <Button
                    onClick={() =>
                      handleDeleteCourseClick(courseData?.courseId)
                    }
                  >
                    {isDeleting ? <Spinner className=" w-4 h-4" /> : "Delete"}
                  </Button>
                )}
              </div>
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

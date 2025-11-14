"use client";
import { forkCourse, getAllCourses } from "@/actions/course";
import CourseCard from "@/components/CourseCard";
import LoadingDisplay from "@/components/LoadingDisplay";
import { Button } from "@/components/ui/button";
import { CourseData } from "@/lib/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function AllCourses() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courseDataInAll"],
    queryFn: getAllCourses,
  });
  const queryClient = useQueryClient();
  const { mutate: forkMutation, isPending: isForking } = useMutation({
    mutationFn: forkCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courseDataInAll"],
      });
      queryClient.invalidateQueries({
        queryKey: ["MyCourses"],
      });
    },
    onError: (e: any) => {
      console.log("forking unsuccessful", e.message);
      alert("Failed to fork" + e.message);
    },
  });

  const handleForkClick = async (courseId: string) => {
    const wantToFork = confirm(`Are you sure want to fork course`);
    if (!wantToFork) return;
    forkMutation(courseId);
  };
  const courseData = data?.data;
  return (
    <div className="min-h-screen py-24">
      <main className=" mx-auto w-full max-w-2xl md:max-w-4xl px-5 space-y-2">
        {isLoading ? (
          <LoadingDisplay message="fetching all courses" />
        ) : isError ? (
          <h1 className="p-24 text-center text-red-500 ">Error</h1>
        ) : (
          <>
            <h1 className=" text-2xl font-mediumf">All Courses and Modules</h1>
            <section className=" space-y-2">
              {courseData?.length > 0 ? (
                courseData.map((course: CourseData) => {
                  return (
                    <div key={course.courseId}>
                      <CourseCard
                        handleForkClick={handleForkClick}
                        course={course}
                      />{" "}
                    </div>
                  );
                })
              ) : (
                <div className=" space-y-2 my-2">
                  <h2>No Course Found</h2>
                  <Link href={"/course"}>
                    <Button>Click, To be the First to create.</Button>
                  </Link>
                </div>
              )}
            </section>{" "}
          </>
        )}
      </main>
    </div>
  );
}

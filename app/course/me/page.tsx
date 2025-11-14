"use client";
import { getCoursesOfUser } from "@/actions/course";
import CourseCard from "@/components/CourseCard";
import LoadingDisplay from "@/components/LoadingDisplay";
import { Button } from "@/components/ui/button";
import { CourseData } from "@/lib/utils/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function MyCourses() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["MyCourses"],
    queryFn: () => getCoursesOfUser(),
    staleTime: 3 * 60 * 1000,
  });
  if (isError && !isLoading) {
    return <h1 className=" py-24">Error</h1>;
  }
  if (isLoading) {
    return (
      <div className=" py-24 mx-auto container max-2-2xl md:max-w-4xl">
        {" "}
        <LoadingDisplay message="fetching your courses" />{" "}
      </div>
    );
  }
  const myCoursesData = data?.data;
  const { forkedCourses, createdCourses }: any = myCoursesData;
  return (
    <div className=" min-h-screen py-24">
      <main className=" mx-auto w-full max-w-4xl px-5 space-y-2">
        <h1 className=" text-2xl font-mediumfy">My Courses</h1>
        <section className=" space-y-2">
          {createdCourses.length ? (
            (createdCourses as any[]).map((course: CourseData) => {
              return (
                <div key={course.courseId}>
                  <CourseCard handleForkClick={() => null} course={course} />{" "}
                </div>
              );
            })
          ) : (
            <div className=" space-y-2 my-2">
              <h2 className=" text-muted-foreground">
                No Created Courses Found!
              </h2>
              <Link href={"/course"}>
                <Button>Click, To create your first course.</Button>
              </Link>
            </div>
          )}
        </section>
        <h1 className=" text-2xl font-mediumf">Forked Courses</h1>
        <section className=" space-y-2">
          {forkedCourses.length ? (
            (forkedCourses as any[]).map((course: CourseData) => {
              return (
                <div key={course.courseId}>
                  <CourseCard handleForkClick={() => null} course={course} />{" "}
                </div>
              );
            })
          ) : (
            <div className=" space-y-2 my-2">
              <h2 className=" text-muted-foreground">
                No Forked Courses Found
              </h2>
              <Link href={"/course/all"}>
                <Button>Go to All Courses</Button>
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

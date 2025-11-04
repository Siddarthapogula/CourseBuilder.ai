import { getCoursesOfUser } from "@/actions/course";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { CourseData } from "@/lib/utils/types";
import Link from "next/link";

export default async function MyCourses() {
  const { data } = await getCoursesOfUser();
  const { forkedCourses, createdCourses }: any = data;
  return (
    <div className=" min-h-screen py-24">
      <main className=" mx-auto w-full max-w-4xl px-5 space-y-2">
        <h1 className=" text-2xl font-mediumfy">My Courses</h1>
        <section className=" space-y-2">
          {createdCourses.length ? (
            (createdCourses as any[]).map((course: CourseData) => {
              return (
                <div key={course.courseId}>
                  <CourseCard course={course} />{" "}
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
                  <CourseCard course={course} />{" "}
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

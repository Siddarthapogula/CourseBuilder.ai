import { getAllCourses } from "@/actions/course";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { CourseData } from "@/lib/utils/types";
import Link from "next/link";

export default async function AllCourses() {
  let allCourses = null;
  const { data }: any = await getAllCourses();
  console.log(data);
  allCourses = data;
  return (
    <div className="min-h-screen py-24">
      <main className=" mx-auto w-full max-w-4xl px-5 space-y-2">
        <h1 className=" text-2xl font-mediumf">All Courses and Modules</h1>
        <section className=" space-y-2">
          {allCourses.length > 0 ? (
            (allCourses as any[]).map((course: CourseData) => {
              return (
                <div key={course.courseId}>
                  <CourseCard course={course} />{" "}
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
        </section>
      </main>
    </div>
  );
}

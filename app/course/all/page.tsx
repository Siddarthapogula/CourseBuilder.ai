"use client";
import { forkCourse, getAllCourses } from "@/actions/course";
import CourseCard from "@/components/CourseCard";
import LoadingDisplay from "@/components/LoadingDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { CourseData } from "@/lib/utils/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, SearchIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const searchPlaceHolder = () => {
  return (
    <span>
      <SearchIcon /> Search for course, Ex : ai fundamentals or digital signal..
    </span>
  );
};

export default function AllCourses() {
  const [searchTerm, setSerchTerm] = useState("");
  const [curPage, setCurPage] = useState(0);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data, status }: any = useSession();
  const {
    data: courseData,
    isLoading: courseDataLoading,
    isError: courseDataError,
  }: any = useQuery({
    queryKey: ["courseDataInAll", debouncedSearchTerm, curPage],
    queryFn: () => getAllCourses(debouncedSearchTerm, curPage),
    placeholderData: (previousData) => previousData,
  });
  const queryClient = useQueryClient();
  const { mutate: forkMutation, isPending: isForking } = useMutation({
    mutationFn: forkCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courseDataInAll", debouncedSearchTerm],
      });
      queryClient.invalidateQueries({
        queryKey: ["MyCourses"],
      });
      toast.success("Course forked Successfully.");
    },
    onError: (e: any) => {
      console.log("forking unsuccessful", e.message);
      toast.error("Failed to fork course, cause : " + e.message);
    },
  });

  const handleForkClick = async (courseId: string) => {
    if (status == "unauthenticated") {
      toast.warning("user should login to fork course");
      return;
    }
    const wantToFork = confirm(`Are you sure want to fork course`);
    if (!wantToFork) return;
    forkMutation(courseId);
  };
  return (
    <div className="min-h-screen py-24">
      <main className=" mx-auto w-full max-w-2xl px-3 md:max-w-4xl md:px-5 space-y-2">
        {courseDataLoading ? (
          <LoadingDisplay message="fetching all courses" />
        ) : courseDataError ? (
          <h1 className="p-24 text-center text-red-500 ">Error</h1>
        ) : (
          <>
            <h1 className=" text-2xl font-mediumf">All Courses and Modules</h1>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                className="pl-10 text-foreground text-sm placeholder:text-muted-foreground"
                placeholder="Search for course, Ex : ai fundamentals or digital signal"
                onChange={(e: any) => {
                  setCurPage(0);
                  setSerchTerm(e.target.value);
                }}
              />
            </div>
            <section className=" space-y-2">
              {courseData?.data?.length > 0 ? (
                courseData?.data.map((course: CourseData) => {
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
                  <h2>
                    {debouncedSearchTerm
                      ? "No courses found for your search."
                      : "You have reached End It seems"}
                  </h2>
                  {debouncedSearchTerm && (
                    <Link href={"/course"}>
                      <Button>Click, To be the First to create.</Button>
                    </Link>
                  )}
                </div>
              )}
            </section>{" "}
          </>
        )}
        {!courseDataLoading && (
          <section className=" flex gap-2 items-center">
            <Button
              onClick={() => setCurPage((prev) => prev - 1)}
              disabled={curPage == 0}
              variant="outline"
            >
              Prev
            </Button>
            {courseData?.data?.length >= 10 && (
              <Button onClick={() => setCurPage((prev) => prev + 1)}>
                Next
              </Button>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

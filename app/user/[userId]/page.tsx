import { getCoursesOfUser } from "@/actions/course";
import { getUserDetails } from "@/actions/user";
import CourseCard from "@/components/CourseCard";
import LoadingDisplay from "@/components/LoadingDisplay";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CourseData, UserData } from "@/lib/utils/types";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function UserCourses({ params }: any) {
  const { userId }: { userId: string } = await params;
  const response = await getUserDetails(userId);
  const userData: UserData = response.data;
  const {
    data,
  }: { data: { forkedCourses: CourseData[]; createdCourses: CourseData[] } } =
    await getCoursesOfUser(userId);
  const { forkedCourses, createdCourses } = data;
  if (!forkedCourses || !createdCourses) {
    return <LoadingDisplay message="fetching user's courses" />;
  }
  const userName =
    forkedCourses?.length > 0
      ? forkedCourses[0]?.user?.name
      : createdCourses?.length > 0
      ? createdCourses[0].user.name
      : null;
  return (
    <div className=" min-h-screen py-24">
      <main className="mx-auto w-full max-w-4xl px-5 space-y-2">
        {!userName && <h1>No Courses Found from the user.</h1>}
        <section className=" space-y-4">
          {userData?.name != "" && (
            <div className=" flex gap-4  items-center">
              <div>
                {userData.image ? (
                  <Image
                    className="  w-12 h-12 rounded-full border"
                    width={76}
                    height={76}
                    alt="user-profile"
                    src={userData.image}
                  />
                ) : (
                  <User className="  w-12 h-12 rounded-full border" />
                )}
              </div>
              <div>
                {" "}
                <h1 className=" text-2xl font-medium">{userData?.name}</h1>
                <p className=" text-xs text-muted-foreground">
                  Joined on{" "}
                  {userData?.createdAt?.getDate() +
                    "/" +
                    userData?.createdAt?.getMonth() +
                    "/" +
                    userData?.createdAt?.getFullYear()}
                </p>
              </div>
            </div>
          )}
          {userData?.organization && (
            <div className=" grid grid-cols-1 md:grid-cols-3 items-center gap-4">
              <Label>Organization </Label>
              <Textarea
                disabled={true}
                className=" resize-none bg-muted md:col-span-2"
                value={userData?.organization}
              />
            </div>
          )}
          {userData?.about && (
            <div className=" grid grid-cols-1 md:grid-cols-3 items-start gap-4">
              <Label>About</Label>
              <Textarea
                disabled={true}
                className=" resize-none bg-muted md:col-span-2"
                value={userData?.about}
              />
            </div>
          )}
          <div className=" border-b my-2"></div>
        </section>

        <h1 className=" text-2xl font-medium">Created Courses</h1>
        <section className="space-y-2">
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
        <h1 className=" text-2xl font-medium">Forked Courses</h1>
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

import { getCourseWithId } from "@/actions/course";
import LoadingDisplay from "@/components/LoadingDisplay";
import ModuleDisplay from "@/components/ModuleDisplay";
import QuizDisplay from "@/components/QuizDisplay";

async function getCourseDetailsWithId(courseId: string) {
  if (!courseId) return;
  try {
    const { data } = await getCourseWithId(courseId);
    console.log(data);
    return data;
  } catch (e) {
    alert("error" + e);
  }
}

export default async function CourseWithId({ params }: any) {
  const { courseId } = await params;
  console.log(courseId);
  const courseData = await getCourseDetailsWithId(courseId);
  if (!courseData) {
    return <LoadingDisplay message="fetcing the course Data" />;
  }
  const { modules, quiz } = courseData;
  return (
    <div className=" min-h-screen min-w-full  mb-12">
      <div className=" flex justify-center">
        <main className="w-[60%]  flex flex-col justify-center mt-24">
          {modules && (
            <div className=" px-2 m-2 space-y-2">
              <h1 className=" text-2xl font-medium">
                {courseData?.courseName}:{" "}
              </h1>
              <span>Created by : </span>
              <ModuleDisplay modulesData={modules} />
            </div>
          )}

          <div className="px-4 my-2">
            {quiz && (
              <QuizDisplay
                courseName={courseData?.courseName as string}
                quizData={quiz}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

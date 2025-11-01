"use client";
import { completeCourse } from "@/actions/course";
import { BuildCourse } from "@/actions/courseBuilder";
import LoadingDisplay from "@/components/LoadingDisplay";
import ModuleDisplay from "@/components/ModuleDisplay";
import QuizDisplay from "@/components/QuizDisplay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  CourseData,
  ModuleData,
  QuizData,
  ResponseObject,
} from "@/lib/utils/types";
import { ArrowUp, Square } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CourseBuilder() {
  const [openedModuels, setOpenedModules] = useState<number[]>([]);
  const [userPrompt, setUserPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState<CourseData>();
  const [modulesData, setModulesData] = useState<ModuleData[] | null>(null);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [stage, setStage] = useState(1);

  const chatRef = useRef(null);
  const modulesRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef(null);

  const router = useRouter();

  function handleToggleModule(index: number) {
    if (openedModuels.includes(index)) {
      setOpenedModules((indexes) => indexes.filter((i) => i != index));
    } else {
      setOpenedModules((indexes) => [...indexes, index]);
    }
  }

  function getDataAccordingToStage() {
    if (stage == 1) {
      return "";
    } else if (stage == 2) {
      if (!courseData) return;
      return { courseName: courseData.courseName, data: courseData.modules };
    } else {
      if (!modulesData || !courseData) return;
      return { courseName: courseData?.courseName, data: modulesData };
    }
  }

  useEffect(() => {
    if (stage == 3 && modulesRef.current) {
      modulesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [stage]);

  async function handleSubmitInput() {
    setIsLoading(true);
    try {
      const response: ResponseObject = await BuildCourse({
        userPrompt,
        data: getDataAccordingToStage(),
        stage,
      });
      console.log(response);
      if (!response) return;
      if (stage == 1) {
        setCourseData(response.data);
        setModulesData(response.data.modules);
        setStage((prev) => prev + 1);
      } else if (stage == 2) {
        setModulesData(response.data);
        setStage((prev) => prev + 1);
      } else {
        setQuizData(response.data.quiz);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFinalizeCourse() {
    try {
      if (!courseData?.courseId) return;
      await completeCourse(courseData?.courseId);
      setStage(4);
      router.push(`/course/${courseData?.courseId}`);
      alert(courseData.courseName + " successfully created");
    } catch (e) {
      alert("error while finalizing course, trying again please" + e);
    }
  }

  return (
    <div className=" min-h-screen py-24">
      <main className=" mx-auto max-w-4xl px-5">
        <Badge variant={"outline"} className="p-2 text-sm">
          Click on "How it Works", If you stuck
        </Badge>
        {/* ChatArea */}
        <div ref={chatRef} className="my-2 space-y-2">
          <h1 className=" font-medium text-foreground text-2xl">
            Type Your Prompt Here
          </h1>
          <div className=" flex flex-col w-full gap-2 bg-muted rounded-md border border-input">
            <Textarea
              value={userPrompt}
              onChange={(e) => {
                setUserPrompt(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handleSubmitInput();
                }
              }}
              style={{
                outline: "none",
                boxShadow: "none",
                border: "none",
              }}
              placeholder="Give your prompt.."
              className="resize-none w-full min-h-15 bg-transparent border-0 p-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <div className=" flex items-center justify-between mx-2 p-1">
              <h1>@</h1>
              <div>
                <Button
                  size={"icon"}
                  variant={"outline"}
                  onClick={handleSubmitInput}
                  className={cn(
                    " rounded-full",
                    isLoading && "animate-pulse",
                    "rounded-full"
                  )}
                  disabled={userPrompt.trim().length === 0}
                >
                  {isLoading ? (
                    <Square className="fill-black" size={20} />
                  ) : (
                    <ArrowUp size={20} />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* course modules */}
        {isLoading && stage == 1 && (
          <LoadingDisplay message={"Generating course and its modules"} />
        )}
        {modulesData && (
          <div ref={modulesRef} className="my-2 space-y-2">
            <h1 className=" text-2xl font-medium">
              {courseData?.courseName}:{" "}
            </h1>
            <ModuleDisplay modulesData={modulesData} />
            {stage == 2 && (
              <>
                <Button disabled={isLoading} onClick={handleSubmitInput}>
                  Generate Course Modules
                </Button>
                {!isLoading && (
                  <p className=" text-sm text-red-500 font-medium">
                    Click on Generate to get the explanation of every module
                  </p>
                )}
              </>
            )}
          </div>
        )}
        {isLoading && stage == 2 && (
          <LoadingDisplay message={"Generating module Explantions"} />
        )}

        {/* course Quiz */}
        <div ref={quizRef} className="my-2 space-y-2">
          {!quizData && stage == 3 && (
            <Button disabled={isLoading} onClick={handleSubmitInput}>
              Generate Quiz
            </Button>
          )}
          {isLoading && stage == 3 && (
            <LoadingDisplay message={"Generating Quiz"} />
          )}
          {quizData && (
            <QuizDisplay
              courseName={courseData?.courseName as string}
              quizData={quizData}
            />
          )}
        </div>
        {quizData && (
          <div className=" flex justify-end">
            <Button onClick={handleFinalizeCourse} className="mt-4 ">
              Done, Finalize Quiz
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}

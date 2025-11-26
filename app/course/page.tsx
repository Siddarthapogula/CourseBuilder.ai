"use client";
import {
  completeCourse,
  getCourseWithId,
} from "@/actions/course";
import { BuildCourse } from "@/actions/courseBuilder";
import { deleteModuleById, updateModuleById } from "@/actions/module";
import DraftSideBar from "@/components/DraftSideBar";
import LoadingDisplay from "@/components/LoadingDisplay";
import ModuleMutateDisplay from "@/components/ModuleMutateDisplay";
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
import { useQueryClient } from "@tanstack/react-query";
import { ArrowUp, Square } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function CourseBuilder() {
  const queryClient = useQueryClient();
  const [userPrompt, setUserPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState<CourseData>();
  const [modulesData, setModulesData] = useState<ModuleData[] | null>(null);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [stage, setStage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingModuleDraft, setEditingModuleDraft] =
    useState<ModuleData | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const chatRef = useRef(null);
  const modulesRef = useRef<HTMLDivElement>(null);
  const quizRef = useRef(null);
  const router = useRouter();

  function getDataAccordingToStage() {
    if (stage == 1) {
      return "";
    } else if (stage == 2) {
      if (!courseData) return;
      return { courseName: courseData.courseName, data: modulesData };
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
      if (!response) return;
      if (stage == 1) {
        setCourseData(response.data);
        setModulesData(response.data.modules);
        setStage((prev) => prev + 1);
        queryClient.invalidateQueries({ queryKey: ["UserDraftCourses"] });
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
      toast.success("Course created succcessfully.");
      router.push(`/course/${courseData?.courseId}`);
    } catch (e: any) {
      toast.error("Failed to finalize course, trying again please" + e.message);
    }
  }
  async function handleEditModuleClick(module: ModuleData) {
    if (!module) return;
    setEditingModuleId(module.moduleId);
    setEditingModuleDraft(module);
    return;
  }
  async function handleEditSubmitModuleClick(module: ModuleData) {
    if (!module) return;
    if (!module.title || module.title.trim().length == 0) {
      alert("Module title cannot be empty");
      return;
    }
    setIsUpdating(true);
    try {
      setModulesData((prev) => {
        return prev
          ? prev.map((m) => (module.moduleId == m.moduleId ? module : m))
          : prev;
      });
      await updateModuleById(module);
      setEditingModuleId(null);
      setEditingModuleDraft(null);
    } catch (e: any) {
      alert("failed to save Module" + e.messge);
    } finally {
      setIsUpdating(false);
    }
    return;
  }
  async function handleCancelEditModule() {
    setEditingModuleDraft(null);
    setEditingModuleId(null);
  }
  async function handleDeleteModuleClick(moduleId: string) {
    if (!moduleId) return;
    const confirmed = confirm("Are you sure you want to delete this module?");
    if (!confirmed) return;
    const prev = modulesData;
    if (!prev) return;
    setModulesData(prev.filter((m) => m.moduleId !== moduleId));
    try {
      await deleteModuleById(moduleId);
    } catch (e) {
      alert("failed to delete Module, reverting...");
      setModulesData(prev);
    }
  }

  const handleSelectDraft = async (courseId: string) => {
    if (courseData && modulesData && modulesData?.length > 0) {
      const confirmed = confirm(
        "Are you sure want to make this active course to draft and edit your previous course"
      );
      if (!confirmed) return;
    }
    setActiveCourseId(courseId);
    const { data } = await getCourseWithId(courseId);
    const draftCourseData = {
      courseName: data?.courseName,
      modules: data?.modules,
      quiz: data?.quiz,
      userId: data?.user?.id,
      courseId: courseId,
    };
    setCourseData(draftCourseData);
    setModulesData(data?.modules);
    setStage(data?.stage);
  };
  return (
    <div className=" min-h-screen py-24">
      <DraftSideBar
        isOpen={isSidebarOpen}
        toggleSideBar={() => setIsSidebarOpen(!isSidebarOpen)}
        onSelectDraft={handleSelectDraft}
        currentCourseId={activeCourseId || undefined}
      />
      <main className=" mx-auto max-2-2xl px-2 md:max-w-4xl md:px-5 flex flex-col gap-2">
        <Badge
          variant={"outline"}
          className="p-2 text-xs whitespace-normal  wrap-break-word max-w-full"
        >
          Click on "How it Works", If you stuck
        </Badge>
        <Badge
          variant={"outline"}
          className="p-2 text-xs whitespace-normal  wrap-break-word max-w-full"
        >
          Facing some issue with AI api, If you get error like overload just
          retry. Trying hard to resolve this soon..
        </Badge>
        {/* ChatArea */}
        <section>
          <div ref={chatRef} className="my-2 space-y-2">
            <h1 className=" font-medium text-foreground text-2xl">
              Type Your Prompt Here
            </h1>
            <div className="flex flex-col w-full gap-2 bg-muted rounded-md border border-input">
              <Textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmitInput();
                }}
                disabled={stage !== 1 || isLoading}
                placeholder="Give your prompt.."
                className="resize-none w-full min-h-15 p-4 text-sm placeholder:text-muted-foreground
               focus-visible:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  outline: "none",
                  boxShadow: "none",
                  border: "none",
                  background: "inherit",
                }}
              />
              <div className="flex items-center justify-between px-4 pb-3">
                <h1>@</h1>

                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleSubmitInput}
                  className={cn("rounded-full", isLoading && "animate-pulse")}
                  disabled={userPrompt.trim().length === 0 || stage !== 1}
                >
                  {isLoading && stage === 1 ? (
                    <Square className="fill-black" size={20} />
                  ) : (
                    <ArrowUp size={20} />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* course modules */}
        {isLoading && stage == 1 && (
          <LoadingDisplay message={"Generating course and its modules"} />
        )}

        <section>
          {modulesData && (
            <div ref={modulesRef} className="my-2 space-y-2">
              <h1 className=" text-xl md:text-2xl font-medium">
                {courseData?.courseName}:{" "}
              </h1>
              <ModuleMutateDisplay
                isUpdating={isUpdating}
                editingModuleId={editingModuleId}
                editingModuleDraft={editingModuleDraft}
                handleCancelEditModule={handleCancelEditModule}
                handleEditModuleClick={handleEditModuleClick}
                handleEditSubmitModuleClick={handleEditSubmitModuleClick}
                handleDeleteModuleClick={handleDeleteModuleClick}
                setEditingModuleDraft={setEditingModuleDraft}
                stage={stage}
                modulesData={modulesData}
              />
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
        </section>

        {isLoading && stage == 2 && (
          <LoadingDisplay message={"Generating module Explantions"} />
        )}

        {/* course Quiz */}
        <section>
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
        </section>
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

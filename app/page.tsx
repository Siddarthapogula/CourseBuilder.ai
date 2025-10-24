"use client";

import { BuildCourse } from "@/actions/courseBuilder";
import {
  modulesData,
  modulesTitlesWithId,
  QuizData,
} from "@/lib/utils/courseConstants";
import { ModuleData } from "@/lib/utils/types";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // const [stage, setStage] = useState(1);
  async function getModuleData(
    courseName: string,
    modules: any[],
    stage: number
  ) {
    const userPrompt = `For Course ${courseName}`;
    return await BuildCourse({ userPrompt, data: modules, stage });
  }

  const prompt =
    "build a course on artificial integlligence, this is a course for beginners, covers all the fundamental topics for getting started in ai.";
  async function handleSubmit() {
    //   const data = await BuildCourse({
    //     userPrompt: prompt,
    //     data: "",
    //     stage : 1,
    //   });
    //   const { courseName, modules } = data;
    //   if (!modules || !courseName) return;
    // const moduleExplanationData : ModuleData[]  = await getModuleData(
    //   courseName,
    //   modules,
    //   2
    // );

    // const moduleExplanationData: ModuleData[] = stage2AnotherData;
    // console.log(moduleExplanationData);
    // console.log(
    //   "now we got the modules data, we are calling function to generate the quiz"
    // );
    // const modulesData = moduleExplanationData.map((module) => ({
    //   title: module.moduleTitle,
    //   description: module.description,
    // }));
    const ModuleExpandedData = await BuildCourse({
      userPrompt: "Foundations of Artificial Intelligence: A Beginner’s Guide",
      data: { courseId: "cmh28rvr8000tu9ukvjgil5c0", QuizData },
      stage: 2,
    });
    const Quiz = await BuildCourse({
      userPrompt: "Foundations of Artificial Intelligence: A Beginner’s Guide",
      data: { courseId: "cmh28rvr8000tu9ukvjgil5c0", QuizData },
      stage: 3,
    });
    console.log("quiz :", Quiz);
  }
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen">
      <h1>{prompt}</h1>
      <button
        onClick={handleSubmit}
        className=" p-2 bg-white text-black rounded-lg cursor-pointer"
      >
        Submit
      </button>
      <Link
        href={"/course"}
        className=" p-2 m-2 bg-white text-black rounded-lg cursor-pointer"
      >
        Go to Course
      </Link>
    </div>
  );
}

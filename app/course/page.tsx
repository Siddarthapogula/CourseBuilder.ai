"use client";
import { BuildCourse } from "@/actions/courseBuilder";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  stage2InputData,
  stage3InputData,
} from "@/HardCoded/genaihardcodedata";
import { cn } from "@/lib/utils";
import { ArrowUp, PlayIcon, Square } from "lucide-react";
import { useState } from "react";

export default function CourseBuilder() {
  const [openedModuels, setOpenedModules] = useState<number[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState<any[]>([]);
  const [modulesData, setModulesData] = useState<any[]>([]);
  const [quizData, setQuizData] = useState<any[]>([]);
  const [stage, setStage] = useState(3);

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
      // return { courseName: courseData?.courseName, data: stage2InputData };
      return {
        courseName: "Cyber Security Fundamentals: A Beginner's Guide",
        data: stage2InputData,
      };
    } else {
      // return { courseName: courseData?.courseName, data: modulesData };
      return {
        courseName: "Cyber Security Fundamentals: A Beginner's Guide",
        data: stage3InputData,
      };
    }
  }

  async function handleSubmitInput() {
    const reqBody = {
      userPrompt: userInput,
      data: getDataAccordingToStage(),
      stage,
    };
    const result = await BuildCourse(reqBody);
    console.log(result);
    if (!result?.data) {
      console.log("no data");
      return;
    }
    if (result.message == "success") {
      // setCourseData(result?.course);
      // setModulesData(data);
      setQuizData(result.data?.newQuiz?.questions);
    }
  }

  return (
    <div className="min-h-screen min-w-full mb-12">
      <div className="flex justify-center">
        <main className="w-[60%]  flex flex-col justify-center mt-24">
          {/* ChatArea */}
          <div className=" px-4 m-2 space-y-2">
            <h1 className=" font-semibold text-foreground text-2xl">
              Type Your Prompt Here
            </h1>
            <div className=" flex flex-col w-full gap-2 bg-muted rounded-md border border-input">
              <Textarea
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
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
                    disabled={userInput.trim().length === 0}
                  >
                    {isLoading ? (
                      <Square className="fill-muted" size={20} />
                    ) : (
                      <ArrowUp size={20} />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <Button onClick={handleSubmitInput}>
            Generate Explanations of Course Modules
          </Button>
          {/* course modules */}
          {modulesData.length > 0 && (
            <div className=" px-4 m-2">
              <h1 className=" text-2xl font-semibold">
                {courseData?.courseName}:{" "}
              </h1>
              <div className="">
                {modulesData.map((module: any, index) => (
                  <div key={module?.moduleId}>
                    <div className="flex items-center gap-2">
                      <div
                        onClick={() => handleToggleModule(index)}
                        className={cn(
                          " p-2 cursor-pointer hover:bg-muted rounded-md"
                        )}
                      >
                        <PlayIcon className=" w-4 h-4 fill-black" />
                      </div>
                      <div>
                        <h1 className=" text-md font-semibold">
                          {module?.title}
                        </h1>
                      </div>
                    </div>
                    {openedModuels.includes(index) && (
                      <p className="ml-6 text-muted-foreground">
                        {module?.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* course Quiz */}

          {quizData.length > 0 && (
            <div className=" px-4 my-2 ">
              <div className=" space-y-2">
                {false && <Button>Generate Quiz</Button>}
                <div>
                  <h1 className=" text-2xl font-semibold">
                    Quiz for {courseData?.courseName}
                  </h1>
                  <div className=" space-y-3 my-2">
                    {quizData.map((question: any, index) => (
                      <div key={index} className="space-y-2">
                        <p className=" text-md font-semibold">
                          {index + 1}
                          {". "} {question?.question}
                        </p>
                        <RadioGroup
                          // onValueChange={handleAnswer}
                          // value={answers[currentQuestion]}
                          className=" space-y-2"
                        >
                          {question?.options.map(
                            (option: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  value={option}
                                  id={`option-${index}`}
                                  className=" bg-muted cursor-pointer"
                                />
                                <Label
                                  className=" text-muted-foreground"
                                  htmlFor={`option-${index}`}
                                >
                                  {option}
                                </Label>
                              </div>
                            )
                          )}
                        </RadioGroup>

                        {/* {showExplanation && (
                      <div className=" m-4 p-4 bg-muted rounded-lg">
                        <p className=" font-medium">Explanation</p>
                        <p className=" text-muted-foreground">
                          {question?.explanation}
                        </p>
                      </div>
                    )} */}
                      </div>
                    ))}
                  </div>
                </div>
                <div className=" flex justify-end">
                  <Button className="mt-4 ">Done, Finalize Quiz</Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

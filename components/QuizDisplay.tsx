"use client";
import { Question, QuizData } from "@/lib/utils/types";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";

export interface QuizDisplayProps {
  courseName: string;
  quizData: QuizData;
}
export default function QuizDisplay({
  courseName,
  quizData,
}: QuizDisplayProps) {
  const [showAnswers, setShowAnswer] = useState(new Set());
  const toggleShowAnswer = (questionId: string) => {
    setShowAnswer((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
        return newSet;
      } else {
        newSet.add(questionId);
        return newSet;
      }
    });
  };
  return (
    <div className=" space-y-2 ">
      <div className="">
        <h1 className=" text-2xl font-medium">Quiz for {courseName}</h1>
        <div className=" space-y-3 my-2 ">
          {quizData?.questions.map((question: any, index: number) => (
            <div key={index} className="space-y-2">
              <p className=" text-md font-medium">
                {index + 1}
                {". "} {question?.question}
              </p>
              <RadioGroup className=" space-y-2">
                {question?.options.map((option: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
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
                ))}
              </RadioGroup>
              <Button
                onClick={() => toggleShowAnswer(question?.questionId)}
                className=" p-1"
                variant={"link"}
              >
                {showAnswers.has(question?.questionId) ? "hide" : "show"} Answer
              </Button>
              {showAnswers.has(question?.questionId) && (
                <div className=" p-2 bg-muted rounded-md">
                  <p className=" text-sm">
                    <span className=" font-medium">Answer : </span>{" "}
                    {question?.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";
import { ModuleData } from "@/lib/utils/types";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";

interface ModuleDisplayProps {
  modulesData: ModuleData[];
}

export default function ModuleDisplay({ modulesData }: ModuleDisplayProps) {
  const [expandedModules, setExpandedModules] = useState(new Set());
  const descriptionCharLimit = 200;
  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules((prevExpandedModules) => {
      const newSet = new Set(prevExpandedModules);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };
  return (
    <div className=" space-y-2">
      {modulesData.map((module: ModuleData) => {
        const isExpanded = expandedModules.has(module.moduleId);
        const isLongDescription =
          module?.description &&
          module.description.length > descriptionCharLimit;
        const displayedDiscription =
          isExpanded || !isLongDescription
            ? module?.description
            : `${module.description?.substring(0, descriptionCharLimit)}...`;
        return (
          <Card key={module?.moduleId} className=" bg-muted shadow-sm">
            {
              <CardContent>
                <CardTitle className=" text-md md:text-lg my-2 font-medium">
                  <div className=" flex gap-2 items-center">
                    <span>
                      {modulesData.indexOf(module) + 1}
                      {". "}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="truncate text-md md:text-lg">
                        {module.title}
                      </h3>
                    </div>
                  </div>
                </CardTitle>
                {displayedDiscription != "" && (
                  <p className="text-md text-gray-700 leading-relaxed whitespace-pre-line">
                    {displayedDiscription}
                  </p>
                )}
                {isLongDescription && (
                  <CardFooter className="px-0 pb-0 flex justify-end">
                    <Button
                      variant="ghost"
                      onClick={() => toggleModuleExpansion(module.moduleId)}
                      className="text-primary hover:bg-primary-foreground flex items-center gap-1"
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                      {isExpanded ? (
                        <ChevronUpIcon className="w-4 h-4" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4" />
                      )}
                    </Button>
                  </CardFooter>
                )}
              </CardContent>
            }
          </Card>
        );
      })}
    </div>
  );
}

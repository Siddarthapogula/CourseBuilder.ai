"use client";
import { ModuleData } from "@/lib/utils/types";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  Check,
  ChevronDownIcon,
  ChevronUpIcon,
  Edit,
  Trash,
  X,
} from "lucide-react";
import { boolean, string } from "zod";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";

export interface ModuleMutateDisplayProps {
  isUpdating: boolean;
  editingModuleId: string | null;
  editingModuleDraft: ModuleData | null;
  handleCancelEditModule: () => void;
  handleEditModuleClick: (module: any) => void;
  handleEditSubmitModuleClick: (module: any) => void;
  handleDeleteModuleClick: (moduleId: string) => void;
  setEditingModuleDraft: (module: any) => void;
  stage: number;
  modulesData: ModuleData[];
}

export default function ModuleMutateDisplay({
  isUpdating,
  editingModuleId,
  editingModuleDraft,
  handleCancelEditModule,
  handleEditModuleClick,
  handleEditSubmitModuleClick,
  setEditingModuleDraft,
  handleDeleteModuleClick,
  stage,
  modulesData,
}: ModuleMutateDisplayProps) {
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
    <div className="space-y-2">
      {modulesData.map((module: ModuleData, index: number) => {
        const isExpanded = expandedModules.has(module.moduleId);
        const isLongDescription =
          module?.description &&
          module.description.length > descriptionCharLimit;
        const displayedDiscription =
          isExpanded || !isLongDescription
            ? module?.description
            : `${module.description?.substring(0, descriptionCharLimit)}...`;

        return (
          <Card key={module?.moduleId} className="bg-muted shadow-sm">
            {/* 1. Add padding directly to CardContent. p-4 is a good default. */}
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <div className="flex flex-1 min-w-[200px] items-start gap-2">
                  {" "}
                  <span className="shrink-0 font-semibold w-6 text-left">
                    {index + 1}.
                  </span>
                  {/* 3. Title Container: This will take the rest of the space */}
                  <div className="flex-1 min-w-0">
                    {module.moduleId == editingModuleId ? (
                      <Input
                        value={editingModuleDraft?.title ?? module.title}
                        onChange={(e) =>
                          setEditingModuleDraft({
                            ...(editingModuleDraft ?? module),
                            title: e.target.value,
                          })
                        }
                        className="text-md border-b bg-white p-1"
                        placeholder="Module title"
                      />
                    ) : (
                      <CardTitle className="text-md font-medium md:text-lg">
                        {/* 4. Title: Now it's separate and will wrap correctly */}
                        {module.title}
                      </CardTitle>
                    )}
                  </div>
                </div>

                {/* 5. RIGHT SIDE: Button Group */}
                {/* - flex-shrink-0: Prevents this group from shrinking. */}
                {stage == 2 && (
                  <div className="flex shrink-0 gap-2">
                    {module.moduleId == editingModuleId ? (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            handleEditSubmitModuleClick(editingModuleDraft)
                          }
                        >
                          {isUpdating ? (
                            <Spinner className="h-4 w-4" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleCancelEditModule()}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEditModuleClick(module)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            handleDeleteModuleClick(module.moduleId)
                          }
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* 6. DESCRIPTION: This is now *outside* the flex row. */}
              {/* It will always render cleanly underneath. */}
              {displayedDiscription != "" && (
                <p className="pt-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-line md:text-md">
                  {displayedDiscription}
                </p>
              )}

              {/* "Show More" Footer */}
              {isLongDescription && (
                <CardFooter className="px-0 pt-2 pb-0 flex justify-end">
                  <Button
                    variant="ghost"
                    onClick={() => toggleModuleExpansion(module.moduleId)}
                    className="text-primary hover:bg-primary-foreground flex items-center gap-1"
                  >
                    {isExpanded ? "Show Less" : "Show More"}
                    {isExpanded ? (
                      <ChevronUpIcon className="h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </Button>
                </CardFooter>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

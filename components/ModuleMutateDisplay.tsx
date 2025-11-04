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
                <CardTitle className=" text-lg my-2 flex justify-between font-medium text-gray-800">
                  <div className=" flex gap-2 items-center">
                    <span>
                      {modulesData.indexOf(module) + 1}
                      {". "}
                    </span>
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
                          className=" min-w-sm md:min-w-lg text-lg border-b bg-white p-1 placeholder:italic placeholder:text-muted-foreground"
                          placeholder="Module title"
                        />
                      ) : (
                        <h3 className="truncate text-md md:text-lg">
                          {module.title}
                        </h3>
                      )}
                    </div>
                  </div>
                  {stage == 2 && (
                    <div className=" flex gap-4">
                      {module.moduleId == editingModuleId ? (
                        <div>
                          {isUpdating ? (
                            <Button>
                              <Spinner className=" w-5 h-5" />
                            </Button>
                          ) : (
                            <Button
                              onClick={() =>
                                handleEditSubmitModuleClick(editingModuleDraft)
                              }
                            >
                              <Check className=" w-5 h-5" />
                            </Button>
                          )}
                        </div>
                      ) : (
                        <Button onClick={() => handleEditModuleClick(module)}>
                          <Edit className=" w-5 h-5" />
                        </Button>
                      )}
                      {module.moduleId == editingModuleId ? (
                        <div>
                          <Button onClick={() => handleCancelEditModule()}>
                            <X className=" w-5 h-5" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() =>
                            handleDeleteModuleClick(module.moduleId)
                          }
                        >
                          <Trash className=" w-5 h-5" />
                        </Button>
                      )}
                    </div>
                  )}
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

import { getUsersDraftCourses } from "@/actions/course";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea } from "./ui/scroll-area";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  History,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";

interface DraftSideBarProps {
  isOpen: boolean;
  toggleSideBar: () => void;
  onSelectDraft: (courseId: string) => void;
  currentCourseId?: string;
}

export default function DraftSideBar({
  isOpen,
  toggleSideBar,
  onSelectDraft,
  currentCourseId,
}: DraftSideBarProps) {
  const { data: draftCoursesResonse, isLoading: draftCoursesLoading } =
    useQuery({
      queryKey: ["UserDraftCourses"],
      queryFn: getUsersDraftCourses,
    });
  const draftCoursesData = draftCoursesResonse?.data || [];
  const DraftList = () => {
    return (
      <ScrollArea className=" h-[calc(100vh-8rem)] px-4 py-2">
        {draftCoursesLoading ? (
          <div className=" flex justify-center py-8">
            <Loader2 className=" h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className=" space-y-2">
            {draftCoursesData.map(
              (draftCourse: {
                courseId: string;
                courseName: string;
                updatedAt: string;
              }) => (
                <button
                  key={draftCourse.courseId}
                  onClick={() => onSelectDraft(draftCourse.courseId)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg text-sm transition-colors hover:bg-accent group",
                    currentCourseId === draftCourse.courseId
                      ? "bg-accent border-l-2 border-primary"
                      : "border-l-2 border-transparent"
                  )}
                >
                  <div className="font-medium truncate group-hover:text-primary transition-colors">
                    {draftCourse.courseName || "Untitled Course"}
                  </div>
                  <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                    {/* <span>Stage {draftCourse.stage}</span> */}
                    <span>
                      {formatDistanceToNow(new Date(draftCourse.updatedAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </button>
              )
            )}
          </div>
        )}
      </ScrollArea>
    );
  };
  return (
    <>
      <div className=" md:hidden fixed left-4 top-24 z-30">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-md"
            >
              <History className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0 pt-10">
            <SheetHeader className="px-4 pb-4">
              <SheetTitle>Your Drafts</SheetTitle>
            </SheetHeader>
            <DraftList />
          </SheetContent>
        </Sheet>
      </div>
      <aside
        className={cn(
          "hidden md:flex flex-col fixed left-0 top-16 bottom-0 z-20 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out",
          isOpen ? "w-[280px] translate-x-0" : "w-0 -translate-x-full opacity-0"
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-sm flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Drafts
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSideBar}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        <DraftList />
      </aside>
      {!isOpen && (
        <div className="hidden md:block fixed left-4 top-24 z-30 animate-in fade-in zoom-in duration-300">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSideBar}
            className="rounded-full shadow-md gap-2 pl-3 pr-4"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="text-xs">Drafts</span>
          </Button>
        </div>
      )}
    </>
  );
}

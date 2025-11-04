import LoadingDisplay from "@/components/LoadingDisplay";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";

export default function AllCoursesLoading() {
  return (
    <div className=" pt-24 mx-auto max-w-4xl px-4">
      {" "}
      <LoadingDisplay message="Fetching all courses" />
    </div>
  );
}

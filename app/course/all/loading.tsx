import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";

export default function AllCoursesLoading() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Item>
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">
            {"Fetching All courses"}...
          </ItemTitle>
        </ItemContent>
      </Item>
    </div>
  );
}

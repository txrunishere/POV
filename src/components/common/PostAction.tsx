import type { Models } from "appwrite";
import { Button } from "../ui/button";
import { Bookmark, Heart } from "lucide-react";

const PostAction = ({
  post,
  userId,
}: {
  post: Models.DefaultRow;
  userId: string;
}) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <Button onClick={() => {}} size={"icon-lg"} variant={"ghost"}>
          <Heart />
        </Button>
        <p>0</p>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={() => {}} size={"icon-lg"} variant={"ghost"}>
          <Bookmark />
        </Button>
      </div>
    </div>
  );
};

export default PostAction;

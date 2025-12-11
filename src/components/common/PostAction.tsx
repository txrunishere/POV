import type { Models } from "appwrite";
import { Button } from "../ui/button";
import { Bookmark, Heart } from "lucide-react";
import {
  likePostMutation,
  savePostMutation,
  deleteSavedPostMutation,
} from "@/lib/react-query/mutations";
import { useEffect, useState } from "react";
import { getCurrentUserQuery } from "@/lib/react-query/queries";

const PostAction = ({
  post,
  userId,
}: {
  post: Models.DefaultRow;
  userId: string;
}) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const checkIsLiked = (likesList: string[], userId: string) => {
    return likesList.includes(userId);
  };

  const { mutate: likePost, isPending: likePostLoading } = likePostMutation();
  const { mutate: savePost } = savePostMutation();
  const { mutate: deleteSavedPost } = deleteSavedPostMutation();

  const { data: currentUser } = getCurrentUserQuery();

  console.log({ currentUser });

  const checkIsSaved = currentUser?.saved.find(
    (savedPost: Models.DefaultRow) => savedPost.post === post.$id,
  );

  useEffect(() => {
    if (!currentUser) return;
    setIsSaved(!!checkIsSaved);
  }, [currentUser]);

  const handleLikePost = async (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const isLiked = newLikes.includes(userId);

    if (isLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };

  const handleSavePost = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (checkIsSaved) {
      setIsSaved(false);
      deleteSavedPost({
        savedPostId: checkIsSaved.$id,
      });
    } else {
      savePost({
        postId: post.$id,
        userId,
      });
      setIsSaved(true);
    }
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <Button
          disabled={likePostLoading}
          onClick={handleLikePost}
          size={"icon-lg"}
          variant={"ghost"}
        >
          {checkIsLiked(likesList, userId) ? <Heart fill="white" /> : <Heart />}
        </Button>
        <p>{post.likes?.length}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={handleSavePost} size={"icon-lg"} variant={"ghost"}>
          {isSaved ? <Bookmark fill="white" /> : <Bookmark />}
        </Button>
      </div>
    </div>
  );
};

export default PostAction;

import { Loader } from "@/components/common";
import PostForm from "@/components/forms/post-form";
import { getPostByIdMutation } from "@/lib/react-query/queries";
import { ImagePlus } from "lucide-react";
import { useParams } from "react-router";

const UpdatePost = () => {
  const { id: postId } = useParams();

  const { data: post, isLoading } = getPostByIdMutation({
    postId: postId || "",
  });

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col items-center gap-10 px-5 py-10 md:overflow-y-auto md:px-8 lg:p-14">
        <div className="flex w-full max-w-5xl items-center justify-start gap-2">
          <ImagePlus size={30} />
          <h2 className="text-xl font-bold md:text-2xl">Update Post</h2>
        </div>
        {isLoading && !post ? (
          <Loader />
        ) : (
          <PostForm action="update" post={post} />
        )}
      </div>
    </div>
  );
};

export default UpdatePost;

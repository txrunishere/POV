import PostForm from "@/components/forms/post-form";
import { ImagePlus } from "lucide-react";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col items-center gap-10 px-5 py-10 md:overflow-y-auto md:px-8 lg:p-14">
        <div className="flex w-full max-w-5xl items-center justify-start gap-2">
          <ImagePlus size={30} />
          <h2 className="text-xl font-bold md:text-2xl">Create Post</h2>
        </div>
        <PostForm />
      </div>
    </div>
  );
};

export default CreatePost;

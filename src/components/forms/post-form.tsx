import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { CreatePostSchema } from "@/lib/validation";
import {
  createPostMutation,
  updatePostMutation,
} from "@/lib/react-query/mutations";
import { useAuth } from "@/context/auth-context";
import { useNavigate } from "react-router";
import { useState } from "react";
import type { Models } from "appwrite";
import { toast } from "sonner";
import { Loader } from "../common";

const PostForm = ({
  post,
  action,
}: {
  post?: Models.DefaultRow;
  action: "create" | "update";
}) => {
  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      caption: post ? post.caption : "",
      location: post ? post.location : "",
      file: null,
      tags: post ? post.tags.join(", ") : "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const navigate = useNavigate();
  const { user } = useAuth();

  const [fileUrl, setFileUrl] = useState<string>(post?.imageUrl || "");

  const { mutateAsync: createPost, isPending: createPostLoading } =
    createPostMutation();

  const { mutateAsync: updatePost, isPending: updatePostLoading } =
    updatePostMutation();

  async function onSubmit(values: z.infer<typeof CreatePostSchema>) {
    if (action === "create") {
      if (!values.file || values.file.length === 0) {
        return toast.error("Please upload an image");
      }
      const res = await createPost({
        ...values,
        file: values.file[0],
        userId: user.id,
      });

      if (res) {
        form.reset();
        navigate("/");
      }
    } else {
      const res = await updatePost({
        ...values,
        file: values?.file || null,
        postId: post?.$id || "",
        imageUrl: post?.imageUrl,
        imageId: post?.imageId,
      });

      if (!res) {
        toast.error("Unable to Update! Please try again");
      } else {
        navigate(`/posts/${post?.$id}`);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-5xl space-y-8"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel>Add File</FormLabel>
              <FormControl>
                <Input
                  className=""
                  type="file"
                  onChange={(e) => {
                    onChange(e.target.files);
                    if (e.target.files && e.target.files[0]) {
                      const url = URL.createObjectURL(e.target.files[0]);
                      setFileUrl(url);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fileUrl && (
            <img
              className="mx-auto w-[80%] object-cover object-center md:w-[70%]"
              src={fileUrl}
              alt="image"
            />
          )}
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (seperated by comma " , ")</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  className="placeholder:text-sm"
                  placeholder="Art, Design, Learn"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-4">
          <Button
            disabled={createPostLoading || updatePostLoading}
            type="submit"
          >
            {updatePostLoading || createPostLoading ? (
              <Loader />
            ) : (
              <>{action === "create" ? "Create" : "Update"} Post</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;

import { Loader, PostAction } from "@/components/common";
import { getPostByIdQuery } from "@/lib/react-query/queries";
import { Link, useParams } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useAuth } from "@/context/auth-context";

dayjs().format();
dayjs.extend(relativeTime);

const PostDetails = () => {
  const { user } = useAuth();

  const { id: postId } = useParams();
  const { data: post, isLoading } = getPostByIdQuery({
    postId: postId || "",
  });

  return (
    <div className="flex flex-1 flex-col items-center gap-10 overflow-y-auto px-5 py-10 md:p-14">
      {isLoading && !post ? (
        <Loader />
      ) : (
        <div className="border-dark-4 xl:rounded-l-rounded-3xl flex w-full max-w-5xl flex-col gap-4 rounded-[30px] border bg-stone-900 p-4 xl:flex-row">
          <img
            className="flex h-80 flex-1 rounded-t-3xl object-cover lg:h-[480px] xl:w-[48%] xl:rounded-l-3xl xl:rounded-tr-none"
            src={post?.imageUrl}
            alt=""
          />
          <div className="flex w-full flex-1 flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex flex-1 flex-col items-start gap-3 rounded-[30px] px-6 lg:gap-6">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Link to={`/profile/${post?.creator.$id}`}>
                      <img
                        className="size-10 rounded-full"
                        src={post?.creator.imageUrl || ""}
                        alt={`creator-${post?.creator.$id}`}
                      />
                    </Link>
                    <div>
                      <p className="text-lg font-semibold">
                        {post?.creator.name}
                      </p>
                      <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <p>{dayjs(post?.$createdAt).fromNow()}</p>
                        🞄
                        <p>{post?.location}</p>
                      </div>
                    </div>
                  </div>
                  {post?.creator.$id === user.id && (
                    <div className="space-x-4">
                      <Button variant={"ghost"} size={"icon-lg"}>
                        <Edit />
                      </Button>
                      <Button variant={"ghost"} size={"icon-lg"}>
                        <Trash />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              <hr className="border" />
              <div>
                <div className="space-y-1 px-6">
                  <p className="text-base font-semibold">{post?.caption}</p>
                  <ul className="text-muted-foreground flex items-center gap-2 text-sm">
                    {post?.tags?.map((tag: string, i: number) => (
                      <li key={`${tag}-${i}`}>#{tag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="px-4">
              {post && <PostAction post={post} userId={user.id} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;

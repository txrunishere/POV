import type { Models } from "appwrite";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Link } from "react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Edit } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import PostAction from "./PostAction";

dayjs().format();
dayjs.extend(relativeTime);

type IPostCardProps = {
  post: Models.DefaultRow;
};

const PostCard = ({ post }: IPostCardProps) => {
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Link to={`/profile/${post.creator.$id}`}>
              <img
                className="size-10 rounded-full"
                src={post.creator.imageUrl || ""}
                alt={`creator-${post.creator.$id}`}
              />
            </Link>
            <div>
              <p className="text-lg font-semibold">{post.creator.name}</p>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <p>{dayjs(post.$createdAt).fromNow()}</p>
                🞄
                <p>{post.location}</p>
              </div>
            </div>
          </div>
          {post.creator.$id === user.id && (
            <Link to={`/update-post/${post.$id}`} className="flex items-center">
              <Edit size={25} className="opacity-70" />
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-base font-semibold">{post.caption}</p>
          <ul className="text-muted-foreground flex items-center gap-2 text-sm">
            {post.tags?.map((tag: string, i: number) => (
              <li key={`${tag}-${i}`}>#{tag}</li>
            ))}
          </ul>
        </div>
        <Link to={`/posts/${post.$id}`}>
          <img
            className="h-70 w-full rounded-xl object-cover object-center"
            src={post.imageUrl}
            alt=""
          />
        </Link>
      </CardContent>
      <CardFooter>
        <PostAction post={post} userId={user.id} />
      </CardFooter>
    </Card>
  );
};

export default PostCard;

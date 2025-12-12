import { useAuth } from "@/context/auth-context";
import type { Models } from "appwrite";
import { Link } from "react-router";
import PostAction from "./PostAction";

type GridPostProps = {
  posts: Models.RowList<Models.DefaultRow>;
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showStats = true,
  showUser = true,
}: GridPostProps) => {
  const { user } = useAuth();

  return (
    <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {posts.rows.map((post) => (
        <li className="relative h-80 min-w-80" key={post.$id}>
          <Link
            to={`/posts/${post.$id}`}
            className="flex h-full w-full cursor-pointer overflow-hidden rounded-3xl border border-stone-600"
          >
            <img
              className="size-full object-cover"
              src={post.imageUrl}
              alt="post"
            />
          </Link>

          <div className="absolute bottom-0 flex w-full items-center justify-between gap-2 rounded-b-3xl bg-linear-to-t from-black/60 to-transparent p-5">
            {showUser && (
              <div className="flex items-center gap-2 font-semibold">
                <img
                  className="size-8 rounded-full"
                  src={post.creator.imageUrl}
                  alt="profile-picture"
                />
                <p>{post.creator.username}</p>
              </div>
            )}
            {showStats && (
              <div>
                <PostAction post={post} userId={user.id} />
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;

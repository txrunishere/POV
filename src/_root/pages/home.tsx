import { Loader, PostCard } from "@/components/common";
import { getRecentPosts } from "@/lib/react-query/queries";

const Home = () => {
  const { data: recentPosts, isLoading: fetchPostsLoading } = getRecentPosts();

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col items-center gap-10 overflow-y-auto px-5 py-10 md:px-8 lg:p-14">
        <div className="flex w-full max-w-screen-sm flex-col items-center gap-6 md:gap-9">
          <h2 className="flex w-full items-center justify-start text-xl font-semibold md:text-2xl">
            Home Feed
          </h2>
          <ul className="flex w-full flex-col justify-between gap-2">
            {fetchPostsLoading && !recentPosts ? (
              <Loader />
            ) : (
              recentPosts?.rows.map((post) => (
                <li>
                  <PostCard post={post} />
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;

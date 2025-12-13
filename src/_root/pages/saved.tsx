import { Loader, PostAction } from "@/components/common";
import { useAuth } from "@/context/auth-context";
import { useSavedPosts } from "@/lib/react-query/queries";

const Saved = () => {
  const { user } = useAuth();

  const { data: savedPosts, isLoading: savedPostsLoading } = useSavedPosts(
    user.id,
  );

  return (
    <div className="flex flex-1">
      <div className="flex flex-1 flex-col items-center overflow-y-auto p-6 md:p-8 lg:p-12">
        <div className="flex w-full max-w-5xl flex-col gap-5">
          <h2 className="text-xl font-semibold md:text-2xl">Saved Posts</h2>

          <div>
            {savedPostsLoading && !savedPosts ? (
              <div className="mt-10 flex w-full justify-center">
                <Loader />
              </div>
            ) : (
              <>
                {savedPosts && savedPosts?.rows?.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {savedPosts?.rows.map((post) => (
                      <div>
                        <div className="relative">
                          <img
                            className="h-80 w-full rounded-xl object-cover"
                            src={post.post.imageUrl}
                            alt=""
                          />
                          <div className="absolute bottom-0 w-full rounded-b-xl bg-linear-to-t from-black to-transparent px-6">
                            <PostAction userId={user.id} post={post.post} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-10 text-xl font-semibold">
                    No Saved Posts Found...!
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Saved;

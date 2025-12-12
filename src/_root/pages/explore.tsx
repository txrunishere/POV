import { GridPostList, Loader, SearchResults } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { getPosts, searchPostsQuery } from "@/lib/react-query/queries";
import { SortDesc } from "lucide-react";
import { useState } from "react";

const Explore = () => {
  const [search, setSearch] = useState<string>("");

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const debouncedValue = useDebounce(search, 700);

  const { data: searchResult, isFetching: isSearchFetching } = searchPostsQuery(
    {
      searchQuery: debouncedValue,
    },
  );

  const {
    data: posts,
    isFetching: isPostFetching,
    fetchNextPage,
    hasNextPage,
  } = getPosts();

  if (!posts) {
    return (
      <div className="flex w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center overflow-y-auto px-5 py-10 md:p-14">
      <div className="flex w-full max-w-5xl flex-col items-center gap-6 md:gap-9">
        <h2 className="w-full text-xl font-semibold md:text-2xl">
          Search Posts
        </h2>

        <div className="flex w-full">
          <Input
            type="text"
            value={search}
            onChange={handleSearchInputChange}
            placeholder="Search"
          />
        </div>

        <div className="mt-12 mb-7 flex w-full max-w-5xl items-center justify-between">
          <h3 className="text-base font-semibold md:text-lg">Popular Today</h3>

          <div>
            <Button variant={"outline"} size={"sm"}>
              All
              <SortDesc />
            </Button>
          </div>
        </div>

        <div className="w-full max-w-full">
          {search !== "" ? (
            searchResult && (
              <SearchResults
                isSearchFetching={isSearchFetching}
                searchPosts={searchResult}
              />
            )
          ) : (
            <>
              {posts.pages.map(
                (posts, index) =>
                  posts && <GridPostList key={`page-${index}`} posts={posts} />,
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;

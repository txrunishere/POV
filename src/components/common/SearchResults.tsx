import type { Models } from "appwrite";
import Loader from "./loader";
import GridPostList from "./GridPostList";

const SearchResults = ({
  isSearchFetching,
  searchPosts,
}: {
  isSearchFetching: boolean;
  searchPosts: Models.RowList<Models.DefaultRow>;
}) => {
  console.log(isSearchFetching);

  if (isSearchFetching) return <Loader />;

  if (searchPosts.rows.length > 0) {
    return <GridPostList posts={searchPosts} />;
  }

  return <div>No Posts Found</div>;
};

export default SearchResults;

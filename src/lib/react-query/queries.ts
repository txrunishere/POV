import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query-keys";
import { fetchRecentPosts } from "../appwrite/api";

const getRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: fetchRecentPosts,
  });
};

export { getRecentPosts };

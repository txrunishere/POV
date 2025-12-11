import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query-keys";
import { fetchRecentPosts, getCurrentUser } from "../appwrite/api";

const getRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: fetchRecentPosts,
  });
};

const getCurrentUserQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: getCurrentUser,
  });
};

export { getRecentPosts, getCurrentUserQuery };

import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query-keys";
import {
  fetchRecentPosts,
  getCurrentUser,
  fetchPostById,
} from "../appwrite/api";

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

const getPostByIdMutation = ({ postId }: { postId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => fetchPostById({ postId }),
    enabled: !!postId,
  });
};

export { getRecentPosts, getCurrentUserQuery, getPostByIdMutation };

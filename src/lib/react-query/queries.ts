import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query-keys";
import {
  fetchRecentPosts,
  getCurrentUser,
  fetchPostById,
  getInfinitePosts,
  searchPosts,
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

const getPostByIdQuery = ({ postId }: { postId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => fetchPostById({ postId }),
    enabled: !!postId,
  });
};

const getPosts = () => {
  return useInfiniteQuery({
    queryKey: ["infinite-posts"],
    queryFn: getInfinitePosts,
    // @ts-ignore
    getNextPageParam: (lastPage) => {
      const lastRow = lastPage?.rows[lastPage.rows.length - 1];
      return lastRow ? lastRow.$id : null;
    },
  });
};
const searchPostsQuery = ({ searchQuery }: { searchQuery: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_SEARCH_POSTS, searchQuery],
    queryFn: () => searchPosts({ searchQuery }),
    enabled: !!searchQuery,
  });
};

export {
  getRecentPosts,
  getCurrentUserQuery,
  getPostByIdQuery,
  getPosts,
  searchPostsQuery,
};

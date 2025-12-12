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
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    //@ts-ignore
    queryFn: getInfinitePosts,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.rows.length === 0) return null;

      return lastPage.rows[lastPage.rows.length - 1].$id;
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

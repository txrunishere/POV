import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  createUser,
  signInUser,
  signOutUser,
  likePost,
  savePost,
  deleteSavedPost,
  updatePost,
  deletePost,
} from "../appwrite/api";
import type { INewPost, INewUser, IUpdatePost } from "@/types";
import { QUERY_KEYS } from "./query-keys";
import type { Models } from "appwrite";

const registerUserMutation = () => {
  return useMutation({
    mutationFn: (user: INewUser) => createUser(user),
  });
};

const loginUserMutation = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) => signInUser(data),
  });
};

const signoutUserMutation = () => {
  return useMutation({
    mutationFn: signOutUser,
  });
};

const createPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: INewPost) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

const likePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { postId: string; likesArray: string[] }) =>
      likePost(data),
    onSuccess: (data: Models.DefaultRow | undefined) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
      });
    },
  });
};

const savePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { userId: string; postId: string }) => savePost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

const deleteSavedPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { savedPostId: string }) => deleteSavedPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

const updatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdatePost) => updatePost(data),
    onSuccess: (data: Models.DefaultRow | undefined) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      });
    },
  });
};

const deletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId }: { postId: string }) => deletePost({ postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export {
  registerUserMutation,
  loginUserMutation,
  signoutUserMutation,
  createPostMutation,
  likePostMutation,
  savePostMutation,
  deleteSavedPostMutation,
  updatePostMutation,
  deletePostMutation,
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPost,
  createUser,
  signInUser,
  signOutUser,
} from "../appwrite/api";
import type { INewPost, INewUser } from "@/types";
import { QUERY_KEYS } from "./query-keys";

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

export {
  registerUserMutation,
  loginUserMutation,
  signoutUserMutation,
  createPostMutation,
};

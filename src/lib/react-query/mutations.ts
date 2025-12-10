import { useMutation } from "@tanstack/react-query";
import {
  createPost,
  createUser,
  signInUser,
  signOutUser,
} from "../appwrite/api";
import type { INewPost, INewUser } from "@/types";

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
  return useMutation({
    mutationFn: (data: INewPost) => createPost(data),
  });
};

export {
  registerUserMutation,
  loginUserMutation,
  signoutUserMutation,
  createPostMutation,
};

import { useMutation } from "@tanstack/react-query";
import { createUser, signInUser, signOutUser } from "../appwrite/api";
import type { INewUser } from "@/types";

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

export { registerUserMutation, loginUserMutation, signoutUserMutation };

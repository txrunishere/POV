import { useMutation } from "@tanstack/react-query";
import { createUser, signInUser } from "../appwrite/api";
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

export { registerUserMutation, loginUserMutation };

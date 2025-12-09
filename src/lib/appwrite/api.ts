import { account, avatars, client, storage, tables } from "./config";
import { ID } from "appwrite";
import type { INewUser } from "@/types";

const createUser = async (data: INewUser) => {
  try {
    const user = await account.create({
      email: data.email,
      password: data.password,
      userId: ID.unique(),
      name: data.name,
    });

    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { createUser };

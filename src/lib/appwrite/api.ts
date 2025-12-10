import { account, appwriteConfig, avatars, tables } from "./config";
import { ID, Query } from "appwrite";
import type { INewUser } from "@/types";

// REGISTER USER
const createUser = async (data: INewUser) => {
  const user = await account.create({
    email: data.email,
    password: data.password,
    userId: ID.unique(),
    name: data.name,
  });

  if (!user) throw Error;

  const userAvatar = avatars.getInitials({
    name: user.name,
  });

  const userDocument = await createUserDocument({
    accountId: user.$id,
    email: user.email,
    name: user.name,
    username: data.username,
    imageUrl: userAvatar,
  });

  return userDocument;
};

// LOGIN USER
const signInUser = async (data: { email: string; password: string }) => {
  const session = await account.createEmailPasswordSession({
    email: data.email,
    password: data.password,
  });

  return session;
};

const createUserDocument = async (data: {
  name: string;
  username: string;
  email: string;
  accountId: string;
  imageUrl: string;
}) => {
  const res = await tables.createRow({
    databaseId: appwriteConfig.appwriteDatabaseId,
    tableId: appwriteConfig.appwriteUsersTableId,
    data,
    rowId: ID.unique(),
  });
  return res;
};

const getCurrentUser = async () => {
  try {
    const session = await account.get();

    if (!session) throw Error;

    const user = await tables.listRows({
      databaseId: appwriteConfig.appwriteDatabaseId,
      tableId: appwriteConfig.appwriteUsersTableId,
      queries: [Query.equal("accountId", session.$id)],
    });

    return user.rows[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { createUser, signInUser, getCurrentUser };

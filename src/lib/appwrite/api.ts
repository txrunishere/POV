import { account, appwriteConfig, avatars, storage, tables } from "./config";
import { ID, Query } from "appwrite";
import type { INewPost, INewUser } from "@/types";
import { da } from "zod/v4/locales";

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

const signOutUser = async () => {
  try {
    const res = await account.deleteSession("current");
    return res;
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (data: INewPost) => {
  try {
    const uploadImage = await storage.createFile({
      bucketId: appwriteConfig.appwriteStorageId,
      fileId: ID.unique(),
      file: data.photos,
    });

    if (!uploadImage) throw Error;

    const imageUrl = storage.getFilePreview({
      bucketId: appwriteConfig.appwriteStorageId,
      fileId: uploadImage.$id,
    });

    if (!imageUrl) throw Error;

    const newPost = await tables.createRow({
      databaseId: appwriteConfig.appwriteDatabaseId,
      tableId: appwriteConfig.appwritePostsTableId,
      rowId: ID.unique(),
      data: {
        creator: data.userId,
        caption: data.caption,
        location: data.location,
        tags: data.tags?.split(",").forEach((i) => i.trim()),
        imageId: uploadImage.$id,
        imageUrl,
      },
    });

    return newPost;
  } catch (error) {
    console.log(error);
  }
};

export { createUser, signInUser, getCurrentUser, signOutUser, createPost };

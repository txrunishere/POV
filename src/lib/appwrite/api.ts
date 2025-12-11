import { account, appwriteConfig, avatars, tables } from "./config";
import { ID, Query } from "appwrite";
import type { INewPost, INewUser } from "@/types";
import axios from "axios";

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
    const form = new FormData();
    form.append("file", data.photos);
    form.append("upload_preset", "POV-cloudinary");
    form.append("cloud_name", "dpp16pzli");
    const image = await axios.post(
      "https://api.cloudinary.com/v1_1/dpp16pzli/image/upload",
      form,
    );

    const newPost = await tables.createRow({
      databaseId: appwriteConfig.appwriteDatabaseId,
      tableId: appwriteConfig.appwritePostsTableId,
      rowId: ID.unique(),
      data: {
        creator: data.userId,
        caption: data.caption,
        location: data.location,
        tags: data.tags?.split(", "),
        imageId: image.data?.public_id,
        imageUrl: image.data?.secure_url,
      },
    });

    if (!newPost) {
    }
    return newPost;
  } catch (error) {
    console.log(error);
  }
};

const fetchRecentPosts = async () => {
  const posts = await tables.listRows({
    databaseId: appwriteConfig.appwriteDatabaseId,
    tableId: appwriteConfig.appwritePostsTableId,
    queries: [
      Query.orderDesc("$createdAt"),
      Query.limit(20),
      Query.select(["*", "creator.*"]),
    ],
  });

  if (!posts) throw Error;

  return posts;
};

export {
  createUser,
  signInUser,
  getCurrentUser,
  signOutUser,
  createPost,
  fetchRecentPosts,
};

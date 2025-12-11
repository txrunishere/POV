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
      queries: [
        Query.equal("accountId", session.$id),
        Query.select(["*", "liked.$id", "saved.*"]),
      ],
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
      Query.select(["*", "creator.*", "likes.*", "save.*"]),
    ],
  });

  if (!posts) throw Error;

  return posts;
};

const likePost = async ({
  postId,
  likesArray,
}: {
  postId: string;
  likesArray: string[];
}) => {
  try {
    const updatedPost = await tables.updateRow({
      databaseId: appwriteConfig.appwriteDatabaseId,
      tableId: appwriteConfig.appwritePostsTableId,
      rowId: postId,
      data: {
        likes: likesArray,
      },
    });

    if (!updatedPost) throw Error;

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
};

const savePost = async ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  try {
    const save = await tables.createRow({
      databaseId: appwriteConfig.appwriteDatabaseId,
      tableId: appwriteConfig.appwriteSavesTableId,
      rowId: ID.unique(),
      data: {
        user: userId,
        post: postId,
      },
    });

    if (!save) throw Error;

    return save;
  } catch (error) {
    console.log(error);
  }
};

const deleteSavedPost = async ({ savedPostId }: { savedPostId: string }) => {
  try {
    const savedPost = await tables.deleteRow({
      databaseId: appwriteConfig.appwriteDatabaseId,
      tableId: appwriteConfig.appwriteSavesTableId,
      rowId: savedPostId,
    });

    if (!savedPost) throw Error;

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
};

export {
  createUser,
  signInUser,
  getCurrentUser,
  signOutUser,
  createPost,
  fetchRecentPosts,
  likePost,
  savePost,
  deleteSavedPost,
};

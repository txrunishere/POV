import { Client, Account, TablesDB, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID as string,
  projectName: import.meta.env.VITE_APPWRITE_PROJECT_NAME as string,
  appwriteEndpoint: import.meta.env.VITE_APPWRITE_ENDPOINT as string,
  appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID as string,
  appwriteUsersTableId: import.meta.env.VITE_APPWRITE_USERS_TABLE_ID as string,
  appwritePostsTableId: import.meta.env.VITE_APPWRITE_POSTS_TABLE_ID as string,
  appwriteSavesTableId: import.meta.env.VITE_APPWRITE_SAVES_TABLE_ID as string,
};

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.appwriteEndpoint);

export const account = new Account(client);
export const tables = new TablesDB(client);
export const avatars = new Avatars(client);

import { Client, Account, TablesDB, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  projectName: import.meta.env.VITE_APPWRITE_PROJECT_NAME,
  appwriteEndpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
};

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.appwriteEndpoint);

export const account = new Account(client);
export const tables = new TablesDB(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

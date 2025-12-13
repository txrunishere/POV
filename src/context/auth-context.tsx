import type { IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/appwrite/api";
import { useNavigate } from "react-router";

type IAuthContext = {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
  following: null,
  followers: null,
};

const INITIAL_VALUES: IAuthContext = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
};

const AuthContext = createContext<IAuthContext>(INITIAL_VALUES);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentUser = await getCurrentUser();

      if (currentUser) {
        setUser({
          bio: currentUser.bio,
          email: currentUser.email,
          id: currentUser.$id,
          imageUrl: currentUser.imageUrl,
          name: currentUser.name,
          username: currentUser.username,
          followers: currentUser.followers,
          following: currentUser.following,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === "[]" ||
      localStorage.getItem("cookieFallback") === "{}" ||
      localStorage.getItem("cookieFallback") === null
    ) {
      navigate("/sign-in");
    }
    checkAuthUser();
  }, []);

  const value: IAuthContext = {
    user,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    setUser,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);

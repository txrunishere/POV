import { Home, Compass, Users, Bookmark, PlusCircle } from "lucide-react";

export const ROUTES = {
  HOME: "/",
  SIGNIN: "/sign-in",
  SIGNUP: "/sign-up",
  EXPLORE: "/explore",
  ALLUSERS: "/all-users",
  SAVED: "/saved",
  CREATEPOST: "/create-post",
  PROFILE: "/profile/:id/*",
  UPDATEPOST: "/update-post/:id",
  UPDATEPROFILE: "/update-profile/:id",
  POSTDETAILS: "/posts/:id",
};

export const sidebarLinks = [
  {
    icon: Home,
    route: "/",
    label: "Home",
  },
  {
    icon: Compass,
    route: "/explore",
    label: "Explore",
  },
  {
    icon: Users,
    route: "/all-users",
    label: "People",
  },
  {
    icon: Bookmark,
    route: "/saved",
    label: "Saved",
  },
  {
    icon: PlusCircle,
    route: "/create-post",
    label: "Create Post",
  },
];

export const bottombarLinks = [
  {
    icon: Home,
    route: "/",
    label: "Home",
  },
  {
    icon: Compass,
    route: "/explore",
    label: "Explore",
  },
  {
    icon: Bookmark,
    route: "/saved",
    label: "Saved",
  },
  {
    icon: PlusCircle,
    route: "/create-post",
    label: "Create",
  },
];

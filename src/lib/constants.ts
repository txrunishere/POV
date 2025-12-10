import { Home, Compass, Users, Bookmark, PlusCircle } from "lucide-react";

export const ROUTES = {
  HOME: "/",
  SIGNIN: "/sign-in",
  SIGNUP: "/sign-up",
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
    icon: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    icon: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    icon: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "Saved",
  },
  {
    icon: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "Create",
  },
];

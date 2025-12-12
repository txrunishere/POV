import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { signoutUserMutation } from "@/lib/react-query/mutations";
import { sidebarLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Loader from "./loader";

const LeftSidebar = () => {
  const {
    mutate: signOut,
    isPending: userSignoutLoading,
    isSuccess,
  } = signoutUserMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isLoading: isUserLoading } = useAuth();

  useEffect(() => {
    if (isSuccess) {
      navigate("/sign-in");
    }
  }, [isSuccess]);

  return (
    <section className="hidden min-w-[270px] flex-col justify-center bg-black px-6 pt-0 pb-8 md:flex">
      <div className="flex-1">
        <Link to={"/"}>
          <img src="pov-updated.png" alt="POV-logo" className="w-[200px]" />
        </Link>
        <div className="">
          <div className="space-y-10">
            <Link
              to={`/profile/${user.id}`}
              className="flex items-center gap-2"
            >
              <img
                src={
                  isUserLoading ? "./placeholder-profile.jpg" : user.imageUrl
                }
                className="size-12 rounded-full"
                alt={`${user.username}-profile-picture`}
              />
              <div>
                <>
                  <p className="text-xl font-bold">{user.name || "user"}</p>
                  <p className="text-muted-foreground text-sm">
                    @{user.username || "user"}
                  </p>
                </>
              </div>
            </Link>
            <ul className="w-full space-y-4">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <Link
                      className={cn(
                        "flex items-center gap-4 rounded-xl px-4 py-4",
                        location.pathname === link.route
                          ? "rounded-xl bg-linear-to-r from-gray-600 to-gray-400"
                          : "",
                        "transition-colors duration-300 hover:bg-linear-to-r hover:from-gray-600 hover:to-gray-400",
                      )}
                      to={link.route}
                    >
                      <Icon size={20} />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="">
        <Button
          disabled={userSignoutLoading}
          variant={"ghost"}
          size={"lg"}
          onClick={() => signOut()}
        >
          <span>
            <LogOut />
          </span>
          <span>Logout</span>
        </Button>
      </div>
    </section>
  );
};

export default LeftSidebar;

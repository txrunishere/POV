import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { signoutUserMutation } from "@/lib/react-query/mutations";

const TopBar = () => {
  const {
    mutate: signOut,
    isPending: userSignoutLoading,
    isSuccess,
  } = signoutUserMutation();
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    if (isSuccess) {
      navigate("/sign-in");
    }
  }, [isSuccess]);

  return (
    <section className="sticky top-0 z-50 w-full bg-black md:hidden">
      <nav className="flex items-center justify-between px-4">
        <Link className="" to={"/"}>
          <img className="size-16" src="./pov.png" alt="pov-logo" />
        </Link>
        <div className="flex items-center gap-4">
          <Button
            disabled={userSignoutLoading}
            size={"icon-sm"}
            variant={"ghost"}
            onClick={() => signOut()}
          >
            <LogOut />
          </Button>
          <Link to={`/profile/${user.id}`}>
            <img
              className="size-8 rounded-full"
              src={user.imageUrl}
              alt={`${user.username}-profile-picture`}
            />
          </Link>
        </div>
      </nav>
    </section>
  );
};

export default TopBar;

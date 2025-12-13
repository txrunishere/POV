import type { Models } from "appwrite";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from "@/lib/react-query/mutations";

const UserCard = ({
  user,
  fullUser,
}: {
  user: Models.DefaultRow;
  fullUser: Models.DefaultRow;
}) => {
  const isFollowed = fullUser.following?.find(
    (followingUser: Models.DefaultRow) => followingUser.follows === user.$id,
  );

  const { mutateAsync: followUser, isPending: isFollowUserPending } =
    useFollowUserMutation();

  const { mutateAsync: unFollowUser, isPending: isUnFollowUserPending } =
    useUnFollowUserMutation();

  const handleFollowUser = async () => {
    if (isFollowed) {
      await unFollowUser({
        followId: isFollowed.$id,
      });
    } else {
      await followUser({
        currentUserId: fullUser.$id,
        followingUserId: user.$id,
      });
    }
  };

  return (
    <Card className="gap-4">
      <CardHeader className="justify-center">
        <img src={user.imageUrl} className="size-14 rounded-full" alt="" />
      </CardHeader>
      <CardContent>
        <p className="text-center text-xl font-semibold">{user.name}</p>
        <p className="text-muted-foreground text-center text-sm">
          @{user.username}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleFollowUser}
          className="w-full"
          variant={"outline"}
          disabled={isFollowUserPending || isUnFollowUserPending}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;

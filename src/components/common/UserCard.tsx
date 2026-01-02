import type { Models } from "appwrite";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

const UserCard = ({ user }: { user: Models.DefaultRow }) => {
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
        <Button className="w-full" variant={"outline"}>
          Follow
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;

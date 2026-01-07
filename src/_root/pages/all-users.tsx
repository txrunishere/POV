import { Loader, UserCard } from "@/components/common";
import { useAuth } from "@/hooks/useAuth";
import { useGetUsers } from "@/lib/react-query/queries";

const AllUsers = () => {
  const { user: currentUser } = useAuth();

  const { data: users, isLoading: isUserLoading } = useGetUsers(currentUser.id);

  return (
    <div className="flex flex-1 flex-col items-center overflow-y-auto p-8 md:p-10 lg:p-12">
      <div className="flex w-full max-w-5xl flex-1 flex-col gap-8">
        <h2 className="text-xl font-semibold md:text-2xl">Users</h2>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {isUserLoading ? (
            <Loader />
          ) : (
            users?.rows.map((user) => <UserCard key={user.$id} user={user} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;

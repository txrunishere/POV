import { BottomBar, LeftSidebar, TopBar } from "@/components/common";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <TopBar />
      <LeftSidebar />

      <section className="flex h-auto flex-1 not-md:pb-28">
        <Outlet />
      </section>

      <BottomBar />
    </div>
  );
};

export default RootLayout;

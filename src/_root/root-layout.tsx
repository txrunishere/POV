import { BottomBar, LeftSidebar, TopBar } from "@/components/common";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="relative w-full md:flex">
      <TopBar />
      <LeftSidebar />

      <section className="flex h-full flex-1">
        <Outlet />
      </section>

      <BottomBar />
    </div>
  );
};

export default RootLayout;

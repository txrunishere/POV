import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";
import { bottombarLinks } from "@/lib/constants";

const BottomBar = () => {
  const location = useLocation();

  return (
    <section className="fixed bottom-0 z-50 w-full rounded-t-[20px] bg-black px-4 py-4 md:hidden">
      <ul className="flex justify-between">
        {bottombarLinks.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.label}>
              <Link
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl px-5 py-4",
                  location.pathname === link.route
                    ? "rounded-xl bg-linear-to-t from-gray-600 to-gray-400"
                    : "",
                  "transition-colors duration-300 hover:bg-linear-to-r hover:from-gray-600 hover:to-gray-400",
                )}
                to={link.route}
              >
                <Icon size={16} />
                <span className="text-xs">{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default BottomBar;

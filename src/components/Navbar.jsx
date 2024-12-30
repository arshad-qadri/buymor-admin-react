import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import Loader from "./Loader";

const Navbar = ({ toggleSidebar }) => {
  const { user, loading, setUser } = useContext(UserContext);

  const { logout } = useAuth();
  const path = useLocation();
  const userNavigation = [
    { name: "Your Profile", href: "/profile" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#", isButton: true }, // Add an `isButton` property
  ];
  const titles = {
    "/": "Dashboard",
    "/orders": "Orders",
    "/products": "Products",
    "/category": "Category",
    "/profile": "Profile",
  };
  return (
    <div className="bg-white shadow p-4 flex items-center justify-between z-30">
      <button
        className="lg:hidden text-gray-500 hover:text-gray-700"
        onClick={toggleSidebar}
      >
        ☰
      </button>
      <h1 className="text-lg font-bold md:block hidden">
        {titles[path.pathname]}
      </h1>

      {user ? (
        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton
              as="button"
              disabled={loading}
              className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5 " />
              <span className="sr-only">Open user menu</span>
              <span className="size-8 bg-gray-400 rounded-full flex justify-center items-center font-semibold text-lg">
                {user?.name[0]}
              </span>
              {/* <img
                alt=""
                src={user2.imageUrl}
                className="size-8 bg-gray-400 rounded-full"
              /> */}
            </MenuButton>
          </div>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            {userNavigation.map((item) => (
              <MenuItem key={item.name}>
                {item.isButton ? (
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    {item.name}
                  </Link>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      ) : (
        <Loader size="h-8 w-8 bg-white" />
      )}
    </div>
  );
};

export default Navbar;

"use client";
import { Compass, Layout } from "lucide-react";
import { SidebarItem } from "./SidebarItem";

const guestRoute = [
  { icon: Layout, label: "Dashboard", href: "/" },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const SidebarRoutes = () => {
  const routes = guestRoute;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
export default SidebarRoutes;

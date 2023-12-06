import Logo from "./Logo";
import SidebarRoutes from "./SidebarRoutes";

const SideBar = () => {
  return (
    // check what will happen if i remove the flex and the flex-col
    <div className="h-full  border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full h-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default SideBar;

import DashFooter from "./DashFooter";
import DashNav from "./DashNav";
import { Outlet } from "react-router-dom";

const DashLayout = () => {
  return (
    <div className="flex flex-col min-w-fit min-h-full  items-center justify-start bg-light dark:bg-dark">
      <DashNav />
      <DashFooter />
      <div className="min-w-fit h-fit">
        <Outlet />
      </div>
    </div>
  );
};

export default DashLayout;

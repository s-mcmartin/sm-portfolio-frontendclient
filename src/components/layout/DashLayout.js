import DashFooter from "./DashFooter";
import DashNav from "./DashNav";
import { Outlet } from "react-router-dom";

const DashLayout = () => {
  return (
    <div className="flex flex-col w-full h-full items-center">
      <DashNav />
      <DashFooter />
      <div className="grow p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default DashLayout;

import DashFooter from "./DashFooter";
import DashNav from "./DashNav";
import { Outlet } from "react-router-dom";

const DashLayout = () => {
  return (
    <>
      <DashNav />
      <div className="">
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
};

export default DashLayout;

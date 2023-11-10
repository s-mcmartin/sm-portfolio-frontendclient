import { useLocation, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const DashFooter = () => {
  const { username, status } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onGoHomeClicked = () => navigate("/admin");
  let goHomeButton = null;
  if (pathname !== "/admin") {
    goHomeButton = (
      <button className="" title="Admin Home" onClick={onGoHomeClicked}>
        AdminHome
      </button>
    );
  }
  return (
    <footer className="flex justify-between items-center text-dark dark:text-light w-fit mb-8">
      <p className="text-xl font-light px-4">
        Current user: <span className="px-2 font-semibold">{username}</span>
      </p>
      <p className="text-xl font-light px-4">
        Status: <span className="px-2 font-semibold">{status}</span>
      </p>
    </footer>
  );
};

export default DashFooter;

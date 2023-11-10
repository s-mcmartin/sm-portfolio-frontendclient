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
    <footer className="w-full flex justify-between items-center">
      {goHomeButton}
      <p>Current user: {username}</p>
      <p>Status: {status}</p>
    </footer>
  );
};

export default DashFooter;

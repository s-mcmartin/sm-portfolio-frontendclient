import { Link, useLocation, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";

const ADMIN_REGEX = /^\/admin(\/)?$/;
const CONTACTS_REGEX = /^\/admin\/contacts(\/)?$/;
const USERS_REGEX = /^\/admin\/users(\/)?$/;
const PROJECTS_REGEX = /^\/admin\/projects(\/)?$/;
const COURSES_REGEX = /^\/admin\/courses(\/)?$/;

const DashNav = () => {
  const { username, isManager, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/admin");
  }, [isSuccess, navigate]);

  const onLogoutClicked = () => sendLogout();

  if (isLoading) return <p>Logging Out...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  let adminClass = null;
  if (
    !ADMIN_REGEX.test(pathname) &&
    !CONTACTS_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname) &&
    !PROJECTS_REGEX.test(pathname) &&
    !COURSES_REGEX.test(pathname)
  ) {
    adminClass = "bg-yellow-200";
  }

  const logoutButton = (
    <button
      className="bg-indigo-900 text-light p-2 rounded-md"
      title="Logout"
      onClick={onLogoutClicked}
    >
      LOGOUT
    </button>
  );
  return (
    <header
      className={`w-full flex justify-between items-center space-x-4 ${adminClass}`}
    >
      <Link to="/admin/courses">Courses</Link>
      <Link to="/admin/projects">Projects</Link>
      {(isManager || isAdmin) && <Link to="/admin/contacts">Contacts</Link>}
      {(isManager || isAdmin) && <Link to="/admin/users">Users</Link>}
      {logoutButton}
    </header>
  );
};

export default DashNav;

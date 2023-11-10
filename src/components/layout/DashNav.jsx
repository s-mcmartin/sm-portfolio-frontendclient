import { Link, useLocation, useNavigate } from "react-router-dom";

import { AiOutlineHome } from "react-icons/ai";
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

  const AdminLink = ({ title, href }) => {
    const { pathname } = useLocation();
    return (
      <Link
        className={`uppercase font-bold text-2xl px-4 ${
          pathname === href
            ? "bg-primary dark:bg-primaryDark dark:text-dark text-light"
            : "dark:text-light text-dark"
        }`}
        to={href}
      >
        {title}
      </Link>
    );
  };

  return (
    <header
      className={`w-full flex justify-center my-8 items-center space-x-4 ${adminClass}`}
    >
      <AdminLink href="/admin" title={"Dashboard"} />
      <AdminLink href="/admin/courses" title="Courses" />
      <AdminLink href="/admin/projects" title="Projects" />
      {(isManager || isAdmin) && (
        <AdminLink href="/admin/contacts" title="Contacts" />
      )}
      {(isManager || isAdmin) && (
        <AdminLink href="/admin/users" title="Users" />
      )}
    </header>
  );
};

export default DashNav;

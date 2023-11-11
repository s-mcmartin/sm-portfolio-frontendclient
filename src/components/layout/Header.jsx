import { useEffect, useState } from "react";

import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { useThemeSwitch } from "../../hooks/useThemeSwitch";

const Header = () => {
  const [mode, setMode] = useThemeSwitch();
  const [isOpen, setIsOpen] = useState(false);
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  const navigate = useNavigate();
  const { username } = useAuth();

  const handleClick = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    sendLogout();
    navigate("/login");
  };

  return (
    <header
      className="w-full flex items-center justify-between px-32 py-8 font-medium z-10 dark:text-light
lg:px-16 relative z-1 md:px-12 sm:px-8 dark:bg-dark
"
    >
      <button
        type="button"
        className=" flex-col items-center justify-center hidden lg:flex"
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
        onClick={handleClick}
      >
        <span className="sr-only">Open main menu</span>
        <span
          className={`bg-dark dark:bg-light block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${
            isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${
            isOpen ? "opacity-0" : "opacity-100"
          } my-0.5`}
        ></span>
        <span
          className={`bg-dark dark:bg-light block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out ${
            isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
          }`}
        ></span>
      </button>

      <Navbar
        mode={mode}
        setMode={setMode}
        isUser={username !== "" ? true : false}
        onClickLogout={() => sendLogout()}
      />
      {isOpen ? (
        <MobileNavbar
          mode={mode}
          setMode={setMode}
          handleClick={handleClick}
          isUser={username !== "" ? true : false}
          onClickLogout={handleLogout}
        />
      ) : null}
    </header>
  );
};

export default Header;

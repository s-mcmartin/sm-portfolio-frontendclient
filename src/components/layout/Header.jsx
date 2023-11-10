import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";
import { useState } from "react";
import { useThemeSwitch } from "../../hooks/useThemeSwitch";

const Header = () => {
  const [mode, setMode] = useThemeSwitch();
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => setIsOpen(!isOpen);

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

      <Navbar mode={mode} setMode={setMode} />
      {isOpen ? (
        <MobileNavbar mode={mode} setMode={setMode} handleClick={handleClick} />
      ) : null}
    </header>
  );
};

export default Header;

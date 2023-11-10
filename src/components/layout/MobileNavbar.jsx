import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";
import { MoonIcon, SunIcon } from "../icons/Icons";
import { useLocation, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

export const CustomMobileLink = ({ href, title, className = "", toggle }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = () => {
    toggle();
    navigate(href);
  };

  return (
    <button
      className={`${className} rounded relative group lg:text-light lg:dark:text-dark`}
      onClick={handleClick}
    >
      {title}
      <span
        className={`
            inline-block h-[1px] bg-dark absolute left-0 -bottom-0.5 
            group-hover:w-full transition-[width] ease duration-300 dark:bg-light
            ${pathname === href ? "w-full" : " w-0"} lg:bg-light lg:dark:bg-dark
            `}
      >
        &nbsp;
      </span>
    </button>
  );
};

const MobileNavbar = ({ mode, setMode, handleClick }) => {
  return (
    <motion.div
      className="min-w-[70vw] sm:min-w-[90vw] flex justify-between items-center flex-col fixed top-1/2 left-1/2 -translate-x-1/2
-translate-y-1/2
py-32 bg-dark/90 dark:bg-light/75 rounded-lg z-50 backdrop-blur-md
"
      initial={{ scale: 0, x: "-50%", y: "-50%", opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <nav className="flex items-center justify-center flex-col">
        <CustomMobileLink
          toggle={handleClick}
          className="mr-4 lg:m-0 lg:my-2"
          href="/"
          title="Home"
        />
        <CustomMobileLink
          toggle={handleClick}
          className="mx-4 lg:m-0 lg:my-2"
          href="/about"
          title="About"
        />
        <CustomMobileLink
          toggle={handleClick}
          className="mx-4 lg:m-0 lg:my-2"
          href="/projects"
          title="Projects"
        />
        <CustomMobileLink
          toggle={handleClick}
          className="ml-4 lg:m-0 lg:my-2"
          href="/contact"
          title="Contact"
        />
      </nav>
      <nav
        className="flex items-center justify-center  mt-2
"
      >
        <motion.a
          target={"_blank"}
          className="w-6 m-1 text-xl mx-3 rounded-full text-light dark:text-dark sm:mx-1"
          href="#"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Checkout my github profile"
        >
          <AiFillGithub />
        </motion.a>
        <motion.a
          target={"_blank"}
          className="w-6 m-1 mx-3 sm:mx-1 text-xl text-light dark:text-dark"
          href="#"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Checkout my linkedin profile"
        >
          <AiFillLinkedin />
        </motion.a>
        <motion.a
          target={"_blank"}
          className="w-6 m-1 mx-3 text-xl rounded-full sm:mx-1 text-light dark:text-dark"
          href="#"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Checkout my pinterest profile"
        >
          <AiFillMail />
        </motion.a>

        <button
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className={`w-6 h-6 ease m-1 ml-3 sm:mx-1 flex items-center justify-center rounded-full p-1  
  ${mode === "light" ? "bg-dark  text-light" : "bg-light  text-dark"}
  `}
          aria-label="theme-switcher"
        >
          {mode === "light" ? (
            <SunIcon className={"fill-dark"} />
          ) : (
            <MoonIcon className={"fill-dark"} />
          )}
        </button>
      </nav>
    </motion.div>
  );
};

export default MobileNavbar;

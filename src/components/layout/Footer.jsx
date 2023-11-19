import { SiMongodb, SiTailwindcss } from "react-icons/si";

import { FaReact } from "react-icons/fa";
import { Link } from "react-router-dom";
import MainSection from "./MainSection";
import { TbBrandFramer } from "react-icons/tb";

const Footer = () => {
  return (
    <footer
      className="w-full border-t-2 border-solid border-dark
   font-medium text-lg dark:text-light dark:border-light sm:text-base
   "
    >
      <MainSection className="py-8 flex items-center justify-between lg:flex-col lg:py-6">
        <span>{new Date().getFullYear()} &copy; Shannon McGuire</span>

        <Link to="/contact" className="underline underline-offset-2">
          Contact Me
        </Link>
        <p className="flex gap-2">
          Created with:
          <span className="flex justify-between items-center gap-2">
            <FaReact />
            <SiTailwindcss />
            <SiMongodb />
            <TbBrandFramer />
          </span>
        </p>
      </MainSection>
    </footer>
  );
};

export default Footer;

import { SiMongodb, SiTailwindcss } from "react-icons/si";

import AnimatedText from "../../animations/AnimatedText";
import { FaReact } from "react-icons/fa";
import { HireMe } from "./../../icons/HireMe";
import { Link } from "react-router-dom";
import { LinkArrow } from "../../icons/Icons";
import MainSection from "../../layout/MainSection";
import { TbBrandFramer } from "react-icons/tb";
import TransitionEffect from "../../transitions/TransitionEffect";
import profilePic from "../../../../public/assets/images/profile/computer photo (3).png";
import useTitle from "../../../hooks/useTitle";

const Home = () => {
  useTitle("SM_Portfolio: Home");
  return (
    <>
      <TransitionEffect />
      <article
        className={`flex  min-h-screen items-center text-dark dark:text-light sm:items-start`}
      >
        <MainSection className="!pt-0 md:!pt-16 sm:!pt-16">
          <div className="pt-12 flex w-full items-start justify-between md:flex-col">
            <div className="w-1/2 lg:inline-block lg:w-full">
              <img
                src={profilePic}
                alt="Shannon McGuire"
                className="h-auto w-full"
                sizes="100vw"
              />
            </div>
            <div className="flex w-1/2 flex-col items-center self-center lg:w-full lg:text-center pl-8">
              <AnimatedText
                text="Fullstack Portfolio"
                className="!text-left !leading-[6rem]"
              />
              <p className="flex justify-start items-center gap-2 w-full text-3xl lg:justify-center">
                <FaReact />
                <SiTailwindcss />
                <SiMongodb />
                <TbBrandFramer />
              </p>
              <p className="my-4 text-base font-medium md:text-sm sm:!text-xs">
                Hello there! I&apos;m{" "}
                <span className="font-semibold">Shannon McGuire</span>. This
                portfolio is a glimpse into my coding journey and showcases the
                skills I&apos;ve honed as a developer. I hope you find it
                enjoyable!
              </p>

              <div className="mt-2 flex items-center self-start lg:self-center">
                <a
                  // eslint-disable-next-line react/no-unknown-property
                  whileHover={{
                    cursor: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='48' viewport='0 0 100 100' style='font-size:24px;'><text y='50%'>👆</text></svg>"), auto`,
                  }}
                  href="/dummy.pdf"
                  target={"_blank"}
                  className={`flex items-center rounded-lg border-2 border-solid bg-dark p-2.5 px-6 text-lg font-semibold
       capitalize text-light hover:border-dark hover:bg-transparent hover:text-dark 
       dark:bg-light dark:text-dark dark:hover:border-light dark:hover:bg-dark dark:hover:text-light
       md:p-2 md:px-4 md:text-base
        `}
                  download
                >
                  Resume <LinkArrow className="ml-1 !w-6 md:!w-4" />
                </a>

                <Link
                  to="/contact"
                  className="ml-4 text-lg font-medium capitalize text-dark underline 
             dark:text-light md:text-base"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </MainSection>

        <HireMe />
      </article>
    </>
  );
};

export default Home;

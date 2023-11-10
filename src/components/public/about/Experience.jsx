import { motion, useScroll } from "framer-motion";

import AnimatedText from "../../animations/AnimatedText";
import LiIcon from "./../../icons/LiIcon";
import { useRef } from "react";

const Details = ({ position, company, companyLink, time, address, work }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-start justify-between md:w-[80%]"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">
          {position}{" "}
          <a
            className="capitalize text-primary dark:text-primaryDark"
            href={companyLink}
            target={"_blank"}
            rel="noreferrer"
          >
            @{company}
          </a>
        </h3>
        <span className="capitalize text-dark/75 font-medium dark:text-light/50 xs:text-sm">
          {time} | {address}
        </span>
        <p className="font-medium w-full md:text-sm"> {work}</p>
      </motion.div>
    </li>
  );
};

const Experience = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (
    <div className="sm:px-2">
      <AnimatedText text="Relevant Experience" />

      <div
        ref={ref}
        className="relative w-[75%] mx-auto lg:w-[90%] md:w-full mb-48"
      >
        <motion.div
          className="absolute left-9 top-0 w-[4px] md:w-[2px] md:left-[30px] xs:left-[20px] h-full bg-dark 
          origin-top  dark:bg-primaryDark dark:shadow-3xl"
          style={{ scaleY: scrollYProgress }}
        />
        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          <Details
            position="Teacher, 7th and 8th Math/Social Emotional Learning"
            company="The Expedition School"
            companyLink="https://google.com"
            time="2020-2021"
            address="Hillsborough, NC"
            work="Collaborated with a team to digitize curriculum and led professional training on integrating technology in the classroom, including fundamental coding on the Desmos platform."
          />

          <Details
            position="Front End Supervisor / Marketing Manager"
            company="The Crooked Wood"
            companyLink="https://facebook.com"
            time="2019"
            address="Tarpon Springs, FL"
            work="Assisted in developing a new restaurant business from ground-up, including designing website and all digital marketing materials."
          />
        </ul>
      </div>
    </div>
  );
};

export default Experience;

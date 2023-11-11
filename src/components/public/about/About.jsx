import AnimatedText from "../../animations/AnimatedText";
import Bio from "./Bio";
import Courses from "./Courses";
import Experience from "./Experience";
import MainSection from "../../layout/MainSection";
import NumberSummary from "./NumberSummary";
import React from "react";
import Skills from "./Skills";
import TransitionEffect from "../../transitions/TransitionEffect";
import useTitle from "../../../hooks/useTitle";

const About = () => {
  useTitle("SM_Portfolio: About Me");

  return (
    <>
      <TransitionEffect />
      <main
        className={`flex w-full flex-col items-center justify-center dark:text-light`}
      >
        <MainSection className="pt-16 xs:px-0">
          <AnimatedText text="About Me" />
          <Bio />
          <NumberSummary />
          <Skills />
          <Courses />
          <Experience />
        </MainSection>
      </main>
    </>
  );
};

export default About;

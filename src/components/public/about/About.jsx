import AnimatedText from "../../animations/AnimatedText";
import Bio from "./Bio";
import Courses from "./Courses";
import Error from "../../layout/Error";
import Experience from "./Experience";
import Loading from "../../layout/Loading";
import MainSection from "../../layout/MainSection";
import NumberSummary from "./NumberSummary";
import { PulseLoader } from "react-spinners";
import React from "react";
import Skills from "./Skills";
import TransitionEffect from "../../transitions/TransitionEffect";
import { contactsApiSlice } from "./../../../features/contacts/contactsApiSlice";
import { useGetCoursesQuery } from "../../../features/courses/coursesApiSlice";
import useTitle from "../../../hooks/useTitle";

const About = () => {
  useTitle("SM_Portfolio: About Me");
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoursesQuery();
  let content;
  if (isLoading) content = <Loading />;
  if (isError) content = <Error content={error.error} />;
  if (isSuccess) {
    const { ids, entities } = courses;
    const featuredCourses = ids.filter(
      (courseId) => entities[courseId].featured === true
    );
    const coursesArray = ids.map((courseId) => entities[courseId]);
    console.log("FEATURED", featuredCourses);
    console.log(coursesArray);
    content = (
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
  }
  return content;
};

export default About;

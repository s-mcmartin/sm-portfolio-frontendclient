import Bio from "./Bio";
import Courses2 from "./Courses2";
import Experience from "./Experience";
import MainSection from "../../layout/MainSection";
import NumberSummary from "./NumberSummary";
import { PulseLoader } from "react-spinners";
import React from "react";
import Skills from "./Skills";
import TransitionEffect from "../../transitions/TransitionEffect";
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
  if (isLoading) content = <PulseLoader />;
  if (isError) content = <p>{error.data?.message}</p>;
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
            <Bio />
            <NumberSummary />
            <Skills />
            <Courses2 />
            <Experience />
          </MainSection>
        </main>
      </>
    );
  }
  return content;
};

export default About;

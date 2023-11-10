import { PulseLoader } from "react-spinners";
import React from "react";
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
    content = (
      <>
        {coursesArray.map((course) => (
          <p key={course._id}>{course.name}</p>
        ))}
      </>
    );
  }
  return content;
};

export default About;

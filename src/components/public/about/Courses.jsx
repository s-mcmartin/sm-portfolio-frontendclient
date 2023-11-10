import { PulseLoader, RingLoader } from "react-spinners";
import { easeInOut, motion } from "framer-motion";

import AnimatedText from "../../animations/AnimatedText";
import FeaturedCourses from "./FeaturedCourses";
import { useGetCoursesQuery } from "../../../features/courses/coursesApiSlice";
import { useState } from "react";

const CourseCard = ({ course }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  return (
    <div className="w-full h-full">
      <div
        className="flip-card w-full aspect-video relative"
        onClick={handleFlip}
      >
        <motion.div
          className="flip-card-inner w-full h-full"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 360 }}
          transition={{ duration: 0.6, animationDirection: "normal" }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          <div className="w-full h-full flip-card-front shadow-sm shadow-black p-1">
            <a
              href="#"
              className="text-xs leading-snug font-semibold dark:text-light hover:dark:text-primaryDark"
            >
              {course.name}
            </a>
            <button className="w-fit h-1/5 absolute bottom-0 text-[0.5rem] right-1 hover:underline">
              More...
            </button>
          </div>
          <div className="w-full h-full flip-card-back bg-dark/90">
            <p className="text-[0.25rem] text-light/90 italic mb-2 p-1">
              {course.description}
            </p>

            <button className="w-fit h-1/5 absolute bottom-0 text-[0.5rem] right-1 hover:underline text-light/90">
              Back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const CourseList = ({ org, index, courses }) => {
  const courseList = courses?.filter((course) => course.organization === org);

  return (
    <div
      key={`${org} + ${index}`}
      className={`flex flex-col flex-wrap gap-2 mx-4 w-full ${
        courseList.length > 3 ? "row-span-3" : null
      }`}
    >
      <motion.h2
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full text-2xl font-bold text-dark/75 dark:text-light/75"
      >
        {org}
      </motion.h2>
      <motion.div
        className="w-full my-1 h-[1px] border-b border-primary dark:border-primaryDark mb-2"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 0.75, ease: easeInOut, delay: 0.1 }}
      >
        &nbsp;
      </motion.div>
      <motion.ul
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={`mb-8 relative space-y-2`}
      >
        {courseList.map((course) => (
          <li
            key={course._id}
            className="text-xl lg:text-md text-dark/75 font-medium hover:text-primary cursor-pointer hover:dark:text-primaryDark dark:text-light"
          >
            {course.name}
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

const Courses = () => {
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoursesQuery("coursesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  isLoading && <PulseLoader />;
  isError && <p>{error.data?.message}</p>;
  if (isSuccess) {
    const { ids, entities } = courses;

    const courseList = ids.map((courseId) => entities[courseId]);

    const orgList = [];
    courseList.map((course) =>
      !orgList.includes(course.organization)
        ? orgList.push(course.organization)
        : null
    );

    // console.log(orgList);
    return (
      <div className="mt-8 sm:px-2">
        <AnimatedText text="Education" className="mb-12" />
        <FeaturedCourses courses={courseList} />
        <AnimatedText text="Other Relevant Courses" className=" my-16" />
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-1 md:grid-cols-2 sm:px-2">
          {orgList.map((org, i) => (
            <CourseList
              key={`${org} + ${i}`}
              org={org}
              index={i}
              courses={courseList}
            />
          ))}
        </div>
      </div>
    );
  }
};
export default Courses;

import { animate, motion, stagger } from "framer-motion";

import AnimatedText from "../../animations/AnimatedText";
import AnimatedUnderline from "../../animations/AnimatedUnderline";
import Error from "../../layout/Error";
import Loading from "../../layout/Loading";
import { PulseLoader } from "react-spinners";
import { useGetProjectsQuery } from "../../../features/projects/projectsApiSlice";

const Skills = () => {
  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProjectsQuery("projectsList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const strengths = [
    "HTML",
    "CSS",
    "Sass",
    "TailwindCSS",
    "JavaScript",
    "React",
  ];

  isLoading && <Loading />;
  isError && <Error text={error.error} />;
  if (isSuccess) {
    const { ids, entities } = projects;
    const techArray = [];
    ids.map((projectId) =>
      entities[projectId].tech.map((projectTechArray) =>
        !techArray.includes(projectTechArray)
          ? techArray.push(projectTechArray)
          : null
      )
    );

    return (
      <>
        <AnimatedText text="Skills" />
        <div className="flex justify-center  items-center mb-8">
          <motion.ul
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{
              when: "beforeChildren",
              duration: 0.5,
              type: "spring",
              staggerChildren: 0.2,
            }}
            className="p-4 flex flex-wrap justify-center gap-6 m-2 mb-12"
          >
            {strengths.map((strength) => (
              <motion.li
                initial={{ x: -100 }}
                whileInView={{ x: 0 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                }}
                key={strength}
                className="text-3xl w-fit dark:text-dark text-light font-semibold p-1 px-2 shadow-md shadow-dark bg-primary dark:bg-primaryDark"
              >
                {strength}
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <motion.h2
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-full text-4xl font-bold uppercase text-dark/75 dark:text-light/75"
        >
          More tools, languages and libraries:
        </motion.h2>
        <AnimatedUnderline />
        <motion.ul
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="list-none flex flex-wrap text-dark/75 dark:text-light/75 gap-1 md:w-full"
        >
          {techArray.map((tool) => (
            <li key={tool} className="px-2 text-2xl">
              {tool}
            </li>
          ))}
        </motion.ul>
      </>
    );
  }
};

export default Skills;

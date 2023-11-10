import AnimatedText from "../../animations/AnimatedText";
import AnimatedUnderline from "../../animations/AnimatedUnderline";
import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";
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

  isLoading && <PulseLoader />;
  isError && <p>{error.data?.message}</p>;
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
    console.log(techArray);
    return (
      <>
        <AnimatedText text="Skills" />
        <h2 className="font-bold text-3xl mb-2">Strengths</h2>
        <motion.ul
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="bg-primary dark:bg-primaryDark  shadow-lg shadow-black p-4 grid grid-cols-3  sm:grid-cols-2 rounded-lg m-2 mb-12"
        >
          {strengths.map((strength) => (
            <li
              key={strength}
              className="text-xl dark:text-dark text-light font-semibold p-1"
            >
              {strength}
            </li>
          ))}
        </motion.ul>
        <motion.h2
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-full text-lg font-bold uppercase text-dark/75 dark:text-light/75"
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
            <li key={tool} className="px-2 text-lg">
              {tool}
            </li>
          ))}
        </motion.ul>
      </>
    );
  }
};

export default Skills;

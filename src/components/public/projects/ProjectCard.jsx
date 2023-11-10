import { AiFillCaretDown, AiFillCaretUp, AiTwotoneStar } from "react-icons/ai";

import { AiFillGithub } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { easeInOut } from "framer-motion";
import { motion } from "framer-motion";
import { useGetProjectsQuery } from "../../../features/projects/projectsApiSlice";
import { useState } from "react";

const ProjectCard = ({ projectId }) => {
  const { project } = useGetProjectsQuery("projectsList", {
    selectFromResult: ({ data }) => ({ project: data?.entities[projectId] }),
  });
  const [expanded, setExpanded] = useState(null);
  const cardVariants = {
    expanded: {
      height: "100%",
    },
    collapsed: {
      height: "25%",
    },
  };
  return (
    <article
      key={project._id}
      className="bg-white relative w-full aspect-video shadow-md shadow-black rounded-lg bg-contain overflow-hidden"
      style={{ backgroundImage: `url(${project.image})` }}
    >
      {project.featured === "true" && (
        <div className="absolute top-2 right-2 text-yellow-300 bg-black/50 p-1 shadow-md shadow-black rounded-full">
          <AiTwotoneStar />
        </div>
      )}
      <motion.div
        className={`absolute bottom-0 w-full bg-dark/90 text-light h-1/4 flex flex-col items-center justify-center z-10 rounded-b-lg cursor-pointer ${
          expanded ? "justify-between p-1" : null
        }`}
        variants={cardVariants}
        initial="collapsed"
        animate={`${expanded ? "expanded" : "collapsed"}`}
        transition={{ duration: 0.5, ease: easeInOut }}
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="w-full flex item-center justify-center gap-2 text-2xl">
          {project?.name}{" "}
          <span className="flex items-center">
            {expanded ? (
              <AiFillCaretDown className="hover:text-primary" />
            ) : (
              <AiFillCaretUp className="hover:text-primary" />
            )}
          </span>
        </h2>
        {expanded && (
          <p className="text-lg italic text-light/80 grow lg:text-md">
            {project?.description}
          </p>
        )}
        {expanded && (
          <div className="flex justify-center items-center gap-2">
            <a href={project?.github}>
              <AiFillGithub className="w-6 h-6 hover:text-primary hover:scale-110" />
            </a>
            <a href={project?.website}>
              <FiExternalLink className="w-6 h-6 hover:text-primary hover:scale-110" />
            </a>
          </div>
        )}
      </motion.div>
    </article>
  );
};

export default ProjectCard;

import { AiFillCaretDown, AiFillCaretUp, AiFillGithub } from "react-icons/ai";
import { FiExternalLink, FiGlobe } from "react-icons/fi";
import React, { useState } from "react";
import { easeInOut, motion } from "framer-motion";

import { useGetProjectsQuery } from "../../../features/projects/projectsApiSlice";

const DetailCard = ({ projectId }) => {
  const { project } = useGetProjectsQuery("projectsList", {
    selectFromResult: ({ data }) => ({ project: data?.entities[projectId] }),
  });
  const [expanded, setExpanded] = useState(false);

  const cardVariants = {
    expanded: {
      height: "100%",
    },
    collapsed: {
      height: "25%",
    },
  };
  return (
    <motion.div
      className={`rounded-b-xl w-full h-1/4 absolute bottom-0 left-0 bg-dark/90 flex flex-col justify-center items-center overflow-auto ${
        expanded ? "justify-between rounded-xl px-8" : "justify-center"
      }`}
      variants={cardVariants}
      initial="collapsed"
      animate={`${expanded ? "expanded" : "collapsed"}`}
      transition={{ duration: 1, ease: easeInOut }}
      onClick={() => setExpanded(!expanded)}
    >
      {expanded && (
        <div className="w-fit h-12 my-1 justify-end flex items-center self-end lg:h-8">
          <a href={project?.github}>
            <AiFillGithub className="w-[2.5rem] h-[2.5rem] sm:w-[1.5rem] sm:h-[1.5rem] mr-4 text-light hover:text-primary cursor-pointer hover:scale-110" />
          </a>
          <a href={project?.website}>
            <FiGlobe className="w-[2.5rem] h-[2.5rem]  sm:w-[1.5rem] sm:h-[1.5rem] mr-4 text-light hover:text-primary cursor-pointer hover:scale-110" />
          </a>
        </div>
      )}
      <h1
        className={`flex items-center justify-center gap-4 text-center text-light w-full text-3xl h-fit lg:text-xl`}
        transition={{ duration: 0.5, ease: easeInOut }}
      >
        {project?.name}
        <span className="flex items-center">
          {expanded ? (
            <AiFillCaretDown className="hover:text-primary cursor-pointer" />
          ) : (
            <AiFillCaretUp className="hover:text-primary cursor-pointer" />
          )}
        </span>
      </h1>
      {expanded && (
        <p className="text-light/80 italic grow mt-2 text-xl lg:text-lg mb-2">
          {project?.description}
        </p>
      )}
      {expanded && (
        <div className="flex flex-wrap">
          {project?.tech.map((tool) => (
            <span className="h-fit w-fit px-1 py-0.25 text-dark bg-light text-lg mr-2 mb-8 flex-wrap lg:text-sm lg:mb-2">
              {tool}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default DetailCard;

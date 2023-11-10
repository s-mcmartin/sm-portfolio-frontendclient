import React from "react";
import { motion } from "framer-motion";

const quote = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const singleWord = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

const AnimatedText = ({ text, className = "" }) => {
  return (
    <div
      className="py-2 my-12 w-full mx-auto flex flex-col items-center justify-center  text-center  
   overflow-hidden sm:py-0"
    >
      <motion.h1
        className={`inline-block text-dark dark:text-light
     text-clampTitle font-bold w-full capitalize  ${className}`}
        variants={quote}
        initial="hidden"
        animate="visible"
      >
        {text.split(" ").map((char, index) => {
          return (
            <motion.span
              className="inline-block"
              key={char + "-" + index}
              variants={singleWord}
            >
              {char}&nbsp;
            </motion.span>
          );
        })}
      </motion.h1>
    </div>
  );
};

export default AnimatedText;

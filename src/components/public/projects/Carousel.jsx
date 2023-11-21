"use client";

import { AnimatePresence, easeInOut, motion } from "framer-motion";

import { AiFillGithub } from "react-icons/ai";
import CarouselControls from "./CarouselControls";
import DetailCard from "./DetailCard";
import { FiGlobe } from "react-icons/fi";
import TransitionEffect from "../../transitions/TransitionEffect";
import { useState } from "react";

const Carousel = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === projects.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setDirection("left");

    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  const slideVariants = {
    hiddenRight: {
      x: "100%",
    },
    hiddenLeft: {
      x: "-100%",
    },
    visible: {
      x: "0",

      transition: {
        duration: 0.75,
        ease: easeInOut,
      },
    },
  };

  return (
    <AnimatePresence>
      <div className="my-16 h-fit w-full flex justify-center items-center flex-col">
        <div className="flex relative justify-center items-center gap-x-4 sm:flex-col sm:h-fit sm:mt-8">
          <div className="my-auto relative rounded-[10px] h-full min-w-[500px] lg:min-w-[350px] md:hidden">
            <TransitionEffect />
            <motion.div
              className="w-[99%] md:aspect-square aspect-video rounded-xl shadow-2xl shadow-dark bg-no-repeat bg-cover bg-center"
              key={currentIndex}
              initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
              animate="visible"
              variants={slideVariants}
              style={{
                backgroundImage: `url(${
                  projects[
                    currentIndex > 0 ? currentIndex - 1 : projects.length - 1
                  ].image
                })`,
              }}
            >
              <DetailCard
                projectId={
                  projects[
                    `${
                      currentIndex > 0 ? currentIndex - 1 : projects.length - 1
                    }`
                  ].id
                }
              />
            </motion.div>
          </div>
          <div className="relative rounded-[10px] md:aspect-square aspect-video w-[45vw] m-auto overflow-hidden sm:mb-0 md:w-[80vw]  sm:justify-self-start">
            <AnimatePresence>
              <TransitionEffect />
              <motion.div
                className={`w-[99%] md:aspect-square aspect-video rounded-xl shadow-2xl shadow-dark bg-no-repeat bg-cover ${
                  currentIndex === 5 || currentIndex === 6 ? "bg-center" : null
                }`}
                key={currentIndex}
                initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
                animate="visible"
                variants={slideVariants}
                style={{
                  backgroundImage: `url(${projects[currentIndex].image})`,
                }}
              >
                <div className="absolute top-2 right-2 shadow-sm shadow-black flex gap-2 bg-primary rounded-md py-1 px-2 place-items-center dark:bg-primaryDark dark:text-dark">
                  {projects[currentIndex].github ? (
                    <a href={projects[currentIndex].github}>
                      <AiFillGithub className="w-6 h-6 hover:text-light hover:scale-110" />
                    </a>
                  ) : null}
                  {projects[currentIndex].website ? (
                    <a href={projects[currentIndex].website}>
                      <FiGlobe className="w-6 h-6 hover:text-light hover:scale-110" />
                    </a>
                  ) : null}
                </div>
                <DetailCard projectId={projects[currentIndex].id} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="my-auto relative rounded-[10px] h-full min-w-[500px] lg:min-w-[350px] md:hidden">
            <AnimatePresence>
              <TransitionEffect />
              <motion.div
                className="w-[99%] md:aspect-square aspect-video rounded-xl shadow-2xl shadow-dark bg-no-repeat bg-cover"
                key={currentIndex}
                src={projects[currentIndex].image}
                initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
                animate="visible"
                variants={slideVariants}
                style={{
                  backgroundImage: `url(${
                    projects[
                      currentIndex + 1 === projects.length
                        ? 0
                        : currentIndex + 1
                    ].image
                  })`,
                }}
              >
                <DetailCard
                  projectId={
                    projects[
                      `${
                        currentIndex + 1 === projects.length
                          ? 0
                          : currentIndex + 1
                      }`
                    ].id
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <CarouselControls
          handleNext={handleNext}
          handleDotClick={handleDotClick}
          handlePrevious={handlePrevious}
          currentIndex={currentIndex}
          projects={projects}
        />
      </div>
    </AnimatePresence>
  );
};
export default Carousel;

"use client";

import { AnimatePresence, easeInOut, motion } from "framer-motion";

import CarouselControls from "./CarouselControls";
import DetailCard from "./DetailCard";
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
              className="w-[99%] aspect-video rounded-xl shadow-2xl shadow-dark bg-no-repeat bg-cover"
              key={currentIndex}
              src={projects[currentIndex].image}
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
                project={
                  projects[
                    `${
                      currentIndex > 0 ? currentIndex - 1 : projects.length - 1
                    }`
                  ]
                }
              />
            </motion.div>
          </div>
          <div className="relative rounded-[10px] aspect-video w-[45vw] m-auto overflow-hidden sm:mb-0 md:w-[80vw] sm:h-[60vh] sm:justify-self-start">
            <AnimatePresence>
              <TransitionEffect />
              <motion.div
                className="w-[99%] h-[99%] rounded-xl shadow-2xl shadow-dark overflow-hidden bg-no-repeat bg-cover"
                key={currentIndex}
                src={projects[currentIndex].image}
                initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
                animate="visible"
                variants={slideVariants}
                style={{
                  backgroundImage: `url(${projects[currentIndex].image})`,
                }}
              >
                <DetailCard project={projects[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="my-auto relative rounded-[10px] h-full min-w-[500px] lg:min-w-[350px] md:hidden">
            <AnimatePresence>
              <TransitionEffect />
              <motion.div
                className="w-[99%] aspect-video rounded-xl shadow-2xl shadow-dark bg-no-repeat bg-cover"
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
                  project={
                    projects[
                      `${
                        currentIndex + 1 === projects.length
                          ? 0
                          : currentIndex + 1
                      }`
                    ]
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

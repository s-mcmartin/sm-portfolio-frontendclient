import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";

const CarouselControls = ({
  projects,
  handlePrevious,
  handleNext,
  currentIndex,
  handleDotClick,
}) => {
  const slidersVariants = {
    hover: {
      scale: 1.2,
      backgroundColor: "rgba(0,188,227, 1)",
    },
  };
  const dotsVariants = {
    initial: {
      y: 0,
    },
    animate: {
      y: -10,
      scale: 1.2,
      transition: { type: "spring", stiffness: 1000, damping: "10" },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };
  return (
    <AnimatePresence>
      <div className="mt-[25px] flex justify-center gap-[20px]">
        <motion.div
          variants={slidersVariants}
          whileHover="hover"
          className="bg-primaryDark/75 text-white flex items-center justify-center mx-[10px] my-auto rounded-full h-[30px] w-[30px] cursor-pointer"
          onClick={handlePrevious}
        >
          <AiOutlineLeft />
        </motion.div>

        {projects.map((_, index) => (
          <motion.div
            key={index}
            className={`bg-[#333] w-[10px] h-[10px] rounded-[50%] ${
              currentIndex === index ? "bg-primaryDark" : ""
            }`}
            onClick={() => handleDotClick(index)}
            initial="initial"
            animate={currentIndex === index ? "animate" : ""}
            whileHover="hover"
            variants={dotsVariants}
          ></motion.div>
        ))}
        <motion.div
          variants={slidersVariants}
          whileHover="hover"
          className="bg-primaryDark/75 text-white flex items-center justify-center mx-[10px] my-auto rounded-full h-[30px] w-[30px] cursor-pointer"
          onClick={handleNext}
        >
          <AiOutlineRight />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CarouselControls;

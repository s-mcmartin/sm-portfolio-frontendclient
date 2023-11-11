import { motion } from "framer-motion";
import { useState } from "react";

const CourseFeatureCard = ({ course }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  return (
    <div className="w-full h-full lg:w-3/5 md:aspect-auto">
      <div
        className="flip-card w-full aspect-square relative  md:min-h-[400px]"
        onClick={handleFlip}
      >
        <motion.div
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flip-card w-full aspect-square md:aspect-video h-full md:rounded-lg relative"
          id={course?.name}
        >
          <motion.div
            className="flip-card-inner w-full h-full"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 360 }}
            transition={{
              duration: 0.6,
              animationDirection: "normal",
              type: "spring",
            }}
            onAnimationComplete={() => setIsAnimating(false)}
          >
            <div className="w-full h-full flip-card-front shadow-sm shadow-black p-2 flex flex-col justify-center items-center space-y-2 rounded-lg bg-dark text-light dark:text-dark dark:bg-light">
              <a
                href="_blank"
                className="text-3xl leading-snug font-semibold hover:underline text-center xs:text-lg subpixel-antialiased"
              >
                {course?.name}
              </a>
              <h2 className="hover:underline cursor-pointer xs:text-sm text-2xl subpixel-antialiased">
                {course?.organization}
              </h2>
              <h2 className="hover:underline cursor-pointer xs:text-sm text-2xl subpixel-antialiased">
                {course?.instructor}
              </h2>
            </div>
            <button
              className="w-fit p-2 bg-primary rounded-lg text-light shadow-md hover:border hover:border-dark hover:bg-light hover:text-dark h-fit absolute bottom-1 text-2xl right-2 hover:underline md:text-lg dark:bg-primaryDark dark:text-dark"
              value={course?.name}
              onClick={handleFlip}
            >
              Topics &rarr;
            </button>

            <div className="w-full h-full flip-card-back shadow-sm shadow-black p-2 flex flex-col justify-start space-y-2 rounded-lg bg-dark text-light overflow-auto dark:bg-light dark:text-dark">
              <p className="text-2xl text-light dark:text-dark italic px-2 pt-6 subpixel-antialiased">
                Topics covered in this course:
              </p>
              <ul className="p-2 flex flex-wrap subpixel-antialiased">
                {course?.tech?.map((tool) => (
                  <li
                    key={tool}
                    className="text-light dark:text-dark mx-1 text-lg antialiased"
                  >
                    * {tool}
                  </li>
                ))}
              </ul>

              <button
                className="w-fit p-2 h-fit bg-primary rounded-lg text-light shadow-md hover:border hover:border-dark hover:bg-light hover:text-dark fixed bottom-1 text-2xl right-2 hover:underline md:text-lg dark:bg-primaryDark dark:text-dark"
                value={course?.name}
                onClick={handleFlip}
              >
                Back
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const FeaturedCourses = ({ courses }) => {
  const featuredCourses = courses?.filter((course) => course?.featured);

  return (
    <div className="flex justify-center flex-wrap">
      <article className="flex justify-center mb-12">
        <motion.div
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="flex justify-between text-xl gap-4 w-full lg:flex-col"
        >
          <h3 className="font-bold text-2xl">BA, Psychology</h3>
          <span className="text-2xl">Saint Leo University | Dade City, FL</span>
          <span className="italic text-2xl">Magna Cum Laude</span>
        </motion.div>
      </article>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-col w-full lg:items-center lg:gap-x-0">
        {featuredCourses?.map((course) => (
          <CourseFeatureCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};
export default FeaturedCourses;

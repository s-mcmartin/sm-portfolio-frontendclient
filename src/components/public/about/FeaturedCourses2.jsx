import FeaturedCourseCard from "./FeaturedCourseCard";
import { motion } from "framer-motion";

const FeaturedCourses2 = ({ courses }) => {
  const featuredCourseList = courses?.filter((course) => course?.featured);

  return (
    <>
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
      <div className="grid grid-cols-2 w-full md:flex md:flex-col justify-center items-start mt-24 gap-y-2 text-center gap-x-4">
        {featuredCourseList?.map((course) => (
          <FeaturedCourseCard key={course.id} courseId={course.id} />
        ))}
      </div>
    </>
  );
};

export default FeaturedCourses2;

import { easeInOut, motion } from "framer-motion";

const AnimatedUnderline = () => {
  return (
    <motion.div
      className="col-span-6 my-2 h-[1px] border-b border-primary dark:border-primaryDark"
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      transition={{ duration: 0.5, ease: easeInOut, delay: 0.25 }}
    >
      &nbsp;
    </motion.div>
  );
};

export default AnimatedUnderline;

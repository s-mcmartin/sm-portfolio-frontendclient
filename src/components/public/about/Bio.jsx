import AnimatedUnderline from "../../transitions/AnimatedUnderline";
import React from "react";
import { motion } from "framer-motion";
import profile from "../../../assets/images/profile/Me.png";

const Bio = () => {
  return (
    <>
      {/* <motion.h2
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full text-2xl font-bold uppercase text-dark/75 dark:text-light/75"
      >
        Profile
      </motion.h2>
      <AnimatedUnderline /> */}
      <div className="w-full grid grid-cols-3 gap-4 justify-start md:flex md:flex-col">
        <motion.div
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-full max-h-full bg-contain bg-no-repeat bg-y-0"
          style={{ backgroundImage: `url(` + profile + `)` }}
        ></motion.div>
        <div className="col-span-2 md:w-full">
          <motion.ul
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex flex-wrap gap-x-4 text-xl p-2"
          >
            <li>👩‍💻 Hello, I'm Shannon!</li>
            <li>🌐 Self-Taught Web Developer</li>
            <li>🧠 BA in Psychology turned Coding Enthusiast</li>
            <li>👩‍🏫 Former Teacher & Curriculum Digitizer</li>
            <li>🚀 Transitioning into a New Career</li>
            <li> 🌟 Passionate about Coding & Education</li>
          </motion.ul>

          <AnimatedUnderline />
          <motion.p
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mt-4 text-2xl"
          >
            Welcome to my corner of the internet! I started my journey with a
            psychology degree, ventured into education, and found my true
            passion in web development. Through teaching and curriculum
            digitization to leading professional development training on
            integrating these technologies in the classroom, I discovered the
            magic of coding. Now, I'm embarking on a new adventure in the world
            of web development. Join me as I explore this exciting path, one
            line of code at a time. 💻✨
          </motion.p>
        </div>
      </div>
    </>
  );
};

export default Bio;

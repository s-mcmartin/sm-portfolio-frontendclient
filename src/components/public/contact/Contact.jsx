import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";

import AnimatedText from "../../animations/AnimatedText";
import ContactForm from "./ContactForm";
import MainSection from "../../layout/MainSection";
import SuccessMessage from "./SuccessMessage";
import TransitionEffect from "../../transitions/TransitionEffect";
import { motion } from "framer-motion";
import { useState } from "react";
import useTitle from "../../../hooks/useTitle";

const Contact = () => {
  useTitle("SM_Portfolio: Contact Page");
  const [showSuccess, setShowSuccess] = useState(false);
  console.log(showSuccess);
  const handleToggleSuccess = () => {
    setShowSuccess((prev) => !prev);
  };

  return (
    <>
      <TransitionEffect />
      <main
        className={`mb-16 flex w-full flex-col items-center justify-center dark:text-light`}
      >
        <MainSection className="pt-16">
          <section className="flex items-start justify-center gap-8 md:flex-col md:justify-center md:items-center">
            <div className="w-1/2 flex-col items-center mx-auto md:w-full">
              <AnimatedText
                text={"Looking forward to hearing from you!"}
                className="!text-7xl"
              />
              <div className="w-[90%] flex items-center justify-evenly text-5xl mt-8 ">
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://github.com/s-mcmartin"
                  aria-label="Checkout my github profile"
                >
                  <AiFillGithub className="hover:text-primary dark:hover:text-primaryDark cursor-pointer" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href="http://www.linkedin.com/in/shannon-mcguire-294647231"
                  aria-label="Checkout my linkedIn profile"
                >
                  <AiFillLinkedin className="hover:text-primary dark:hover:text-primaryDark cursor-pointer" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href="mailto:shannoncmcguire85@gmail.com"
                  aria-label="Email me"
                >
                  <AiFillMail className="hover:text-primary dark:hover:text-primaryDark cursor-pointer" />
                </motion.a>
              </div>
            </div>
            <div className="w-1/2 h-fit shadow-lg p-4 shadow-black rounded-lg  md:w-full md:mx-8 bg-dark/90 text-dark/75 dark:bg-light/90 dark:text-light">
              {!showSuccess ? (
                <ContactForm handleToggleSuccess={handleToggleSuccess} />
              ) : (
                <SuccessMessage handleToggleSuccess={handleToggleSuccess} />
              )}
            </div>
          </section>
        </MainSection>
      </main>
    </>
  );
};

export default Contact;

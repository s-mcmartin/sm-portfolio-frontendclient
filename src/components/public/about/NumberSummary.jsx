import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

import React from "react";

function AnimatedNumberFramerMotion({ value, text }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 3000 });
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, value, isInView]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current && latest.toFixed(0) <= value) {
          ref.current.textContent = latest.toFixed(0);
        }
      }),
    [springValue, value]
  );
  return (
    <div className="flex flex-col items-center justify-center xl:items-center">
      <span className="inline-block font-bold text-clampTitle">
        <span ref={ref} className="text-clampTitle" />+
      </span>
      <h2
        className="mb-4 text-xl font-medium capitalize text-dark/75 dark:text-light/75 
  xl:text-center md:text-lg sm:text-base xs:text-sm"
      >
        {text}
      </h2>
    </div>
  );
}

const NumberSummary = () => {
  return (
    <div className="w-full flex items-center justify-between mt-16  sm:px-2 md:flex-col">
      <AnimatedNumberFramerMotion value={15} text="courses completed" />
      <AnimatedNumberFramerMotion value={20} text="projects completed" />
      <AnimatedNumberFramerMotion value={1} text="years of experience" />
    </div>
  );
};

export default NumberSummary;

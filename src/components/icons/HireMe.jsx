import { CircularText } from "./Icons";

import React from "react";

export const HireMe = () => {
  return (
    <div
      className="fixed left-4 bottom-4 flex flex-col items-center justify-center lg:right-8 sm:right-0 
   overflow-hidden lg:bottom-auto lg:left-auto lg:top-0 lg:absolute z-20"
    >
      <div className="w-48 h-auto flex items-center justify-center relative lg:w-24">
        <CircularText
          className={"fill-dark dark:fill-light animate-spin-slow duration-200"}
        />
        <a
          href="mailto:shannoncmcguire85@gmail.com"
          className="flex items-center justify-center absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] shadow-lg border border-solid
bg-dark rounded-full text-white w-20 h-20 font-semibold hover:bg-light hover:border-dark hover:text-dark dark:text-dark dark:bg-light dark:hover:bg-dark
dark:hover:text-light dark:hover:border-light dark:shadow-light/25 lg:w-12 lg:h-12 lg:text-[10px]
"
        >
          Hire Me
        </a>
      </div>
    </div>
  );
};

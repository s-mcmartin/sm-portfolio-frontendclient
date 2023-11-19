import MainSection from "./MainSection";
import { PulseLoader } from "react-spinners";
import React from "react";

const Loading = () => {
  return (
    <MainSection>
      <div className="w-full flex flex-wrap justify-start items-start">
        <div className="w-full h-fit justify-start items-center flex flex-col mt-56 text-center">
          <h2 className="text-3xl font-bold w-full dark:text-light text-dark text-center mb-4">
            Please wait just a moment. Your content is loading.
          </h2>
          <PulseLoader />
        </div>
      </div>
    </MainSection>
  );
};

export default Loading;

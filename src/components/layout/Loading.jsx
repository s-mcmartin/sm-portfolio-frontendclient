import MainSection from "./MainSection";
import { PulseLoader } from "react-spinners";
import React from "react";

const Loading = () => {
  return (
    <MainSection>
      <div className="w-full min-h-screen flex flex-wrap justify-center items-center">
        <div className="w-full h-fit justify-start items-center flex flex-col mt-56">
          <h2 className="text-3xl font-bold w-full dark:text-light text-dark">
            Please wait just a moment. Your content is loading.
          </h2>
          <PulseLoader />
        </div>
      </div>
    </MainSection>
  );
};

export default Loading;

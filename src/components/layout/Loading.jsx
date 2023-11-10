import MainSection from "./MainSection";
import { PulseLoader } from "react-spinners";
import React from "react";

const Loading = () => {
  return (
    <MainSection>
      <div className="w-full h-full flex flex-wrap justify-center items-center">
        <h2 className="text-3xl font-bold">
          Please wait just a moment. Your content is loading.
        </h2>
        <PulseLoader />
      </div>
    </MainSection>
  );
};

export default Loading;

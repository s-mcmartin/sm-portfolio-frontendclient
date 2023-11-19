import AnimatedText from "../animations/AnimatedText";
import React from "react";
import { useNavigate } from "react-router-dom";

const TableHeading = ({ text, type }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center flex-col p-8 ">
      <div className="w-fit flex flex-wrap justify-center items-center space-x-4">
        <AnimatedText text={text} className="!text-4xl text-center" />
      </div>
      <button
        className="p-4 bg-green-400 rounded-full text-xl w-fit"
        onClick={() => navigate("/admin/users/new")}
      >
        Add New {type}
      </button>
    </div>
  );
};

export default TableHeading;

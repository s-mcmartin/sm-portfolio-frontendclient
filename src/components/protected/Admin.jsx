import AnimatedText from "../animations/AnimatedText";
import Course from "../../features/courses/Course";
import MainSection from "../layout/MainSection";
import React from "react";
import Table from "./Table";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const Admin = () => {
  useTitle("SM_Portfolio: Admin");

  const { username } = useAuth();
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  return (
    <MainSection>
      <p className="text-3xl text-dark dark:text-light">{today}</p>
      <AnimatedText text={`Welcome ${username}!`} />
    </MainSection>
  );
};

export default Admin;

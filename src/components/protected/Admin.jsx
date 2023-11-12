import AnimatedText from "../animations/AnimatedText";
import MainSection from "../layout/MainSection";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const Admin = () => {
  useTitle("SM_Portfolio: Admin");

  const { username, status } = useAuth();
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  return (
    <MainSection>
      <p className="text-3xl text-dark dark:text-light">{today}</p>
      <AnimatedText text={`Welcome ${username}!`} />
      {status === "Employee" && (
        <p className="text-2xl text-dark dark:text-light">
          You are currently logged in as a guest. You may view certain data
          lists, but will not have access to functionality.
        </p>
      )}
    </MainSection>
  );
};

export default Admin;

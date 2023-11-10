import React from "react";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const Admin = () => {
  useTitle("SM_Portfolio: Admin");
  const { username, isManager, isAdmin } = useAuth();
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);
  return (
    <section>
      <p>{today}</p>
      <h1>Welcome {username}!</h1>
    </section>
  );
};

export default Admin;

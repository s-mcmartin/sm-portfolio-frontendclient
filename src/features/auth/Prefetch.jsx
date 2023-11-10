import { Outlet } from "react-router-dom";
import { contactsApiSlice } from "../contacts/contactsApiSlice";
import { coursesApiSlice } from "../courses/coursesApiSlice";
import { projectsApiSlice } from "../projects/projectsApiSlice";
import { store } from "../../app/store";
import { useEffect } from "react";
import { usersApiSlice } from "../users/usersApiSlice";

//creates subscription that remains active
const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    //manual subscriptions
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
    store.dispatch(
      projectsApiSlice.util.prefetch("getProjects", "projectsList", {
        force: true,
      })
    );
    store.dispatch(
      contactsApiSlice.util.prefetch("getContacts", "contactsList", {
        force: true,
      })
    );
    store.dispatch(
      coursesApiSlice.util.prefetch("getCourses", "coursesList", {
        force: true,
      })
    );
  }, []);

  return <Outlet />;
};

export default Prefetch;

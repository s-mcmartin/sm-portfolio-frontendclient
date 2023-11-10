import { Route, Routes } from "react-router-dom";

import About from "./components/public/about/About";
import Admin from "./components/protected/Admin";
import Contact from "./components/public/contact/Contact";
import ContactList from "./features/contacts/ContactList";
import CourseList from "./features/courses/CourseList";
import DashLayout from "./components/layout/DashLayout";
import EditContact from "./features/contacts/EditContact";
import EditCourse from "./features/courses/EditCourse";
import EditProject from "./features/projects/EditProject";
import EditUser from "./features/users/EditUser";
import Home from "./components/public/home/Home";
import Layout from "./components/layout/Layout";
import Login from "./features/auth/Login";
import NewContactForm from "./features/contacts/NewContactForm";
import NewCourseForm from "./features/courses/NewCourseForm";
import NewProjectForm from "./features/projects/NewProjectForm";
import NewUserForm from "./features/users/NewUserForm";
import PersistLogin from "./features/auth/PersistLogin";
import Prefetch from "./features/auth/Prefetch";
import Projects from "./components/public/projects/Projects";
import ProjectsList from "./features/projects/ProjectsList";
import { ROLES } from "./config/roles";
import RequireAuth from "./features/auth/RequireAuth";
import UserList from "./features/users/UserList";
import useTitle from "./hooks/useTitle";

function App() {
  useTitle("SM_Porfolio");
  if (
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<Prefetch />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          {/* START PROTECTED ROUTES */}
          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
            >
              <Route path="admin" element={<DashLayout />}>
                <Route index element={<Admin />} />
                {/* START Projects */}
                <Route path="projects">
                  <Route index element={<ProjectsList />} />
                  <Route
                    element={
                      <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Admin]} />
                    }
                  >
                    <Route path=":id" element={<EditProject />} />
                    <Route path="new" element={<NewProjectForm />} />
                  </Route>
                </Route>
                {/* END Projects */}
                {/* START Courses */}
                <Route path="courses">
                  <Route index element={<CourseList />} />
                  <Route
                    element={
                      <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Admin]} />
                    }
                  >
                    <Route path=":id" element={<EditCourse />} />
                    <Route path="new" element={<NewCourseForm />} />
                  </Route>
                </Route>
                {/* END Courses */}
                {/* START Contacts */}

                <Route path="contacts">
                  <Route index element={<ContactList />} />
                  <Route
                    element={
                      <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Admin]} />
                    }
                  >
                    <Route path=":id" element={<EditContact />} />
                    <Route path="new" element={<NewContactForm />} />
                  </Route>
                </Route>
                {/* END Contacts */}
                {/* START Users */}
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Admin]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UserList />} />

                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                  {/* END Users */}
                </Route>
              </Route>
              {/* END PROTECTED ROUTES */}
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

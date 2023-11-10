import { selectCourseById, useGetCoursesQuery } from "./coursesApiSlice";

import EditCourseForm from "./EditCourseForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditCourse = () => {
  const { id } = useParams();
  const { course } = useGetCoursesQuery("coursesList", {
    selectFromResult: ({ data }) => ({ course: data?.entities[id] }),
  });
  const content = course ? (
    <EditCourseForm course={course} />
  ) : (
    <p>Loading...</p>
  );
  return content;
};

export default EditCourse;

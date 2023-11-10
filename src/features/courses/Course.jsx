import { memo } from "react";
import { useGetCoursesQuery } from "./coursesApiSlice";
import { useNavigate } from "react-router-dom";

const Course = ({ courseId }) => {
  const { course } = useGetCoursesQuery("coursesList", {
    selectFromResult: ({ data }) => ({ course: data?.entities[courseId] }),
  });
  const navigate = useNavigate();

  if (course) {
    const handleEdit = () => navigate(`/admin/courses/${courseId}`);
    const techString = course.tech.toString().replaceAll(",", ", ");
    const cellStatus = course.featured ? "bg-yellow-300" : "";
    return (
      <tr>
        <td className={`${cellStatus}`}>{course.name}</td>
        <td className={`${cellStatus}`}>{techString}</td>
        <td>
          <button className="p-2 bg-indigo-500 rounded-md" onClick={handleEdit}>
            EDIT
          </button>
        </td>
      </tr>
    );
  } else {
    return <p>No project found for ID: {courseId}</p>;
  }
};

const memoizedCourse = memo(Course);
export default memoizedCourse;

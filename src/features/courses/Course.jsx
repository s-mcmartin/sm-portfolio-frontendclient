import TableRow from "../../components/protected/TableRow";
import { memo } from "react";
import { useGetCoursesQuery } from "./coursesApiSlice";
import { useNavigate } from "react-router-dom";

const Course = ({ courseId }) => {
  const { course } = useGetCoursesQuery("coursesList", {
    selectFromResult: ({ data }) => ({ course: data?.entities[courseId] }),
  });
  const tableCells = [
    {
      content: course.organization,
      colSpan: 1,
    },
  ];
  const navigate = useNavigate();

  if (course) {
    const handleEdit = () => navigate(`/admin/courses/${courseId}`);
    const techString = course.tech.toString().replaceAll(",", ", ");
    const cellStatus = course.featured ? "bg-indigo-500" : "";
    const tableCells = [
      {
        content: course.organization,
        colSpan: 1,
      },
      {
        content: course.name,
        colSpan: 4,
      },
      { content: course.instructor, colSpan: 2 },
      { content: techString, colSpan: 4 },
      {
        content: (
          <button
            className="p-2 bg-indigo-500 rounded-md "
            onClick={handleEdit}
          >
            EDIT
          </button>
        ),
        colSpan: 1,
      },
    ];
    return <TableRow tableCells={tableCells} />;
  } else {
    return <p>No project found for ID: {courseId}</p>;
  }
};

const memoizedCourse = memo(Course);
export default memoizedCourse;

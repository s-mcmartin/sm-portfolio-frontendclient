import Course from "./Course";
import { PulseLoader } from "react-spinners";
import { useGetCoursesQuery } from "./coursesApiSlice";

const CourseList = () => {
  const {
    data: courses,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCoursesQuery();
  let content;
  if (isLoading) {
    content = <PulseLoader />;
  }
  if (isError) {
    content = <p className="bg-red-200 text-light">{error?.data?.message}</p>;
  }
  if (isSuccess) {
    const { ids } = courses;

    const tableContent = ids?.length
      ? ids.map((courseId) => <Course key={courseId} courseId={courseId} />)
      : null;

    content = (
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Tech</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }
  return content;
};

export default CourseList;

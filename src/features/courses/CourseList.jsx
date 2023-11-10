import Course from "./Course";
import { PulseLoader } from "react-spinners";
import Table from "./../../components/protected/Table";
import { useGetCoursesQuery } from "./coursesApiSlice";

const tableControls = [
  {
    title: "Organization",
    scope: "col",
    colSpan: 1,
  },
  {
    title: "Name",
    scope: "col",
    colSpan: 4,
  },
  {
    title: "Instructor",
    scope: "col",
    colSpan: 2,
  },
  {
    title: "Tech",
    scope: "col",
    colSpan: 4,
  },
  {
    title: "Edit",
    scope: "col",
    colSpan: 1,
  },
];

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
      <Table tableContent={tableContent} tableControls={tableControls} />
    );
  }
  return content;
};

export default CourseList;

import Course from "./Course";
import Error from "../../components/layout/Error";
import Loading from "../../components/layout/Loading";
import { PulseLoader } from "react-spinners";
import Table from "./../../components/protected/Table";
import TableHeading from "../../components/protected/TableHeading";
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
    content = <Loading />;
  }
  if (isError) {
    content = <Error text={error.error} />;
  }
  if (isSuccess) {
    const { ids } = courses;

    const tableContent = ids?.length
      ? ids.map((courseId) => <Course key={courseId} courseId={courseId} />)
      : null;

    content = (
      <>
        <TableHeading type="Course" text="Course List" />
        <Table tableContent={tableContent} tableControls={tableControls} />
      </>
    );
  }
  return content;
};

export default CourseList;

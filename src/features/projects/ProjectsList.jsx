import Error from "../../components/layout/Error";
import Loading from "../../components/layout/Loading";
import Project from "./Project";
import { PulseLoader } from "react-spinners";
import Table from "../../components/protected/Table";
import TableHeading from "../../components/protected/TableHeading";
import useAuth from "../../hooks/useAuth";
import { useGetProjectsQuery } from "./projectsApiSlice";
import { useNavigate } from "react-router-dom";

const tableControls = [
  {
    title: "Image",
    scope: "col",
    colSpan: 1,
  },
  {
    title: "Name",
    scope: "col",
    colSpan: 4,
  },
  {
    title: "Description",
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

const ProjectsList = () => {
  const { isManager, isAdmin } = useAuth();
  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProjectsQuery();
  const navigate = useNavigate();
  let content;
  if (isLoading) {
    content = <Loading />;
  }
  if (isError) {
    content = <Error text={error.error} />;
  }
  if (isSuccess) {
    const { ids } = projects;

    const tableContent = ids?.length
      ? ids.map((projectId) => (
          <Project key={projectId} projectId={projectId} />
        ))
      : null;

    content = (
      <>
        <TableHeading text="Projects List" type="Project" />

        <Table tableContent={tableContent} tableControls={tableControls} />
      </>
    );
  }
  return content;
};

export default ProjectsList;

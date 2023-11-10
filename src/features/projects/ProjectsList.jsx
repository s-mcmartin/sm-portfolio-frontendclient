import Project from "./Project";
import { PulseLoader } from "react-spinners";
import useAuth from "../../hooks/useAuth";
import { useGetProjectsQuery } from "./projectsApiSlice";
import { useNavigate } from "react-router-dom";

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
    content = <PulseLoader />;
  }
  if (isError) {
    content = <p className="bg-red-200 text-light">{error?.data?.message}</p>;
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
        <h1 className="text-3xl font-bold">Project List</h1>
        <button
          className={`${
            isAdmin || isManager ? "opacity-100" : "opacity-25"
          } p-2 bg-indigo-500 rounded-md`}
          onClick={() => navigate("/admin/projects/new")}
          disabled={!isManager || !isAdmin}
        >
          +
        </button>
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
      </>
    );
  }
  return content;
};

export default ProjectsList;

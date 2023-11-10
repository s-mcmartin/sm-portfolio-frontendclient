import { selectProjectById, useGetProjectsQuery } from "./projectsApiSlice";

import { memo } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Project = ({ projectId }) => {
  const { isManager, isAdmin } = useAuth();
  const { project } = useGetProjectsQuery("projectsList", {
    selectFromResult: ({ data }) => ({ project: data?.entities[projectId] }),
  });
  const navigate = useNavigate();

  if (project) {
    const handleEdit = () => navigate(`/admin/projects/${projectId}`);
    const techString = project.tech.toString().replaceAll(",", ", ");
    const cellStatus = project.featured ? "" : "bg-yellow-300";
    return (
      <tr>
        <td className={`${cellStatus}`}>{project.name}</td>
        <td className={`${cellStatus}`}>{techString}</td>
        <td>
          <button
            className={`${
              isAdmin || isManager ? "opacity-100" : "opacity-25"
            } p-2 bg-indigo-500 rounded-md`}
            onClick={handleEdit}
            disabled={!isManager || !isAdmin}
          >
            EDIT
          </button>
        </td>
      </tr>
    );
  } else {
    return <p>No project found for ID: {projectId}</p>;
  }
};

const memoizedProject = memo(Project);
export default memoizedProject;

import { selectProjectById, useGetProjectsQuery } from "./projectsApiSlice";

import TableRow from "../../components/protected/TableRow";
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

    const tableCells = [
      {
        content: (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full"
          />
        ),
        colSpan: 1,
      },
      {
        content: project.name,
        colSpan: 4,
      },
      { content: project.description, colSpan: 2 },
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
    return <p>No project found for ID: {projectId}</p>;
  }
};

const memoizedProject = memo(Project);
export default memoizedProject;

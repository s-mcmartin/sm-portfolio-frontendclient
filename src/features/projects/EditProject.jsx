import EditProjectForm from "./EditProjectForm";
import { useGetProjectsQuery } from "./projectsApiSlice";
import { useParams } from "react-router-dom";

const EditProject = () => {
  const { id } = useParams();
  const { project } = useGetProjectsQuery("projectsList", {
    selectFromResult: ({ data }) => ({ project: data?.entities[id] }),
  });
  const content = project ? (
    <EditProjectForm project={project} />
  ) : (
    <p>Loading...</p>
  );
  return content;
};

export default EditProject;

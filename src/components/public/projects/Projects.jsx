import { PulseLoader } from "react-spinners";
import { useGetProjectsQuery } from "../../../features/projects/projectsApiSlice";
import useTitle from "../../../hooks/useTitle";

const Projects = () => {
  useTitle("SM_Portfolio: Projects");
  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProjectsQuery();
  let content;
  if (isLoading) content = <PulseLoader />;
  if (isError) content = <p>{error.data?.message}</p>;
  if (isSuccess) {
    const { ids, entities } = projects;
    const featuredProjects = ids.filter(
      (projectId) => entities[projectId].featured === "true"
    );
    const projectsArray = ids.map((projectId) => entities[projectId]);
    console.log("FEATURED", featuredProjects);
    content = (
      <>
        {projectsArray.map((project) => (
          <p key={project._id}>{project.name}</p>
        ))}
      </>
    );
  }

  // const { projects } = useGetProjectsQuery("projectsList", {
  //   selectFromResult: ({ data }) => ({
  //     projects: data?.ids.map((id) => data?.entities[id]),
  //   }),
  // });

  // console.log(projects);
  //Single project
  // const { project } = useGetProjectsQuery("projectsList", {
  //   selectFromResult: ({ data }) => ({ project: data?.entities[projectId] }),
  // });
  return content;
};

export default Projects;

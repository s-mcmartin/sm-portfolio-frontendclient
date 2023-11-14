import AnimatedText from "../../animations/AnimatedText";
import Carousel from "./Carousel";
import Error from "../../layout/Error";
import FilterSearch from "./FilterSearch";
import Loading from "../../layout/Loading";
import MainSection from "../../layout/MainSection";
import ProjectCard from "./ProjectCard";
import TransitionEffect from "../../transitions/TransitionEffect";
import { useGetProjectsQuery } from "../../../features/projects/projectsApiSlice";
import { useState } from "react";
import useTitle from "../../../hooks/useTitle";

const Projects = () => {
  useTitle("SM_Portfolio: Projects");
  const [selected, setSelected] = useState([]);
  const {
    data: projects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProjectsQuery();

  const handleClickSearch = (e) => {
    const query = e.target.value;
    const selectedList = selected;
    const filteredList = selected.filter((item) => item !== query);
    selected.includes(query)
      ? setSelected(filteredList)
      : setSelected([...selectedList, query]);
  };

  let content;
  if (isLoading) content = <Loading />;
  if (isError) content = <Error content={error.error} />;
  if (isSuccess) {
    const { ids, entities } = projects;

    const selectedProjects = ids.filter((projectId) =>
      selected.every((tool) => entities[projectId].tech.includes(tool))
    );
    const sortedSelectedProjects = selectedProjects?.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
    const projectsArray = ids.map((projectId) => entities[projectId]);
    const featuredProjects = projectsArray.filter(
      (project) => project.featured === "true"
    );
    const selectedProjectsLength = selectedProjects?.length;
    content = (
      <>
        <TransitionEffect />
        <main
          className={`mb-16  flex w-full flex-col items-center justify-center dark:text-light`}
        >
          <MainSection className="pt-16">
            <AnimatedText text="Featured Projects" />
            <Carousel projects={featuredProjects} />
            <AnimatedText text="Looking for something else?" />
            <h2 className="mb-8 text-4xl md:text-2xl italic text-center dark:text-light/50">
              Search through some of my other projects...
            </h2>
            <FilterSearch
              projects={projectsArray}
              selected={selected}
              onClickAll={() => setSelected([])}
              onClickSearch={handleClickSearch}
              selectedProjects={selectedProjects}
              selectedProjectsLength={selectedProjectsLength}
            />
            <div className="w-full grid grid-cols-3 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 h-fit grid-row-auto my-4 ">
              {!selected.length
                ? ids.map((projectId) => (
                    <ProjectCard key={projectId} projectId={projectId} />
                  ))
                : sortedSelectedProjects.map((projectId, index) => (
                    <ProjectCard projectId={projectId} key={index} />
                  ))}
            </div>
            <p className="mt-4 text-2xl text-dark dark:text-light">
              For more projects or information, visit my{" "}
              <span>
                <a
                  href="https://github.com/s-mcmartin"
                  className="text-primary dark:text-primaryDark underline"
                >
                  Github
                </a>
              </span>{" "}
              page.
            </p>
          </MainSection>
        </main>
      </>
    );
  }

  return content;
};

export default Projects;

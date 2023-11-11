import {
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} from "./projectsApiSlice";
import { useEffect, useState } from "react";

import AnimatedText from "../../components/animations/AnimatedText";
import Error from "../../components/layout/Error";
import { useNavigate } from "react-router-dom";

const EditProjectForm = ({ project }) => {
  const [updateProject, { isLoading, isSuccess, isError, error }] =
    useUpdateProjectMutation();

  const [
    deleteProject,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteProjectMutation();

  const navigate = useNavigate();

  const [name, setName] = useState(project.name);
  const [image, setImage] = useState(project.image);
  const [description, setDescription] = useState(project.description);
  const [featured, setFeatured] = useState(project.featured);
  const [tech, setTech] = useState(project.tech);
  const [github, setGithub] = useState(project.github);
  const [website, setWebsite] = useState(project.website);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      setImage("");
      setTech([]);
      setDescription("");
      setFeatured(false);
      setGithub("");
      setWebsite("");
      navigate("/admin/projects");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onImageChanged = (e) => setImage(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onFeaturedChanged = (e) => setFeatured((prev) => !prev);
  const onGithubChanged = (e) => setGithub(e.target.value);
  const onWebsiteChanged = (e) => setWebsite(e.target.value);
  const onTechChanged = (e) => setTech([e.target.value]);
  const onSaveProjectClicked = async (e) => {
    await updateProject({
      id: project.id,
      name,
      image,
      featured,
      tech,
      github,
      website,
    });
  };

  const onDeleteProjectClicked = async () => {
    await deleteProject({ id: project.id });
  };

  const canSave = [name !== ""].every(Boolean) && !isLoading;

  return (
    <>
      {isError && <Error text={error.error} />}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col px-12 pb-12 rounded-lg "
      >
        <div className="w-full flex flex-wrap justify-center items-center space-x-4">
          <AnimatedText text="Edit Project" className="!text-4xl text-center" />
        </div>
        <div className="flex items-center">
          <label
            className="w-full text-2xl font-semibold mr-2 dark:text-light"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            value={name}
            onChange={onNameChanged}
          />
        </div>
        <div className="flex items-center">
          <label
            className="w-full text-2xl font-semibold mr-2 dark:text-light"
            htmlFor="image"
          >
            Image:
          </label>
          <input
            className="px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
            id="image"
            name="image"
            type="text"
            autoComplete="off"
            value={image}
            onChange={onImageChanged}
          />
        </div>
        <div className="flex items-center">
          <label
            className="w-full text-2xl font-semibold mr-2 dark:text-light"
            htmlFor="description"
          >
            Description:
          </label>
          <input
            className="px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
            id="description"
            name="description"
            type="text"
            autoComplete="off"
            value={description}
            onChange={onDescriptionChanged}
          />
        </div>
        <div className="flex items-center">
          <label
            className="w-full text-2xl font-semibold mr-2 dark:text-light"
            htmlFor="tech"
          >
            Tech:
          </label>
          <input
            className="px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
            id="tech"
            name="tech"
            type="text"
            autoComplete="off"
            value={tech}
            onChange={onTechChanged}
          />
        </div>
        <div className="flex items-center">
          <label
            className="w-full text-2xl font-semibold mr-2 dark:text-light"
            htmlFor="github"
          >
            Github:
          </label>
          <input
            className="px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
            id="github"
            name="github"
            type="text"
            autoComplete="off"
            value={github}
            onChange={onGithubChanged}
          />
        </div>
        <div className="flex items-center">
          <label
            className="w-full text-2xl font-semibold mr-2 dark:text-light"
            htmlFor="website"
          >
            Website:
          </label>
          <input
            className="px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
            id="website"
            name="website"
            type="text"
            autoComplete="off"
            value={website}
            onChange={onWebsiteChanged}
          />
        </div>
        <div className="flex items-center">
          <label
            className="w-full text-2xl font-semibold mr-2 dark:text-light"
            htmlFor="featured"
          >
            Featured:
            <input
              className="px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
              id="featured"
              name="featured"
              type="checkbox"
              checked={featured === "true" ? true : false}
              onChange={onFeaturedChanged}
            />
          </label>
        </div>
        <button
          className="p-2 bg-indigo-500 rounded-md mb-4 shadow-black shadow-md text-xl text-dark dark:text-light"
          title="Save"
          onClick={onSaveProjectClicked}
          disabled={!canSave}
        >
          SAVE
        </button>
        <button
          className="p-2 bg-red-500 rounded-md shadow-black shadow-md text-xl text-dark dark:text-light "
          title="Delete"
          onClick={onDeleteProjectClicked}
        >
          DELETE
        </button>
      </form>
    </>
  );
};

export default EditProjectForm;

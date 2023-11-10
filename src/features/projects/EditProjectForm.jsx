import {
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} from "./projectsApiSlice";
import { useEffect, useState } from "react";

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
  const errContent = (error?.data?.message || delError?.data?.message) ?? "";
  return (
    <>
      <p>{errContent}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <h2>Edit Project</h2>
          <div>
            <button
              className="p-2 bg-indigo-500 rounded-md"
              title="Save"
              onClick={onSaveProjectClicked}
              disabled={!canSave}
            >
              SAVE
            </button>
            <button
              className="ml-4 p-2 bg-red-500 rounded-md text-light"
              title="Delete"
              onClick={onDeleteProjectClicked}
            >
              DELETE
            </button>
          </div>
          <label htmlFor="name">Name:</label>
          <input
            className=""
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            value={name}
            onChange={onNameChanged}
          />
          <label className="" htmlFor="image">
            Image:
          </label>
          <input
            className=""
            id="image"
            name="image"
            type="text"
            autoComplete="off"
            value={image}
            onChange={onImageChanged}
          />
          <label className="" htmlFor="description">
            Description:
          </label>
          <input
            className=""
            id="description"
            name="description"
            type="text"
            autoComplete="off"
            value={description}
            onChange={onDescriptionChanged}
          />
          <label className="" htmlFor="tech">
            Tech:
          </label>
          <input
            className=""
            id="tech"
            name="tech"
            type="text"
            autoComplete="off"
            value={tech}
            onChange={onTechChanged}
          />

          <label className="" htmlFor="github">
            Github:
          </label>
          <input
            className=""
            id="github"
            name="github"
            type="text"
            autoComplete="off"
            value={github}
            onChange={onGithubChanged}
          />
          <label className="" htmlFor="website">
            Website:
          </label>
          <input
            className=""
            id="website"
            name="website"
            type="text"
            autoComplete="off"
            value={website}
            onChange={onWebsiteChanged}
          />
        </div>
        <label className="" htmlFor="featured">
          Featured:
          <input
            className=""
            id="featured"
            name="featured"
            type="checkbox"
            checked={featured === "true" ? true : false}
            onChange={onFeaturedChanged}
          />
        </label>
      </form>
    </>
  );
};

export default EditProjectForm;

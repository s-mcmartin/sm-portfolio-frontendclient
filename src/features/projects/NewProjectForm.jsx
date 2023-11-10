import { useEffect, useState } from "react";

import { useAddNewProjectMutation } from "./projectsApiSlice";
import { useNavigate } from "react-router-dom";

const NewProjectForm = () => {
  const [addNewProject, { isLoading, isSuccess, isError, error }] =
    useAddNewProjectMutation();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [tech, setTech] = useState([]);
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setImage("");
      setTech([]);
      setDescription("");
      setFeatured(false);
      setGithub("");
      setWebsite("");
      navigate("/admin/projects");
    }
  }, [isSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onImageChanged = (e) => setImage(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onFeaturedChanged = (e) => setFeatured((prev) => !prev);
  const onGithubChanged = (e) => setGithub(e.target.value);
  const onWebsiteChanged = (e) => setWebsite(e.target.value);
  const onTechChanged = (e) => setTech([e.target.value]);

  const canSave = [name !== ""].every(Boolean) && !isLoading;

  const onSaveProjectClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewProject({
        name,
        description,
        image,
        tech,
        github,
        website,
        featured,
      });
    }
  };

  const errClass = isError ? "bg-red-200" : "hidden";
  const validNameClass = name !== "" ? "border-red-200 border border-2px" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <form onSubmit={onSaveProjectClicked}>
        <div>
          <h2>New Project</h2>
          <div>
            <button
              className="p-2 bg-indigo-500 rounded-md"
              title="Save"
              disabled={!canSave}
            >
              SAVE
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
            checked={featured}
            onChange={onFeaturedChanged}
          />
        </label>
      </form>
    </>
  );

  return content;
};

export default NewProjectForm;

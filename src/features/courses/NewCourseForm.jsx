import { useEffect, useState } from "react";

import { useAddNewCourseMutation } from "./coursesApiSlice";
import { useNavigate } from "react-router-dom";

const NewCourseForm = () => {
  const [addNewCourse, { isLoading, isSuccess, isError, error }] =
    useAddNewCourseMutation();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [tech, setTech] = useState([]);
  const [organization, setOrganization] = useState("");
  const [courseLink, setCourseLink] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setInstructor("");
      setTech([]);
      setDescription("");
      setFeatured(false);
      setOrganization("");
      setCourseLink("");
      navigate("/admin/courses");
    }
  }, [isSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onInstructorChanged = (e) => setInstructor(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onFeaturedChanged = (e) => setFeatured((prev) => !prev);
  const onCourseLinkChanged = (e) => setCourseLink(e.target.value);
  const onOrganizationChanged = (e) => setOrganization(e.target.value);
  const onTechChanged = (e) => setTech([e.target.value]);

  const canSave = [name !== ""].every(Boolean) && !isLoading;

  const onSaveCourseClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewCourse({
        name,
        description,
        instructor,
        tech,
        organization,
        courseLink,
        featured,
      });
    }
  };

  const errClass = isError ? "bg-red-200" : "hidden";
  const validNameClass = name !== "" ? "border-red-200 border border-2px" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <form onSubmit={onSaveCourseClicked}>
        <div>
          <h2>New Course</h2>
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
          <label className="" htmlFor="instructor">
            Instructor:
          </label>
          <input
            className=""
            id="instructor"
            name="instructor"
            type="text"
            autoComplete="off"
            value={instructor}
            onChange={onInstructorChanged}
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

          <label className="" htmlFor="organization">
            Organization:
          </label>
          <input
            className=""
            id="organization"
            name="organization"
            type="text"
            autoComplete="off"
            value={organization}
            onChange={onOrganizationChanged}
          />
          <label className="" htmlFor="courseLink">
            Course URL:
          </label>
          <input
            className=""
            id="courseLink"
            name="courseLink"
            type="text"
            autoComplete="off"
            value={courseLink}
            onChange={onCourseLinkChanged}
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

export default NewCourseForm;

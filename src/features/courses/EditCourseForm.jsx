import {
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} from "./coursesApiSlice";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const EditCourseForm = ({ course }) => {
  //CHECK UPDATE COURSE FUNCTION

  const [updateCourse, { isLoading, isSuccess, isError, error }] =
    useUpdateCourseMutation();

  const [
    deleteCourse,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteCourseMutation();

  const navigate = useNavigate();

  const [name, setName] = useState(course.name);
  const [instructor, setInstructor] = useState(course.instructor);
  const [description, setDescription] = useState(course.description);
  const [featured, setFeatured] = useState(course.featured);
  const [tech, setTech] = useState(course.tech);
  const [organization, setOrganization] = useState(course.organization);
  const [courseLink, setCourseLink] = useState(course.courseLink);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("");
      setInstructor("");
      setTech([]);
      setDescription("");
      setFeatured(false);
      setOrganization("");
      setCourseLink("");
      navigate("/admin/courses");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onInstructorChanged = (e) => setInstructor(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onFeaturedChanged = (e) => setFeatured((prev) => !prev);
  const onOrganizationChanged = (e) => setOrganization(e.target.value);
  const onCourseLinkChanged = (e) => setCourseLink(e.target.value);
  const onTechChanged = (e) => setTech([e.target.value]);

  const onSaveCourseClicked = async (e) => {
    await updateCourse({
      id: course.id,
      name,
      instructor,
      featured,
      tech,
      organization,
      courseLink,
    });
  };

  const onDeleteCourseClicked = async () => {
    await deleteCourse({ id: course.id });
  };

  const errContent = (error?.data?.message || delError?.data?.message) ?? "";
  return (
    <>
      <p>{errContent}</p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <h2>Edit Course</h2>
          <div>
            <button
              className="p-2 bg-indigo-500 rounded-md"
              title="Save"
              onClick={onSaveCourseClicked}
            >
              SAVE
            </button>
            <button
              className="ml-4 p-2 bg-red-500 rounded-md text-light"
              title="Delete"
              onClick={onDeleteCourseClicked}
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
};

export default EditCourseForm;

import {
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} from "./coursesApiSlice";
import { useEffect, useState } from "react";

import AnimatedText from "../../components/animations/AnimatedText";
import Error from "../../components/layout/Error";
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

  return (
    <>
      {isError && <Error text={error.error} />}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col px-12 pb-12 rounded-lg "
      >
        <div className="w-full flex flex-wrap justify-center items-center space-x-4">
          <AnimatedText text="Edit Course" className="!text-4xl text-center" />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="name"
            className="w-full text-2xl font-semibold mr-2 dark:text-light"
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
            htmlFor="instructor"
          >
            Instructor:
          </label>
          <input
            className="px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
            id="instructor"
            name="instructor"
            type="text"
            autoComplete="off"
            value={instructor}
            onChange={onInstructorChanged}
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
            htmlFor="organization"
          >
            Organization:
          </label>
          <input
            className="px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
            id="organization"
            name="organization"
            type="text"
            autoComplete="off"
            value={organization}
            onChange={onOrganizationChanged}
          />
        </div>
        <div className="flex items-center">
          <label
            className="w-full text-2xl font-semibold mr-2 dark:text-light"
            htmlFor="courseLink"
          >
            Course URL:
          </label>
          <input
            className="px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
            id="courseLink"
            name="courseLink"
            type="text"
            autoComplete="off"
            value={courseLink}
            onChange={onCourseLinkChanged}
          />
        </div>{" "}
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
              checked={featured}
              onChange={onFeaturedChanged}
            />
          </label>
        </div>
        <button
          className="p-2 mt-4 bg-indigo-500 rounded-md mb-4 shadow-black shadow-md text-xl text-dark dark:text-light"
          title="Save"
          onClick={onSaveCourseClicked}
        >
          SAVE
        </button>
        <button
          className="p-2 bg-red-500 rounded-md shadow-black shadow-md text-xl text-dark dark:text-light "
          title="Delete"
          onClick={onDeleteCourseClicked}
        >
          DELETE
        </button>
      </form>
    </>
  );
};

export default EditCourseForm;

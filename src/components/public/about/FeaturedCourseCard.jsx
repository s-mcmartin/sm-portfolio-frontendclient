import { useGetCoursesQuery } from "../../../features/courses/coursesApiSlice";

const FeaturedCourseCard = ({ courseId }) => {
  const { course } = useGetCoursesQuery("coursesList", {
    selectFromResult: ({ data }) => ({ course: data?.entities[courseId] }),
  });
  return (
    <div className="border-2 border-primary rounded-lg dark:border-primaryDark">
      <div className="bg-primary dark:bg-primaryDark py-4">
        <h2 className="text-3xl font-bold mb-2">
          <a href="_blank">{course?.name}</a>
        </h2>
        <p className="text-2xl font-semibold mb-2">{course?.organization}</p>
        <p className="text-2xl font-semibold">{course?.instructor}</p>
      </div>
      <div className="p-2 text-left">
        <h3 className="text-2xl font-semibold">
          Topics covered in this course:
        </h3>
        <ul className="grid grid-cols-2 m-4 gap-2">
          {course?.tech?.map((tool) => (
            <li key={tool} className="text-xl">
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeaturedCourseCard;

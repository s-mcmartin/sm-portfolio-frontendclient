const FilterSearch = ({
  projects,
  selected,
  onClickAll,
  onClickSearch,
  selectedProjects,
}) => {
  const techArray = [];
  projects?.map((project) =>
    project?.tech?.map((tool) =>
      !techArray.includes(tool) ? techArray.push(tool) : null
    )
  );
  return (
    <div className="w-full h-fit flex gap-2 flex-wrap mt-6">
      <h2 className="text-2xl text-semibold text-left text-dark/75 dark:text-light/75">
        Filter:
      </h2>
      <button
        type="button"
        className={`bg-light shadow-md w-fit h-fit px-2 py-0.5 text-dark text-xl
      ${!selected.length && "text-primary dark:text-primaryDark"}`}
        onClick={onClickAll}
      >
        All
      </button>
      {techArray.map((tool) => (
        <button
          key={tool}
          value={tool}
          type="button"
          className={`bg-light shadow-md w-fit h-fit px-2 py-0.5 text-dark text-xl ${
            selected.includes(tool) && "text-primary dark:text-primaryDark"
          }`}
          onClick={onClickSearch}
        >
          {tool}
        </button>
      ))}
      {selectedProjects && (
        <p className="text-xl text-dark/50 italic w-full text-right mt-2 dark:text-light/50">
          Showing results {selectedProjects.length} / {projects.length}
        </p>
      )}
    </div>
  );
};

export default FilterSearch;

import useAuth from "../../hooks/useAuth";

const DashFooter = () => {
  const { username, status } = useAuth();

  return (
    <footer className="md:mb-0 w-full flex justify-between items-center text-dark dark:text-light mb-8 md:flex-col md:items-start">
      <p className="text-xl font-light px-4">
        Current user: <span className="px-2 font-semibold">{username}</span>
      </p>
      <p className="text-xl font-light px-4">
        Status:{" "}
        <span className="px-2 font-semibold">
          {status === "Employee" ? "Guest" : status}
        </span>
      </p>
    </footer>
  );
};

export default DashFooter;

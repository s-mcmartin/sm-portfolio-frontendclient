import Loading from "./../../components/layout/Loading";
import Table from "../../components/protected/Table";
import User from "./User";
import { useGetUsersQuery } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";

const tableControls = [
  {
    title: "Username",
    colSpan: 4,
  },
  {
    title: "Roles",
    colSpan: 5,
  },
  {
    title: "Edit",
    colSpan: 3,
  },
];
const UserList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const navigate = useNavigate();
  let content;
  if (isLoading) {
    content = <Loading />;
  }
  if (isError) {
    content = <p className="bg-red-200 text-light">{error?.data?.message}</p>;
  }
  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;

    content = (
      <>
        <h1 className="text-3xl font-bold">Users List</h1>
        <button
          className="p-2 bg-green-200 rounded-full"
          onClick={() => navigate("/admin/users/new")}
        >
          +
        </button>
        <Table tableContent={tableContent} tableControls={tableControls} />
      </>
    );
  }
  return content;
};

export default UserList;

import Loading from "./../../components/layout/Loading";
import Table from "../../components/protected/Table";
import TableHeading from "../../components/protected/TableHeading";
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
        <TableHeading text="Users List" type="User" />
        <Table tableContent={tableContent} tableControls={tableControls} />
      </>
    );
  }
  return content;
};

export default UserList;

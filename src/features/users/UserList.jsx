import { Link, useNavigate } from "react-router-dom";

import { PulseLoader } from "react-spinners";
import User from "./User";
import useAuth from "../../hooks/useAuth";
import { useGetUsersQuery } from "./usersApiSlice";

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
    content = <PulseLoader />;
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
        <table>
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Roles</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </>
    );
  }
  return content;
};

export default UserList;

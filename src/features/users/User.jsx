import { memo, useMemo } from "react";

import useAuth from "../../hooks/useAuth";
import { useGetUsersQuery } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";

const User = ({ userId }) => {
  const { isManager, isAdmin } = useAuth();
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({ user: data?.entities[userId] }),
  });

  console.log(user);
  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/admin/users/${userId}`);
    const userRolesString = user.roles.toString().replaceAll(",", ", ");
    const cellStatus = user.active ? "" : "";
    return (
      <tr>
        <td className={`${cellStatus}`}>{user.username}</td>
        <td className={`${cellStatus}`}>{userRolesString}</td>
        <td>
          <button
            className="p-2 bg-indigo-500 rounded-md"
            onClick={handleEdit}
            disabled={!isManager || !isAdmin}
          >
            EDIT
          </button>
        </td>
      </tr>
    );
  } else {
    return <p>No user found for ID: {userId}</p>;
  }
};

//only rerender if changes in data
const memoizedUser = memo(User);
export default memoizedUser;

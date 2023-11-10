import { memo, useMemo } from "react";

import TableRow from "../../components/protected/TableRow";
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
    const tableCells = [
      {
        content: user.username,
        colSpan: 4,
      },
      {
        content: userRolesString,
        colSpan: 5,
      },
      {
        content: (
          <button className="p-2 bg-indigo-500 rounded-md" onClick={handleEdit}>
            EDIT
          </button>
        ),
        colSpan: 3,
      },
    ];
    return <TableRow tableCells={tableCells} />;
  } else {
    return <p>No user found for ID: {userId}</p>;
  }
};

//only rerender if changes in data
const memoizedUser = memo(User);
export default memoizedUser;

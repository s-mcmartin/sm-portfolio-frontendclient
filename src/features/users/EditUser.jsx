import EditUserForm from "./EditUserForm";
import { useGetUsersQuery } from "./usersApiSlice";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({ user: data?.entities[id] }),
  });

  const content = user ? <EditUserForm user={user} /> : <p>Loading...</p>;
  return content;
};

export default EditUser;

import EditContactForm from "./EditContactForm";
import { useGetContactsQuery } from "./contactsApiSlice";
import { useParams } from "react-router-dom";

const EditContact = () => {
  const { id } = useParams();
  const { contact } = useGetContactsQuery("contactsList", {
    selectFromResult: ({ data }) => ({ contact: data?.entities[id] }),
  });
  const content = contact ? (
    <EditContactForm contact={contact} />
  ) : (
    <p>Loading...</p>
  );
  return content;
};

export default EditContact;

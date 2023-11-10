import { memo } from "react";
import { useGetContactsQuery } from "./contactsApiSlice";
import { useNavigate } from "react-router-dom";

const Contact = ({ contactId }) => {
  const { contact } = useGetContactsQuery("contactsList", {
    selectFromResult: ({ data }) => ({ contact: data?.entities[contactId] }),
  });

  const navigate = useNavigate();

  if (contact) {
    const handleEdit = () => navigate(`/admin/contacts/${contactId}`);
    const created = new Date(contact.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return (
      <tr>
        <td className={``}>{created}</td>
        <td className={``}>{contact.name}</td>
        <td className={``}>{contact.email}</td>
        <td className={``}>{contact.subject}</td>
        <td className={``}>{contact.message}</td>
        <td>
          <button className="p-2 bg-indigo-500 rounded-md" onClick={handleEdit}>
            EDIT
          </button>
        </td>
      </tr>
    );
  } else {
    return <p>No project found for ID: {contactId}</p>;
  }
};

const memoizedContact = memo(Contact);
export default memoizedContact;

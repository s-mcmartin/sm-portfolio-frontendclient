import TableRow from "../../components/protected/TableRow";
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

    const tableCells = [
      {
        content: created,
        colSpan: 2,
      },
      {
        content: contact.name,
        colSpan: 1,
      },
      {
        content: contact.email,
        colSpan: 2,
      },
      {
        content: contact.subject,
        colSpan: 2,
      },
      {
        content: contact.message,
        colSpan: 4,
      },
      {
        content: (
          <button className="p-2 bg-indigo-500 rounded-md" onClick={handleEdit}>
            EDIT
          </button>
        ),
        colSpan: 1,
      },
    ];
    return <TableRow tableCells={tableCells} />;
  } else {
    return <p>No contact data found for ID: {contactId}</p>;
  }
};

const memoizedContact = memo(Contact);
export default memoizedContact;

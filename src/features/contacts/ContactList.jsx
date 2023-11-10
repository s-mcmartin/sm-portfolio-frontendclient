import Contact from "./Contact";
import { PulseLoader } from "react-spinners";
import { useGetContactsQuery } from "./contactsApiSlice";

const ContactList = () => {
  const {
    data: contacts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetContactsQuery();
  let content;
  if (isLoading) {
    content = <PulseLoader />;
  }
  if (isError) {
    content = <p className="bg-red-200 text-light">{error?.data?.message}</p>;
  }
  if (isSuccess) {
    const { ids } = contacts;
    console.log(contacts);

    const tableContent = ids?.length
      ? ids.map((contactId) => (
          <Contact key={contactId} contactId={contactId} />
        ))
      : null;

    content = (
      <table>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Subject</th>
            <th scope="col">Message</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }
  return content;
};

export default ContactList;

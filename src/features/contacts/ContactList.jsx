import Contact from "./Contact";
import { PulseLoader } from "react-spinners";
import Table from "../../components/protected/Table";
import { useGetContactsQuery } from "./contactsApiSlice";

const tableControls = [
  {
    title: "Created At",
    colSpan: 2,
  },
  {
    title: "Name",
    colSpan: 1,
  },
  {
    title: "Email",
    colSpan: 2,
  },
  {
    title: "Subject",
    colSpan: 2,
  },
  {
    title: "Message",
    colSpan: 4,
  },
  {
    title: "Edit",
    colSpan: 1,
  },
];

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
      <Table tableContent={tableContent} tableControls={tableControls} />
    );
  }

  return content;
};

export default ContactList;

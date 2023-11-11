import Contact from "./Contact";
import Error from "../../components/layout/Error";
import Loading from "./../../components/layout/Loading";
import Table from "../../components/protected/Table";
import TableHeading from "../../components/protected/TableHeading";
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
    content = <Loading />;
  }
  if (isError) {
    content = <Error text={error.error} />;
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
      <>
        <TableHeading type="Contact" text="Contact List" />
        <Table tableContent={tableContent} tableControls={tableControls} />
      </>
    );
  }

  return content;
};

export default ContactList;

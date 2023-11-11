import {
  useDeleteContactMutation,
  useUpdateContactMutation,
} from "./contactsApiSlice";
import { useEffect, useState } from "react";

import AnimatedText from "../../components/animations/AnimatedText";
import Error from "../../components/layout/Error";
import { useNavigate } from "react-router-dom";

const EditContactForm = ({ contact }) => {
  const [updateContact, { isLoading, isSuccess, isError, error }] =
    useUpdateContactMutation();

  const [
    deleteContact,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteContactMutation();

  const navigate = useNavigate();

  const [name, setName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [subject, setSubject] = useState(contact.subject);
  const [message, setMessage] = useState(contact.message);
  const [completed, setCompleted] = useState(contact.completed);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setCompleted(false);
      navigate("/admin/contacts");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onSubjectChanged = (e) => setSubject(e.target.value);
  const onMessageChanged = (e) => setMessage(e.target.value);

  const onCompletedChanged = () => setCompleted((prev) => !prev);

  const onSaveContactClicked = async (e) => {
    await updateContact({
      id: contact.id,
      name,
      email,
      subject,
      message,
      completed,
    });
  };

  const onDeleteContactClicked = async () => {
    await deleteContact({ id: contact.id });
  };

  let canSave =
    [name, email, subject, message, completed].every(Boolean) && !isLoading;

  const content = (
    <>
      {isError && <Error text={error.error} />}

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col px-12 pb-12 rounded-lg "
      >
        <div className="w-full flex flex-wrap justify-center items-center space-x-4">
          <AnimatedText text="Edit Contact" className="!text-4xl text-center" />
        </div>
        <div className="flex items-center">
          <label
            htmlFor="name"
            className="w-full text-2xl font-semibold mr-2 dark:text-light"
          >
            Name:
          </label>
          <input
            className="px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            value={name}
            onChange={onNameChanged}
          />
        </div>
        <div className="flex items-center">
          <label
            className="w-full text-2xl font-semibold mr-2 dark:text-light"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            value={email}
            onChange={onEmailChanged}
          />
        </div>

        <div className="flex items-center">
          <label
            className="w-full text-2xl font-semibold mr-2 dark:text-light"
            htmlFor="subject"
          >
            Subject:
          </label>
          <input
            className="px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
            id="subject"
            name="subject"
            type="text"
            autoComplete="off"
            value={subject}
            onChange={onSubjectChanged}
          />
        </div>
        <div className="flex items-center">
          <label
            className="w-full text-2xl font-semibold mr-2 dark:text-light"
            htmlFor="message"
          >
            Message:
          </label>
          <input
            className="px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
            id="message"
            name="message"
            type="text"
            autoComplete="off"
            value={message}
            onChange={onMessageChanged}
          />
        </div>
        <div className="flex items-center mb-4">
          <label
            className="w-full text-2xl font-semibold mr-4 dark:text-light"
            htmlFor="completed"
          >
            Featured:
            <input
              className="px-2 mx-4 text-xl my-1"
              id="completed"
              name="completed"
              type="checkbox"
              checked={completed}
              onChange={onCompletedChanged}
            />
          </label>
        </div>
        <button
          className="p-2 bg-indigo-500 rounded-md mb-4 shadow-black shadow-md text-xl text-dark dark:text-light"
          title="Save"
          onClick={onSaveContactClicked}
          disabled={!canSave}
        >
          SAVE
        </button>
        <button
          className="p-2 bg-red-500 rounded-md shadow-black shadow-md text-xl text-dark dark:text-light "
          title="Delete"
          onClick={onDeleteContactClicked}
        >
          DELETE
        </button>
      </form>
    </>
  );

  return content;
};
export default EditContactForm;

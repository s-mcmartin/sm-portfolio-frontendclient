import { useEffect, useState } from "react";

import AnimatedText from "../../components/animations/AnimatedText";
import Error from "../../components/layout/Error";
import { useAddNewContactMutation } from "./contactsApiSlice";
import { useNavigate } from "react-router-dom";

const NewContactForm = () => {
  const [addNewContact, { isLoading, isSuccess, isError, error }] =
    useAddNewContactMutation();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      navigate("/admin/contacts");
    }
  }, [isSuccess, navigate]);

  const onNameChanged = (e) => setName(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onSubjectChanged = (e) => setSubject(e.target.value);
  const onMessageChanged = (e) => setMessage(e.target.value);

  const canSave = [name, email, subject, message].every(Boolean) && !isLoading;

  const onSaveContactClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewContact({ name, email, message, subject });
    }
  };

  const content = (
    <>
      {isError && <Error text={error.error} />}

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col px-12 pb-12 rounded-lg "
      >
        <div className="w-full flex flex-wrap justify-center items-center space-x-4">
          <AnimatedText text="New Contact" className="!text-4xl text-center" />
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
        <button
          className="mt-4 p-2 bg-indigo-500 rounded-md mb-4 shadow-black shadow-md text-xl text-dark dark:text-light"
          title="Save"
          onClick={onSaveContactClicked}
          disabled={!canSave}
        >
          SAVE
        </button>
      </form>
    </>
  );

  return content;
};

export default NewContactForm;

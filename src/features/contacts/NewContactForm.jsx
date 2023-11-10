import { useEffect, useState } from "react";

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

  const errClass = isError ? "bg-red-200" : "hidden";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <form onSubmit={onSaveContactClicked}>
        <div>
          <h2>New Contact</h2>
          <div>
            <button
              className="p-2 bg-indigo-500 rounded-md"
              title="Save"
              disabled={!canSave}
            >
              SAVE
            </button>
          </div>
          <label htmlFor="name">Name:</label>
          <input
            className=""
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            value={name}
            onChange={onNameChanged}
          />
          <label className="" htmlFor="email">
            Email:
          </label>
          <input
            className=""
            id="email"
            name="email"
            type="email"
            autoComplete="off"
            value={email}
            onChange={onEmailChanged}
          />
          <label className="" htmlFor="subject">
            Subject:
          </label>
          <input
            className=""
            id="subject"
            name="subject"
            type="text"
            autoComplete="off"
            value={subject}
            onChange={onSubjectChanged}
          />
          <label className="" htmlFor="message">
            Message:
          </label>
          <input
            className=""
            id="message"
            name="message"
            type="text"
            autoComplete="off"
            value={message}
            onChange={onMessageChanged}
          />
        </div>
      </form>
    </>
  );

  return content;
};

export default NewContactForm;

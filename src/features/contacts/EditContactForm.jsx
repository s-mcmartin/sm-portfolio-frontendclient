import {
  useDeleteContactMutation,
  useUpdateContactMutation,
} from "./contactsApiSlice";
import { useEffect, useState } from "react";

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

  const errClass = isError || isDelError ? "errmsg" : "offscreen";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="">
          <h2>Edit Contact</h2>
          <div className="form__action-buttons">
            <button
              className=""
              title="Save"
              onClick={onSaveContactClicked}
              disabled={!canSave}
            >
              SAVE
            </button>
            <button
              className=""
              title="Delete"
              onClick={onDeleteContactClicked}
            >
              DELETE
            </button>
          </div>
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
        <label className="" htmlFor="completed">
          Featured:
          <input
            className=""
            id="completed"
            name="completed"
            type="checkbox"
            checked={completed}
            onChange={onCompletedChanged}
          />
        </label>
      </form>
    </>
  );

  return content;
};
export default EditContactForm;

import { useEffect, useRef, useState } from "react";

import { RingLoader } from "react-spinners";
import emailjs from "@emailjs/browser";
import { useAddNewContactMutation } from "../../../features/contacts/contactsApiSlice";
import useTitle from "../../../hooks/useTitle";

const ContactForm = () => {
  useTitle("SM_Portfolio: Client Contact Form");
  const form = useRef();

  const [addNewContact, { isLoading, isSuccess, isError, error }] =
    useAddNewContactMutation();

  const [showSuccess, setShowSuccess] = useState(false);

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
      setShowSuccess(true);
    }
  }, [isSuccess]);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangeSubject = (e) => setSubject(e.target.value);
  const handleChangeMessage = (e) => setMessage(e.target.value);

  const sendEmail = () => {
    emailjs
      .sendForm(
        "service_pz59rqv",
        "template_uq1qoqi",
        form.current,
        "IcjMs68R5OeqYZGGC"
      )
      .then(
        (result) => {
          console.log(result.text);
          window.alert("message sent!");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !isLoading &&
      name !== "" &&
      email !== "" &&
      subject !== "" &&
      message !== ""
    ) {
      await addNewContact({ name, email, subject, message });
      sendEmail();
    }
  };

  const successMessage = (
    <div className="w-[30vw] bg-light shadow-lg text-dark">
      <h2 className="text-primary">Message successfully sent!</h2>
      <p>Thank you for your message! I will get back to you very soon.</p>
      <button className="" type="button" onClick={() => setShowSuccess(false)}>
        Close
      </button>
    </div>
  );

  return (
    <>
      {showSuccess && successMessage}
      {isLoading && <RingLoader />}
      {isError && <p>{error?.data?.message}</p>}
      <form onSubmit={handleSubmit} ref={form} className="">
        <h2 className="text-light text-2xl dark:text-dark mb-4">
          Send me a message!
        </h2>
        <div className="">
          <label
            className="text-light w-full text-semibold dark:text-dark pb-2 text-xl"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="w-full rounded-md text-xl mb-4 dark:text-dark p-2"
            id="name"
            name="user_name"
            type="text"
            value={name}
            onChange={handleChangeName}
          />
          <label
            className="text-light w-full text-semibold dark:text-dark pb-2 text-xl"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full rounded-md text-xl mb-4 dark:text-dark p-2"
            id="email"
            name="user_email"
            type="email"
            value={email}
            onChange={handleChangeEmail}
          />
          <label
            className="text-light w-full text-semibold dark:text-dark pb-2 text-xl"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            className="w-full rounded-md text-xl mb-4 dark:text-dark p-2"
            id="subject"
            name="user_subject"
            type="text"
            value={subject}
            onChange={handleChangeSubject}
          />
          <label
            className="text-light w-full text-semibold dark:text-dark pb-2 text-xl"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="w-full rounded-md text-xl mb-4 dark:text-dark p-2"
            id="message"
            name="message"
            type="text"
            rows="12"
            value={message}
            onChange={handleChangeMessage}
          />
          <button
            className="w-full bg-primaryDark dark:bg-primary cursor-pointer text-light font-semibold text-2xl rounded-md shadow-md shadow-black my-4 p-2"
            title="Send"
            value="Send"
            disabled={
              name === "" || email === "" || subject === "" || message === ""
                ? true
                : false
            }
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;

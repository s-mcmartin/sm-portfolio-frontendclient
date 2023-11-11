import { useNavigate } from "react-router-dom";

const SuccessMessage = ({ handleToggleSuccess }) => {
  return (
    <div className="w-full h-full flex flex-wrap flex-col justify-center items-center">
      <h2 className="text-3xl font-bold w-1/2 mb-4 text-light dark:text-dark">
        Thank you! I will get back to you ASAP!
      </h2>
      <div className="p-2 w-1/2 bg-green-400 text-light text-xl">
        Success: Message sent.
      </div>
      <button
        className="p-2 mt-4 underline text-light dark:text-dark text-lg"
        onClick={() => handleToggleSuccess()}
      >
        Close
      </button>
    </div>
  );
};

export default SuccessMessage;

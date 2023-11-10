import { useNavigate } from "react-router-dom";

const SuccessMessage = ({ setShowSuccess }) => {
  const handleClickOkay = (e) => {
    setShowSuccess(false);
  };
  return (
    <div className="w-full h-full flex flex-wrap flex-col justify-center items-center">
      <h2 className="text-3xl font-bold w-1/2">
        Thank you! I will get back to you ASAP!
      </h2>
      <div className="p-2 w-1/2 bg-green-400 text-light">
        Success: Message sent.
      </div>
      <button className="" onClick={handleClickOkay}>
        Okay
      </button>
    </div>
  );
};

export default SuccessMessage;

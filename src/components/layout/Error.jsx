const Error = ({ content }) => {
  return (
    <div className="w-full h-full flex flex-wrap flex-col justify-center items-center">
      <h2 className="text-3xl font-bold w-1/2">Oh no! There was an error!</h2>
      <div className="p-8 w-1/2 bg-red-400 text-light">{content}</div>
    </div>
  );
};

export default Error;

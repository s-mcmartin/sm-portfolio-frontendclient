import { useEffect, useState } from "react";

import AnimatedText from "../../components/animations/AnimatedText";
import Error from "../../components/layout/Error";
import { ROLES } from "../../config/roles";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,20}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/admin/users");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTML Collection
      (option) => option.value
    );
    setRoles(values);
  };

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const errClass = isError ? "bg-red-200" : "hidden";
  const validUserClass = !validUsername
    ? "border-red-200 border border-2px"
    : "";
  const validePwdClass = !validPassword
    ? "border-red-200 border border-2px"
    : "";
  const validRolesClass = !Boolean(roles.length)
    ? "border-red-200 border border-2px"
    : "";

  const content = (
    <>
      {isError && <Error text={error.error} />}
      <form
        onSubmit={onSaveUserClicked}
        className="flex flex-col px-12 pb-12 rounded-lg"
      >
        <div className="w-full flex flex-wrap justify-center items-center space-x-4">
          <AnimatedText text="New User" className="!text-4xl text-center" />
        </div>

        <label
          htmlFor="username"
          className="w-full text-2xl font-semibold mr-2 dark:text-light"
        >
          Username: <span>[3-20 letters]</span>
        </label>
        <input
          className="px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />
        <label
          className="w-full text-2xl font-semibold mr-2 dark:text-light"
          htmlFor="password"
        >
          Password: <span>[4-12 characters incl. !@#$%]</span>
        </label>
        <input
          className="px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
          id="password"
          name="password"
          type="password"
          autoComplete="off"
          value={password}
          onChange={onPasswordChanged}
        />
        <label
          className="w-full text-2xl font-semibold mr-2 dark:text-light"
          htmlFor="roles"
        >
          ASSIGNED ROLES:
        </label>
        <select
          id="roles"
          name="roles"
          className="px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
          multiple={true}
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>
        <button
          className="mt-4 p-2 bg-indigo-500 rounded-md mb-4 shadow-black shadow-md text-xl text-dark dark:text-light"
          title="Save"
          onClick={onSaveUserClicked}
          disabled={!canSave}
        >
          SAVE
        </button>
        <button
          className="p-2 border-dark border rounded-md hover:underline"
          title="Back"
          onClick={() => navigate("/admin/users")}
        >
          Back
        </button>
      </form>
    </>
  );

  return content;
};

export default NewUserForm;

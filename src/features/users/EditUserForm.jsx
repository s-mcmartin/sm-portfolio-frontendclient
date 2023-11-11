import { useDeleteUserMutation, useUpdateUserMutation } from "./usersApiSlice";
import { useEffect, useState } from "react";

import AnimatedText from "../../components/animations/AnimatedText";
import Error from "../../components/layout/Error";
import { ROLES } from "../../config/roles";
import { useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/admin/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const onActiveChanged = () => setActive((prev) => !prev);

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  let canSave;
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length)
    ? "form__input--incomplete"
    : "";

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  const content = (
    <>
      {isError && <Error text={error.error} />}

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col px-12 pb-12 rounded-lg "
      >
        <div className="w-full flex flex-wrap justify-center items-center space-x-4">
          <AnimatedText text="Edit User" className="!text-4xl text-center" />
        </div>
        <div className="flex items-center flex-wrap">
          <label
            className="w-full text-2xl font-semibold mr-2 dark:text-light"
            htmlFor="username"
          >
            Username: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            className="w-full px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={username}
            onChange={onUsernameChanged}
          />
        </div>
        <div className="flex items-center flex-wrap">
          <label
            className="w-full text-2xl font-semibold mr-2 dark:text-light"
            htmlFor="password"
          >
            Password: <span className="nowrap">[empty = no change]</span>{" "}
            <span className="nowrap">[4-12 chars incl. !@#$%]</span>
          </label>
          <input
            className="w-full px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={onPasswordChanged}
          />
        </div>
        <div className="flex items-center">
          <label
            className="text-2xl font-semibold mr-2 dark:text-light"
            htmlFor="user-active"
          >
            ACTIVE:
            <input
              className=" px-2 mx-2 my-1 bg-dark/75 dark:bg-light/75 p-2 rounded-md dark:text-dark text-light text-2xl"
              id="user-active"
              name="user-active"
              type="checkbox"
              checked={active}
              onChange={onActiveChanged}
            />
          </label>
        </div>
        <div className="flex flex-wrap items-center">
          <label
            className="w-full text-2xl font-semibold mr-2 dark:text-light"
            htmlFor="roles"
          >
            ASSIGNED ROLES:
          </label>
          <select
            id="roles"
            name="roles"
            className="w-1/2 p-1 bg-light"
            multiple={true}
            size="3"
            value={roles}
            onChange={onRolesChanged}
          >
            {options}
          </select>
        </div>
        <button
          className="mt-4 p-2 bg-indigo-500 rounded-md mb-4 shadow-black shadow-md text-xl text-dark dark:text-light"
          title="Save"
          onClick={onSaveUserClicked}
          disabled={!canSave}
        >
          SAVE
        </button>
        <button
          className="p-2 bg-red-500 rounded-md shadow-black shadow-md text-xl text-dark dark:text-light "
          title="Delete"
          onClick={onDeleteUserClicked}
        >
          DELETE
        </button>
      </form>
    </>
  );

  return content;
};
export default EditUserForm;

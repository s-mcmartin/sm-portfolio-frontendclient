import { useEffect, useState } from "react";

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
      <p className={errClass}>{error?.data?.message}</p>
      <form onSubmit={onSaveUserClicked}>
        <div>
          <h2>New User</h2>
          <div>
            <button
              className="p-2 bg-indigo-500 rounded-md"
              title="Save"
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
          </div>
          <label htmlFor="username">
            Username: <span>[3-20 letters]</span>
          </label>
          <input
            className=""
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={username}
            onChange={onUsernameChanged}
          />
          <label className="" htmlFor="password">
            Password: <span>[4-12 characters incl. !@#$%]</span>
          </label>
          <input
            className=""
            id="password"
            name="password"
            type="password"
            autoComplete="off"
            value={password}
            onChange={onPasswordChanged}
          />
          <label className="" htmlFor="roles">
            ASSIGNED ROLES:
          </label>
          <select
            id="roles"
            name="roles"
            className=""
            multiple={true}
            size="3"
            value={roles}
            onChange={onRolesChanged}
          >
            {options}
          </select>
        </div>
      </form>
    </>
  );

  return content;
};

export default NewUserForm;

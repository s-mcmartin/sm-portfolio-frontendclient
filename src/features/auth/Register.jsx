import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import AnimatedText from "../../components/animations/AnimatedText";
import Error from "../../components/layout/Error";
import { setCredentials } from "./authSlice";
import { useAddNewUserMutation } from "../users/usersApiSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,20}$/;

const Register = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading: isLoginLoading, isSuccess: isLoginSuccess }] =
    useLoginMutation();
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
    if (isSuccess && isLoginSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/admin");
    }
  }, [isSuccess, isLoginSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      const user = await addNewUser({ username, password, roles });

      if (user) {
        try {
          const { accessToken } = await login({ username, password }).unwrap();
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          if (!err.status) {
            console.log("No server response");
          } else if (err.status === 400) {
            console.log("Missing username or password");
          } else if (err.status === 401) {
            console.log("Unauthorized");
          } else {
            console.log(err.data?.message);
          }
        }
      }
    }
  };

  const content = (
    <>
      {isError && <Error text={error.error} />}
      <header>
        <AnimatedText text="Register" />
        <div className="w-full flex justify-center items-center mb-4">
          <p className="text-2xl">Already have an account?</p>
          <Link to="/register" className="px-2 underline text-2xl">
            Login
          </Link>
        </div>
      </header>
      <main className="flex justify-center items-center w-full px-2">
        <form
          onSubmit={onSaveUserClicked}
          className="flex flex-col p-8 bg-dark dark:bg-light rounded-lg shadow-black shadow-lg w-1/3 md:w-2/3 sm:w-full"
        >
          <label
            htmlFor="username"
            className="text-3xl mb-2 md:text-2xl sm:text-xl font-semibold text-light"
          >
            Username: <span className="text-lg">[3-20 letters]</span>
          </label>
          <input
            className="bg-light/75 dark:bg-dark/75 px-1 py-0.5 rounded-md text-dark dark:text-light text-3xl md:text-2xl sm:text-xl mb-2"
            id="username"
            name="username"
            type="text"
            autoComplete="off"
            value={username}
            onChange={onUsernameChanged}
          />
          <label
            className="text-3xl my-2 md:text-2xl sm:text-xl font-semibold text-light"
            htmlFor="password"
          >
            Password:{" "}
            <span className="text-lg">[4-12 characters incl. !@#$%]</span>
          </label>
          <input
            className="bg-light/75 dark:bg-dark/75 px-1 py-0.5 rounded-md text-dark dark:text-light text-3xl md:text-2xl sm:text-xl mb-2"
            id="password"
            name="password"
            type="password"
            autoComplete="off"
            value={password}
            onChange={onPasswordChanged}
          />

          <button
            className="my-4 p-2 bg-indigo-500 rounded-md shadow-black shadow-md text-2xl text-dark dark:text-light"
            title="Save"
            onClick={onSaveUserClicked}
            disabled={!canSave}
          >
            Sign up
          </button>
          <button
            className="text-xl text-light rounded-md hover:underline"
            title="Back"
            onClick={() => navigate("/login")}
          >
            Back
          </button>
        </form>
      </main>
    </>
  );

  return content;
};

export default Register;

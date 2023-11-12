import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import AnimatedText from "../../components/animations/AnimatedText";
import { PulseLoader } from "react-spinners";
import { setCredentials } from "./authSlice";
import { useAddNewUserMutation } from "../users/usersApiSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,20}$/;

const Register = () => {
  const [errMsg, setErrMsg] = useState("");

  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [
    login,
    {
      isLoading: isLoginLoading,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);
  const [persist, setPersist] = usePersist();

  console.log(loginError);
  console.log(error);
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
      setErrMsg("");
      navigate("/admin");
    }
  }, [isSuccess, isLoginSuccess, navigate]);

  useEffect(() => {
    if (isError && isLoginError) {
      setErrMsg(
        <>
          <p>
            <span className="font-bold">Could not add new user:</span>{" "}
            {error?.data?.message}
          </p>
          <p>
            <span className="font-bold">Login error:</span>{" "}
            {loginError?.data?.message}
          </p>
        </>
      );
    }
    if (isError && !isLoginError) {
      console.log(error);
      setErrMsg(error?.data?.message);
    }
    if (isLoginError && !isError) {
      setErrMsg(loginError?.data?.message);
    }
  }, [isError, isLoginError, error, loginError]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);
  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      const user = await addNewUser({ username, password, roles });
      console.log(user);

      if (user?.data) {
        try {
          const { accessToken } = await login({ username, password }).unwrap();
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
  const content = (
    <>
      <header>
        <AnimatedText text="Register" />
        <div className="w-full flex justify-center items-center mb-4">
          <p className="text-2xl dark:text-light text-dark">
            Already have an account?
          </p>
          <Link
            to="/register"
            className="px-2 underline text-2xl text-primary dark:text-primaryDark"
          >
            Login
          </Link>
        </div>
      </header>
      <main className="flex justify-center items-center w-full px-2">
        <form
          onSubmit={onSaveUserClicked}
          className="flex flex-col p-8 bg-dark dark:bg-light rounded-lg shadow-black shadow-lg w-1/3 md:w-2/3 sm:w-full"
        >
          {isError && <p className="text-red-600 text-2xl"> {errMsg} </p>}

          <label
            htmlFor="username"
            className="text-3xl mb-2 md:text-2xl sm:text-xl font-semibold text-light dark:text-dark"
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
            className="text-3xl my-2 md:text-2xl sm:text-xl font-semibold text-light dark:text-dark"
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
          <label htmlFor="persist">
            <input
              type="checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            <span className="text-2xl md:text-xl sm:text-lg ml-2 dark:text-dark text-light">
              Trust this device
            </span>
          </label>

          <button
            className="my-4 p-2 bg-primary text-light dark:bg-primaryDark rounded-md shadow-black shadow-md text-2xl text-dark dark:text-light"
            title="Save"
            onClick={onSaveUserClicked}
            disabled={!canSave}
          >
            {isLoading || isLoginLoading ? <PulseLoader /> : "Sign Up"}
          </button>
          <button
            className="text-xl text-light rounded-md hover:underline dark:text-dark"
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

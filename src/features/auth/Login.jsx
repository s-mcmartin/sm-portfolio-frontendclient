import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import AnimatedText from "../../components/animations/AnimatedText";
import Loading from "../../components/layout/Loading";
import { setCredentials } from "./authSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  useTitle("SM_Portfolio: Login");
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleUserInput = (e) => {
    setUsername(e.target.value);
  };
  const handlePwdInput = (e) => {
    setPassword(e.target.value);
  };
  const handleToggle = () => setPersist((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/admin");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No server response");
      } else if (err.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
    }
    errRef.current.focus();
  };

  const errClass = errMsg ? "bg-red-300" : "hidden";

  if (isLoading) return <Loading />;

  const content = (
    <section className="h-full mb-24">
      <header>
        <AnimatedText text="Login" />
        <div className="w-full flex justify-center items-center mb-4">
          <p className="text-2xl">Don't have an account?</p>
          <Link to="/register" className="px-2 underline text-2xl">
            Sign up
          </Link>
        </div>
      </header>
      <main className="flex justify-center items-center w-full px-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-8 bg-dark dark:bg-light rounded-lg shadow-black shadow-lg w-1/3 md:w-2/3 sm:w-full"
        >
          <p ref={errRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>
          <label
            htmlFor="username"
            className="text-3xl mb-2 md:text-2xl sm:text-xl font-semibold text-light"
          >
            Username:
          </label>
          <input
            className="bg-light/75 dark:bg-dark/75 px-1 py-0.5 rounded-md text-dark dark:text-light text-3xl md:text-2xl sm:text-xl"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            placeholder=""
            autoComplete="off"
            required
          />
          <label
            htmlFor="password"
            className="text-3xl my-2 md:text-2xl sm:text-xl font-semibold text-light"
          >
            Password:
          </label>
          <input
            className="bg-light/75 dark:bg-dark/75 px-1 py-0.5 rounded-md text-dark dark:text-light text-3xl md:text-2xl sm:text-xl"
            type="password"
            id="password"
            value={password}
            onChange={handlePwdInput}
            required
          />
          <button className="p-2 bg-indigo-500 rounded-md mt-6 mb-2 text-semibold text-3xl md:text-2xl sm:text-xl">
            Sign In
          </button>
          <label htmlFor="persist">
            <input
              type="checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            <span className="text-2xl md:text-xl sm:text-lg ml-2">
              Trust this device
            </span>
          </label>
        </form>
      </main>
    </section>
  );

  return <>{content}</>;
};

export default Login;

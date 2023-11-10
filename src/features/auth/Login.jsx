import { useEffect, useRef, useState } from "react";

import { PulseLoader } from "react-spinners";
import { setCredentials } from "./authSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
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

  if (isLoading) return <PulseLoader />;

  const content = (
    <section className="">
      <header>
        <h1>Admin Login</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <p ref={errRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>
          <label htmlFor="username">Username:</label>
          <input
            className=""
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            className=""
            type="password"
            id="password"
            value={password}
            onChange={handlePwdInput}
            required
          />
          <button className="p-2 bg-indigo-500 rounded-md">Sign In</button>
          <label htmlFor="persist">
            <input
              type="checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trust this device
          </label>
        </form>
      </main>
    </section>
  );

  return <>{content}</>;
};

export default Login;

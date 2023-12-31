import { Link, Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Error from "../../components/layout/Error";
import Loading from "../../components/layout/Loading";
import { selectCurrentToken } from "./authSlice";
import usePersist from "../../hooks/usePersist";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          //const response =
          await refresh();
          //const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    // persist: no
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    console.log("loading");
    content = <Loading />;
  } else if (isError) {
    //persist: yes, token: no
    console.log("error");
    content = (
      <div className="p-8">
        <p className="text-lg bg-red-200 px-2 mb-2">{error?.data?.message}</p>
        <p>
          Please{" "}
          <Link
            to="/login"
            className="underline text-primary dark:text-primaryDark"
          >
            login
          </Link>{" "}
          again.
        </p>
      </div>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;

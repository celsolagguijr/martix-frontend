import { useState } from "react";
import { login } from "../../services/authentication";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../redux/auth";

export const useLogin = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  const { userType } = useSelector(({ auth }) => auth);

  const authenticate = async ({ ...data }) => {
    setIsLoading(true);
    const { success, ...result } = await login({
      type: userType,
      body: { ...data },
    });
    [loginFailed, loginSuccess][Number(success)](result);

    setIsLoading(false);
  };

  const loginSuccess = ({ data }) => {
    setAlert({
      show: true,
      type: "success",
      msg: data.message,
    });

    dispatch(setAuth(data.data.user));
  };

  const loginFailed = ({ error }) => {
    setAlert({
      show: true,
      type: "error",
      msg: error.message,
    });
  };

  return {
    isLoading,
    alert,
    authenticate,
  };
};

import { useState } from "react";
import { useSelector } from "react-redux";
import { signup } from "../../services/registration";

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    msg: "",
  });

  const { userType } = useSelector(({ auth }) => auth);

  const save = async (data) => {
    setLoading(true);
    const { success, ...result } = await signup({
      type: userType,
      body: data,
    });
    [saveFailed, saveSuccess][Number(success)](result);
    setLoading(false);
  };

  const saveSuccess = ({ data }) => {
    setAlert({
      show: true,
      type: "success",
      msg: data.message,
    });
  };

  const saveFailed = ({ error }) => {
    setAlert({
      show: true,
      type: "error",
      msg: error.message,
    });
  };

  return {
    loading,
    alert,
    save,
  };
};

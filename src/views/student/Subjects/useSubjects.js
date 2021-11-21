import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentSubjects } from "../../../services/subjects";
import { loadSubjects } from "../../../redux/studentSubjects";

import { message } from "antd";

export const useSubjects = () => {
  const { subjects } = useSelector(({ studentSubjects }) => studentSubjects);
  const { access_token } = useSelector(({ auth }) => auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getSubjects = async () => {
      const { success, ...result } = await getStudentSubjects({ access_token });

      if (success) {
        dispatch(loadSubjects(result.data));
        return;
      }

      message.error(result.error.msg);
    };

    setLoading(true);
    getSubjects();
    setLoading(false);
  }, []);

  return {
    loading,
    subjects,
  };
};

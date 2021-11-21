import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { subjectDetails } from "../../../services/lessons";
import {
  onSelectSubject,
  loadLessonsFromSelectedSubject,
} from "../../../redux/subjects";
import { message } from "antd";

export const useLessons = ({ subject_id }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { access_token } = useSelector(({ auth }) => auth);
  const { selectedSubject } = useSelector(({ subject }) => subject);

  const { lessons, id, code, description } = selectedSubject ?? {};

  useEffect(() => {
    let isMounted = true;

    const getSubjectDetails = async () => {
      setLoading(true);
      const { success, ...result } = await subjectDetails({
        access_token,
        subject_id,
      });
      [fetchSubjectDetailsError, fetchSubjectDetailsSuccess][Number(success)](
        result,
      );
      setLoading(false);
    };

    if (isMounted && subject_id !== 0) {
      getSubjectDetails();
    }

    return () => {
      isMounted = false;
    };
  }, [subject_id]);

  const fetchSubjectDetailsSuccess = ({ data }) => {
    dispatch(onSelectSubject(data?.subject));
    dispatch(loadLessonsFromSelectedSubject(data.lessons));
  };
  const fetchSubjectDetailsError = ({ error }) => {
    message.error(error.msg);
  };

  return {
    lessons,
    loading,
    subjectDetails: {
      id,
      code,
      description,
    },
  };
};

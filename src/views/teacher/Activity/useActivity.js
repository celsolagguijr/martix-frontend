import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getLessonActivities } from "../../../services/activities";

export const useActivity = ({ lesson_id }) => {
  const [loading, setLoading] = useState(false);
  const [activities, setActivites] = useState([]);
  const { access_token } = useSelector(({ auth }) => auth);

  useEffect(() => {
    let isMounted = true;

    const fetchLessons = async () => {
      setLoading(true);
      const { success, ...result } = await getLessonActivities({
        access_token,
        lesson_id,
      });

      setLoading(false);

      if (!success) {
        return;
      }

      setActivites([...result.data]);
    };

    fetchLessons();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    loading,
    activities,
    setActivites,
  };
};

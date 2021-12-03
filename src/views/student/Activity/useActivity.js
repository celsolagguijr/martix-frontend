import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getActiveActivities } from "../../../services/activities";

export const useActivity = ({ lesson_id }) => {
  const [loading, setLoading] = useState(false);
  const [activities, setActivites] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { access_token } = useSelector(({ auth }) => auth);
  const mounted = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const fetchLessons = async () => {
      setLoading(true);
      const { success, ...result } = await getActiveActivities({
        access_token,
        lesson_id,
      });
      if (!mounted) mounted.current = true;

      setLoading(false);
      setRefresh(false);
      if (!success) {
        return;
      }

      setActivites([...result.data]);
    };

    if (mounted.current && !refresh) return;

    fetchLessons();

    return () => {
      isMounted = false;
    };
  }, [refresh]);

  return {
    loading,
    activities,
    setActivites,
    setRefresh,
  };
};

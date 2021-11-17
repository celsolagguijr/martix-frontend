import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadLessonDetails, loadLessonMaterials } from "../../redux/subjects";
import { lessonMaterials } from "../../services/lessons";
import { message } from "antd";

export const useLessonMaterials = ({ lesson_id }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { lessonMaterials: materialsOfLesson } = useSelector(
    ({ subject }) => subject,
  );
  const { access_token } = useSelector(({ auth }) => auth);

  const { materials, ...details } = materialsOfLesson;

  useEffect(() => {
    let isMounted = true;

    const getLessonMaterials = async () => {
      setLoading(true);
      const { success, ...result } = await lessonMaterials({
        access_token,
        lesson_id,
      });
      [fetchLessonMaterialsError, fetchLessonMaterialsSuccess][Number(success)](
        result,
      );
      setLoading(false);
    };

    if (isMounted && lesson_id !== 0) {
      getLessonMaterials();
    }

    return () => {
      isMounted = false;
    };
  }, [lesson_id]);

  const fetchLessonMaterialsSuccess = ({ data }) => {
    const { Materials, ...rest } = data ?? {};

    dispatch(loadLessonDetails(rest));
    dispatch(loadLessonMaterials(Materials ? Materials : []));
  };
  const fetchLessonMaterialsError = ({ error }) => {
    console.log(error);
  };

  return {
    materials,
    lessonDetails: details,
    loading,
    isSaving,
  };
};

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  loadLessonDetails,
  loadLessonMaterials,
  addMaterials,
  removeMaterial,
} from "../../../redux/subjects";
import {
  lessonMaterials,
  saveMaterials,
  deleteMaterial,
} from "../../../services/lessons";
import { message } from "antd";

export const useLessonMaterials = ({ lesson_id }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { lessonMaterials: materialsOfLesson } = useSelector(
    ({ subject }) => subject,
  );
  const { access_token } = useSelector(({ auth }) => auth);

  const { materials, ...details } = materialsOfLesson ?? {};

  const [form, setForm] = useState({
    title: "",
    description: "",
    fileList: [],
  });

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
    message.error("Failed to fetch lesson");
  };

  const reset = () => {
    setForm({
      title: "",
      description: "",
      fileList: [],
    });
  };

  const save = async () => {
    setIsSaving(true);

    const formData = new FormData();
    formData.append("material", form.fileList[0]);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("lesson_id", lesson_id);

    const { success, ...result } = await saveMaterials({
      access_token,
      body: formData,
    });

    [saveFailed, saveSuccess][Number(success)](result);

    setIsSaving(false);
  };

  const saveSuccess = ({ data }) => {
    const { data: newMaterial, msg } = data;

    dispatch(addMaterials(newMaterial));

    message.success(msg);

    reset();
  };

  const saveFailed = ({ error }) => {
    message.error(error.msg);
  };

  const remove = async (material_id) => {
    setIsSaving(true);

    const { success, ...result } = await deleteMaterial({
      access_token,
      material_id,
    });

    setIsSaving(false);

    if (success) {
      message.success(result.data.msg);
      dispatch(removeMaterial(material_id));
      return;
    }

    message.error(result.error.msg);
  };

  return {
    materials,
    lessonDetails: details,
    loading,
    isSaving,
    form,
    setForm,
    reset,
    save,
    remove,
  };
};

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  subjectDetails,
  saveLesson,
  deleteLesson,
} from "../../../services/lessons";
import {
  onSelectSubject,
  loadLessonsFromSelectedSubject,
  addSubjectLesson,
  updateSubjectLesson,
  deleteSubjectLesson,
} from "../../../redux/subjects";
import { message } from "antd";

const dateNow = moment(new Date(), "YYYY/MM/DD");

export const useLessons = ({ subject_id }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    instructions: "",
    lessonTimeLine: [dateNow, dateNow],
  });
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
    dispatch(onSelectSubject(data.subject));
    dispatch(loadLessonsFromSelectedSubject(data.lessons));
  };
  const fetchSubjectDetailsError = ({ error }) => {
    console.log(error);
  };

  const onChangeFormValue = (obj) => {
    setForm((prev) => ({ ...prev, ...obj }));
  };

  const save = async () => {
    setIsSaving(true);

    const { lessonTimeLine, ...rest } = form;

    const body = {
      ...rest,
      startsAt: moment(lessonTimeLine[0]).format(),
      endsAt: moment(lessonTimeLine[1]).format(),
    };

    const { success, ...result } = await saveLesson({
      access_token,
      subject_id,
      body,
    });

    [saveFailed, saveSuccess][Number(success)]({
      ...result,
      body,
    });
    setIsSaving(false);
  };

  const saveSuccess = ({ data, body }) => {
    if (body.id) {
      dispatch(updateSubjectLesson(body));
    } else {
      dispatch(addSubjectLesson(data.data));
    }
    resetForm();
    message.success(data.msg);
  };

  const saveFailed = ({ error }) => {
    message.success(error.msg);
  };

  const edit = ({ startsAt, endsAt, ...rest }) => {
    const lessonTimeLine = [
      moment(startsAt, "YYYY/MM/DD"),
      moment(endsAt, "YYYY/MM/DD"),
    ];

    setForm((prev) => ({
      ...prev,
      ...rest,
      lessonTimeLine,
    }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      instructions: "",
      lessonTimeLine: [dateNow, dateNow],
    });
  };

  const remove = async (id) => {
    const { success, ...result } = await deleteLesson({
      access_token,
      lesson_id: id,
    });

    if (success) {
      dispatch(deleteSubjectLesson(id));
      message.success(result.data.msg);

      return;
    }

    message.error(result.error.msg);
  };

  return {
    subjectDetails: {
      id,
      code,
      description,
    },
    loading,
    lessons,
    form,
    isSaving,
    onChangeFormValue,
    save,
    edit,
    resetForm,
    remove,
  };
};

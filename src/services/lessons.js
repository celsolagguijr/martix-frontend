import axios from "axios";

export const subjectDetails = async ({ access_token, subject_id }) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `/api/subjects/${subject_id}/lessons`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data,
    };
  }
};

export const saveLesson = async ({ access_token, subject_id, body }) => {
  const method = body?.id ? "PUT" : "POST";
  const url = body?.id
    ? `/api/lessons/${body.id}`
    : `/api/subjects/${subject_id}/lessons`;

  try {
    const { data } = await axios({
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      data: {
        ...body,
      },
    });

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data,
    };
  }
};

export const deleteLesson = async ({ access_token, lesson_id }) => {
  try {
    const { data } = await axios({
      method: "DELETE",
      url: `/api/lessons/${lesson_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data,
    };
  }
};

export const lessonMaterials = async ({ access_token, lesson_id }) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `/api/lessons/${lesson_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data,
    };
  }
};

import axios from "axios";

export const getLessonActivities = async ({ access_token, lesson_id }) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `/api/lessons/${lesson_id}/activities`,
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

export const createActivity = async ({ access_token, lesson_id, body }) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `/api/lessons/${lesson_id}/activities`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      data: body,
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

export const updateActivitiy = async ({
  access_token,
  lesson_id,
  activity_id,
  body,
}) => {
  try {
    const { data } = await axios({
      method: "PUT",
      url: `/api/lessons/${lesson_id}/activities/${activity_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      data: body,
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

export const deleteActivity = async ({
  access_token,
  lesson_id,
  activity_id,
}) => {
  try {
    const { data } = await axios({
      method: "DELETE",
      url: `/api/lessons/${lesson_id}/activities/${activity_id}`,
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

export const deleteUploadedFile = async ({ access_token, id, filename }) => {
  try {
    const { data } = await axios({
      method: "DELETE",
      url: `/api/activities/${id}/${filename}`,
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

export const saveActivityAttachment = async ({
  access_token,
  body,
  activity_id,
}) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `/api/activities/${activity_id}/upload`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${access_token}`,
      },
      data: body,
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

export const getStudentActivities = async ({ access_token, activity_id }) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `/api/activities/${activity_id}/student-activities`,
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

export const getActiveActivities = async ({ access_token, lesson_id }) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `/api/lessons/${lesson_id}/active-activities`,
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

export const saveStudentActivity = async ({
  access_token,
  body,
  activity_id,
}) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `/api/activities/${activity_id}/upload-student-activity`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${access_token}`,
      },
      data: body,
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

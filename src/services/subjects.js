import axios from "axios";

export const saveTeacherSubject = async ({ body, access_token }) => {
  try {
    const { data } = await axios({
      method: body?.id ? "PUT" : "POST",
      url: `/api/subjects`,
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

export const removeSubj = async ({ id, access_token }) => {
  try {
    const { data } = await axios({
      method: "DELETE",
      url: `/api/subjects/${id}`,
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

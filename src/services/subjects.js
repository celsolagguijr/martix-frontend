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

export const getStudentSubjects = async ({ access_token }) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: `/api/subjects/student`,
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

export const joinSubject = async ({ access_token, code }) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `/api/subjects/${code}/join`,
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

export const joinedStudents = async ({ access_token, url }) => {
  try {
    const { data } = await axios({
      method: "GET",
      url,
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

export const updateStatus = async ({ access_token, id, status }) => {
  try {
    const { data } = await axios({
      method: "PUT",
      url: `/api/subjects/student-subject/${id}/${status}`,
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

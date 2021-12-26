import axios from "axios";

export const updateProfile = async ({ access_token, body, type }) => {
  try {
    const { data } = await axios({
      method: "PUT",
      url: `/api/${type}`,
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

export const changePassword = async ({ access_token, body, type }) => {
  try {
    const { data } = await axios({
      method: "PUT",
      url: `/api/${type}/change-password`,
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

export const saveProfilePicture = async ({ access_token, body, type }) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `/api/${type}/change-profile`,
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

import axios from "axios";

export const signup = async ({ type, body }) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `/api/${type}`,
      headers: {
        "Content-Type": "application/json",
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

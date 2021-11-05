import axios from "axios";

export const login = async ({ type, body }) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `/api/${type}/auth`,
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

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  firstName: "",
  lastName: "",
  access_token: null,
  userType: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { userName, firstName, lastName, access_token } = action.payload;

      state.userName = userName;
      state.firstName = firstName;
      state.lastName = lastName;
      state.access_token = access_token;
    },

    logout: (state) => {
      state.access_token = null;
      state.userType = "";
      state.userName = "";
      state.lastName = "";
      state.firstName = "";
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});

const { reducer, actions } = authSlice;

export const { setAuth, setUserType, logout } = actions;

export default reducer;

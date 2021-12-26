import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  contactNumber: "",
  profile: "",
  birthdate: "",
  access_token: null,
  userType: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const {
        userName,
        firstName,
        lastName,
        access_token,
        contactNumber,
        email,
        profile,
        birthdate,
        address,
      } = action.payload;

      state.userName = userName;
      state.firstName = firstName;
      state.lastName = lastName;
      state.contactNumber = contactNumber;
      state.email = email;
      state.profile = profile;
      state.birthdate = birthdate;
      state.address = address;

      state.access_token = access_token;
    },

    logout: (state) => {
      state.access_token = null;
      state.userType = "";
      state.userName = "";
      state.lastName = "";
      state.firstName = "";
      state.contactNumber = "";
      state.email = "";
      state.profile = "";
      state.birthdate = "";
      state.address = "";
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },

    updateState: (state, action) => {
      state.lastName = action.payload.lastName;
      state.firstName = action.payload.firstName;
      state.contactNumber = action.payload.contactNumber;
      state.email = action.payload.email;
      state.birthdate = action.payload.birthdate;
      state.address = action.payload.address;
    },
    updateProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

const { reducer, actions } = authSlice;

export const { setAuth, setUserType, logout, updateState, updateProfile } =
  actions;

export default reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subjects: [],
};

export const subjectSlice = createSlice({
  name: "studentSubjects",
  initialState,
  reducers: {
    loadSubjects: (state, action) => {
      state.subjects = [...action.payload];
    },
    addSubject: (state, action) => {
      state.subjects = [...state.subjects, action.payload];
    },
  },
});

const { reducer, actions } = subjectSlice;

export const { loadSubjects } = actions;

export default reducer;

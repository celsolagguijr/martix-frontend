import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  subjects: [],
  loading: false,
  error: {
    status: false,
    msg: "",
  },
};

export const subjectSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    loadSubjects: (state, action) => {
      state.loading = false;
      state.subjects = [...action.payload];
    },
    onFetchSubjects: (state) => {
      state.loading = true;
      state.error = {
        status: false,
        msg: "",
      };
    },

    onFetchFailed: (state, action) => {
      state.loading = false;
      state.error = {
        status: true,
        msg: action.payload,
      };
    },
    addSubject: (state, action) => {
      state.subjects.push(action.payload);
    },
    updateSubject: (state, action) => {
      const { code, description, index } = action.payload;

      state.subjects[index].code = code;
      state.subjects[index].description = description;
    },
    deleteSubject: (state, action) => {
      const id = action.payload;

      state.subjects = state.subjects.filter((data) => data.id !== id);
    },
  },
});

const { reducer, actions } = subjectSlice;

export const {
  loadSubjects,
  onFetchSubjects,
  onFetchFailed,
  addSubject,
  updateSubject,
  deleteSubject,
} = actions;

export const fetchTeacherSubjects = () => async (dispatch, getState) => {
  const { auth } = getState();

  dispatch(onFetchSubjects());

  try {
    const { data: result } = await axios({
      url: "/api/subjects/teacher",
      method: "GET",
      headers: {
        "Content-type": "Application/json",
        Authorization: `Bearer ${auth.access_token}`,
      },
    });

    dispatch(loadSubjects([...result]));
  } catch ({ errorMessage }) {
    dispatch(onFetchFailed(errorMessage));
  }
};

export default reducer;

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  subjects: [],
  loading: false,
  error: {
    status: false,
    msg: "",
  },
  selectedSubject: {
    id: null,
    code: "",
    description: "",
    lessons: [],
  },
  lessonMaterials: {
    title: "",
    description: "",
    instructions: "",
    startsAt: null,
    endsAt: null,
    materials: [],
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
    onSelectSubject: (state, action) => {
      const { id, code, description } = action.payload;

      state.selectedSubject = {
        ...state.selectedSubject,
        id,
        code,
        description,
      };
    },
    loadLessonsFromSelectedSubject: (state, action) => {
      state.selectedSubject.lessons = [...action.payload];
    },

    addSubjectLesson: (state, action) => {
      state.selectedSubject.lessons.push(action.payload);
    },
    updateSubjectLesson: (state, action) => {
      const index = state.selectedSubject.lessons.findIndex(
        (data) => data.id === action.payload.id,
      );

      state.selectedSubject.lessons[index] = {
        ...action.payload,
      };
    },
    deleteSubjectLesson: (state, action) => {
      state.selectedSubject.lessons = state.selectedSubject.lessons.filter(
        (data) => data.id !== action.payload,
      );
    },
    loadLessonDetails: (state, action) => {
      state.lessonMaterials = {
        ...state.lessonMaterials,
        ...action.payload,
      };
    },

    loadLessonMaterials: (state, action) => {
      state.lessonMaterials = {
        ...state.lessonMaterials,
        materials: [...action.payload],
      };
    },

    addMaterials: (state, actions) => {
      state.lessonMaterials.materials.push(actions.payload);
    },

    removeMaterial: (state, action) => {
      state.lessonMaterials.materials = state.lessonMaterials.materials.filter(
        (data) => data.id !== action.payload,
      );
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
  onSelectSubject,
  loadLessonsFromSelectedSubject,
  addSubjectLesson,
  updateSubjectLesson,
  deleteSubjectLesson,
  loadLessonDetails,
  loadLessonMaterials,
  addMaterials,
  removeMaterial,
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

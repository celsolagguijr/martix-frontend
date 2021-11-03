import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  articles: [],
  loading: false,
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    activateLoading: (state) => {
      state.loading = true;
    },

    deactivateLoading: (state) => {
      state.loading = false;
    },

    loadArticles: (state, action) => {
      state.articles = [...action.payload];
    },
  },
});

const { reducer, actions } = articleSlice;

export const { loadArticles, activateLoading, deactivateLoading } = actions;

export const fetchArticles = () => async (dispatch) => {
  dispatch(activateLoading());

  try {
    const { data } = await axios("https://api.publicapis.org/entries");
    dispatch(loadArticles(data.entries));
    dispatch(deactivateLoading());
  } catch (error) {
    console.log(error);
    dispatch(deactivateLoading());
  }
};

export default reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

//createSlice simplifies the creation of action types and action function, no more declaration of variables because it will automatically generates action types for you
//

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increament: (state) => {
      state.value += 1;
    },
    decreament: (state) => {
      state.value -= 1;
    },
    increamentByAMount: (state, action) => {
      state.value += action.payload;
    },
  },
});

/*

console.log(counterSlice.actions);
  this are action types 

  counter/increament
  counter/decreament
  counter/increamentByAMount

*/

// Extract the action creators object and the reducer
const { actions, reducer } = counterSlice;

// Extract and export each action creator by name
export const { increament, decreament, increamentByAMount } = actions;

// Export the reducer, either as a default or named export
export default reducer;

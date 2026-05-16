import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: []
};

const taskSlice = createSlice({
  name: "task",

  initialState,

  reducers: {

    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(
        item => item.id !== action.payload
      );
    }

  }
});

export const { addTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
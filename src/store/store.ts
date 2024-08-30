import { State } from "@/lib/models";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState: State = {
  currAction: "none",
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
};

const projectSlice = createSlice({
  name: "ProjectState",
  initialState,
  reducers: {
    StartAddProject(state) {
      state.currAction = "add";
      state.selectedProjectId = undefined;
    },
    CancelAddProject(state) {
      state.currAction = "none";
    },
    AddProject(state, action) {
      state.currAction = "none";
      state.projects = [action.payload, ...state.projects];
    },
    SelectProject(state, action) {
      state.currAction = "select";
      state.selectedProjectId = action.payload;
    },
    DeleteProject(state) {
      if (state.selectedProjectId !== undefined) {
        state.projects = state.projects.filter(project => project.id !== state.selectedProjectId);
        state.selectedProjectId = undefined;
      }
      state.currAction = "none";
    },
    AddTask(state, action) {
      state.tasks = [action.payload, ...state.tasks];
    },
    DeleteTask(state, action) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const projectActions = projectSlice.actions;

const store = configureStore({
  reducer: projectSlice.reducer,
});

export default store;

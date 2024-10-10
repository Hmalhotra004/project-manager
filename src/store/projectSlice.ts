import { RootState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: RootState = {
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
      state.projects = [...state.projects, action.payload];
    },
    SelectProject(state, action) {
      state.currAction = "select";
      if (state.selectedProjectId === action.payload) {
        state.currAction = "none";
        state.selectedProjectId = undefined;
      } else {
        state.selectedProjectId = action.payload;
      }
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

export const projectReducer = projectSlice.reducer;

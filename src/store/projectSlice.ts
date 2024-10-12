import { Project, RootState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: RootState = {
  currAction: "none",
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
};

export const fetchProjects = createAsyncThunk("fetchProjects", async () => {
  const response = await axios.get("/api/projects/find");
  const projectData: Project[] = response.data.projects;
  return projectData;
});

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
    AddProject(state) {
      state.currAction = "none";
      // state.projects = [action.payload, ...state.projects];
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
  extraReducers(builder) {
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.projects = [...action.payload, ...state.projects];
    });
  },
});

export const projectActions = projectSlice.actions;

export const projectReducer = projectSlice.reducer;

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
      if (state.projects.length > 0) {
        state.projects = [action.payload, state.projects];
      } else {
        state.projects = [action.payload];
      }
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
  },
});

export const projectActions = projectSlice.actions;

const store = configureStore({
  reducer: projectSlice.reducer,
});

export default store;

// const handleAddTask = (text: string) => {
//   const taskId = Math.random(); //sql id generated later on
//   setProjectState(pv => {
//     const newtask = {
//       text: text,
//       projectId: pv.selectedProjectId,
//       id: taskId,
//     };

//     return {
//       ...pv,
//       tasks: [newtask, ...pv.tasks],
//     };
//   });
// };

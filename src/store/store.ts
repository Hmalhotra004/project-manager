import { configureStore, createSlice } from "@reduxjs/toolkit";

export type Project = {
  id: number;
  title: string | undefined;
  desp: string | undefined;
  date: string;
};

export type ProjectData = {
  title: string | undefined;
  desp: string | undefined;
  date: string;
};

export type Task = {
  text: string;
  projectId: number;
  id: number;
};

type State = {
  currAction: string;
  selectedProjectId: undefined | number;
  projects: Project[];
  tasks: Task[];
};

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
    },
    CancelAddProject(state) {
      state.currAction = "none";
    },
    AddProject(state, action) {
      state.currAction = "none";
      state.projects = [action.payload];
    },
    SelectProject(state, action) {
      state.selectedProjectId = action.payload;
    },
    DeleteProject(state) {
      if (state.selectedProjectId !== undefined) {
        state.projects = state.projects.filter(project => project.id !== state.selectedProjectId);
        state.selectedProjectId = undefined; // Reset selected project ID
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

// const handleDelProject = () => {
//   setProjectState(pv => {
//     return {
//       ...pv,
//       selectedProjectId: undefined,
//       projects: pv.projects.filter(project => project.id !== pv.selectedProjectId),
//     };
//   });
// };

// const handleSelectProject = (id: number) => {
//   setProjectState(pv => {
//     return {
//       ...pv,
//       selectedProjectId: id,
//     };
//   });
// };

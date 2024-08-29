import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
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

// const handleDelTask = (id: number) => {
//   setProjectState(pv => {
//     return {
//       ...pv,
//       tasks: pv.tasks.filter(task => task.id !== id),
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

// const handleAddProject = (projectData: ProjectData) => {
//   const projectId = Math.random(); //sql id generated later on
//   setProjectState(pv => {
//     const newProject = {
//       ...projectData,
//       id: projectId,
//     };

//     return {
//       ...pv,
//       selectedProjectId: undefined,
//       projects: [...pv.projects, newProject],
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

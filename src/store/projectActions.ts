import { Projects } from "@prisma/client";
import axios from "axios";
import { projectActions } from "./projectSlice";

export const fetchProjectsData = () => {
  return async dispatch => {
    const response = await axios.get("/api/projects/find");
    const projectsData: Projects[] = response.data.projects;

    projectsData.forEach(data => {
      dispatch(projectActions.AddProject(data));
    });
  };
};

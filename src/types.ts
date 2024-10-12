import { Projects } from "@prisma/client";

export type Project = {
  Id: string;
  name: string;
  description: string;
  dueDate: string;
};

export type Task = {
  id: string;
  text: string;
  projectId: string;
};

export type RootState = {
  currAction: string;
  selectedProjectId: undefined | string;
  projects: Projects[];
  tasks: Task[];
};

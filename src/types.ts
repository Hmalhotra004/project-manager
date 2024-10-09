export type Project = {
  id: string;
  title: string;
  desp: string;
  date: string;
};

export type ProjectData = {
  title: string;
  desp: string;
  date: string;
};

export type Task = {
  id: string;
  text: string;
  projectId: string;
};

export type RootState = {
  currAction: string;
  selectedProjectId: undefined | string;
  projects: Project[];
  tasks: Task[];
};
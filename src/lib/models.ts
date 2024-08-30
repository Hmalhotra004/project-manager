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

export type State = {
  currAction: string;
  selectedProjectId: undefined | number;
  projects: Project[];
  tasks: Task[];
};

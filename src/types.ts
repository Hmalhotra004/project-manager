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
  id: number;
  text: string;
  projectId: number;
};

export type State = {
  currAction: string;
  selectedProjectId: undefined | number;
  projects: Project[];
  tasks: Task[];
};

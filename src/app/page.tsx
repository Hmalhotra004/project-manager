"use client";
import NewProject from "@/components/NewProject";
import NoProjectSelected from "@/components/NoProjectSelected";
import ProjectsSidebar from "@/components/ProjectsSidebar";
import SelectedProject from "@/components/SelectedProject";
import { useSelector } from "react-redux";

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
  projectId: number | null | undefined;
  id: number;
};

type State = {
  selectedProjectId: undefined | null | number;
  projects: Project[];
  tasks: Task[];
};

const Home = () => {
  const currAction = useSelector((state: { currAction: string }) => state.currAction);
  const projects: Project[] = useSelector((state: { projects: Project[] }) => state.projects);
  const selectedProjectId: undefined | number = useSelector((state: { selectedProjectId: undefined | number }) => state.selectedProjectId);

  let content;

  if (currAction === "none") {
    content = <NoProjectSelected />;
  } else if (currAction === "add") {
    content = <NewProject />;
  } else {
    const selectedProject = projects.find(project => project.id === selectedProjectId);

    content = selectedProject ? <SelectedProject project={selectedProject} /> : <NoProjectSelected />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar />
      {content}
    </main>
  );
};

export default Home;

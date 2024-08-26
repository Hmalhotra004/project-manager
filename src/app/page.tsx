"use client";
import NewProject from "@/components/NewProject";
import NoProjectSelected from "@/components/NoProjectSelected";
import ProjectsSidebar from "@/components/ProjectsSidebar";
import { useState } from "react";

export type Project = {
  id: number;
  title: string | undefined;
  desp: string | undefined;
  date: string | undefined;
};

export type ProjectData = {
  title: string | undefined;
  desp: string | undefined;
  date: string | undefined;
};

type State = {
  selectedProjectId: undefined | null;
  projects: Project[];
};

const Home = () => {
  const [projectState, setProjectState] = useState<State>({
    selectedProjectId: undefined,
    projects: [],
  });

  const handleStartAddProject = () => {
    setProjectState(pv => {
      return {
        ...pv,
        selectedProjectId: null,
      };
    });
  };

  const handleAddProject = (projectData: ProjectData) => {
    const projectId = Math.random(); //sql id generated later on
    setProjectState(pv => {
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...pv,
        selectedProjectId: undefined,
        projects: [...pv.projects, newProject],
      };
    });
  };

  let content;

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
      />
      {content}
    </main>
  );
};

export default Home;

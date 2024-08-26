"use client";
import NewProject from "@/components/NewProject";
import NoProjectSelected from "@/components/NoProjectSelected";
import ProjectsSidebar from "@/components/ProjectsSidebar";
import SelectedProject from "@/components/SelectedProject";
import { useState } from "react";

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

type State = {
  selectedProjectId: undefined | null | number;
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

  const handleCancelAddProject = () => {
    setProjectState(pv => {
      return {
        ...pv,
        selectedProjectId: undefined,
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

  const handleSelectProject = (id: number) => {
    setProjectState(pv => {
      return {
        ...pv,
        selectedProjectId: id,
      };
    });
  };

  let content;

  if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else if (projectState.selectedProjectId === null) {
    content = (
      <NewProject
        onAdd={handleAddProject}
        onCan={handleCancelAddProject}
      />
    );
  } else {
    const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

    content = selectedProject ? <SelectedProject project={selectedProject} /> : <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelect={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
};

export default Home;

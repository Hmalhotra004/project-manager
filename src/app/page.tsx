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
  const [projectState, setProjectState] = useState<State>({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleAddTask = (text: string) => {
    const taskId = Math.random(); //sql id generated later on
    setProjectState(pv => {
      const newtask = {
        text: text,
        projectId: pv.selectedProjectId,
        id: taskId,
      };

      return {
        ...pv,
        tasks: [newtask, ...pv.tasks],
      };
    });
  };

  const handleDelTask = (id: number) => {
    setProjectState(pv => {
      return {
        ...pv,
        tasks: pv.tasks.filter(task => task.id !== id),
      };
    });
  };

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

  const handleDelProject = () => {
    setProjectState(pv => {
      return {
        ...pv,
        selectedProjectId: undefined,
        projects: pv.projects.filter(project => project.id !== pv.selectedProjectId),
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

    content = selectedProject ? (
      <SelectedProject
        project={selectedProject}
        onDel={handleDelProject}
        onAddT={handleAddTask}
        onDelT={handleDelTask}
        tasks={projectState.tasks}
      />
    ) : (
      <NoProjectSelected onStartAddProject={handleStartAddProject} />
    );
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

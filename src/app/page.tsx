"use client";
import Login from "@/components/Login";
import NewProject from "@/components/NewProject";
import NoProjectSelected from "@/components/NoProjectSelected";
import ProjectsSidebar from "@/components/ProjectsSidebar";
import SelectedProject from "@/components/SelectedProject";
import { Project } from "@/lib/models";
import { User } from "firebase/auth";
import { useSelector } from "react-redux";

const Home = () => {
  const currAction = useSelector((state: { project: { currAction: string } }) => state.project.currAction);
  const projects: Project[] = useSelector((state: { project: { projects: Project[] } }) => state.project.projects);
  const selectedProjectId: undefined | number = useSelector((state: { project: { selectedProjectId: undefined | number } }) => state.project.selectedProjectId);
  const user = useSelector((state: { Auth: { user: User | null } }) => state.Auth.user);
  const user1 = true;

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
    <>
      {user == null ? (
        <Login />
      ) : (
        <main className="flex h-screen w-screen gap-8">
          <ProjectsSidebar />
          {content}
        </main>
      )}
    </>
  );
};

export default Home;

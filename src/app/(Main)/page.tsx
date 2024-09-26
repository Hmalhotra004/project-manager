"use client";
import Login from "@/app/(Auth)/login/page";
import NewProject from "@/components/NewProject";
import NoProjectSelected from "@/components/NoProjectSelected";
import SelectedProject from "@/components/SelectedProject";
import { Project } from "@/types";
import { useSelector } from "react-redux";

const Home = () => {
  const currAction = useSelector((state: { project: { currAction: string } }) => state.project.currAction);
  const projects: Project[] = useSelector((state: { project: { projects: Project[] } }) => state.project.projects);
  const selectedProjectId: undefined | number = useSelector((state: { project: { selectedProjectId: undefined | number } }) => state.project.selectedProjectId);
  const user = "";

  let content;

  if (currAction === "none") {
    content = <NoProjectSelected />;
  } else if (currAction === "add") {
    content = <NewProject />;
  } else {
    const selectedProject = projects.find(project => project.id === selectedProjectId);

    content = selectedProject ? <SelectedProject project={selectedProject} /> : <NoProjectSelected />;
  }

  return <>{user == null ? <Login /> : <main>{content}</main>}</>;
};

export default Home;

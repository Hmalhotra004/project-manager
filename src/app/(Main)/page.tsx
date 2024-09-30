"use client";
import NewProject from "@/components/NewProject";
import NoProjectSelected from "@/components/NoProjectSelected";
import SelectedProject from "@/components/SelectedProject";
import { Project } from "@/types";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";

const Home = () => {
  const user = false;
  const currAction = useSelector((state: { project: { currAction: string } }) => state.project.currAction);
  const projects: Project[] = useSelector((state: { project: { projects: Project[] } }) => state.project.projects);
  const selectedProjectId: undefined | number = useSelector((state: { project: { selectedProjectId: undefined | number } }) => state.project.selectedProjectId);

  if (!user) return redirect("/login");

  let content;

  if (currAction === "none") {
    content = <NoProjectSelected />;
  } else if (currAction === "add") {
    content = <NewProject />;
  } else {
    const selectedProject = projects.find(project => project.id === selectedProjectId);

    content = selectedProject ? <SelectedProject project={selectedProject} /> : <NoProjectSelected />;
  }

  return <main>{content}</main>;
};

export default Home;

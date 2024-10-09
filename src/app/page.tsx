"use client";
import NewProject from "@/components/NewProject";
import NoProjectSelected from "@/components/NoProjectSelected";
import ProjectsSidebar from "@/components/ProjectsSidebar";
import SelectedProject from "@/components/SelectedProject";
import { RootState } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const currAction = useSelector((state: RootState) => state.currAction);
  const projects = useSelector((state: RootState) => state.projects);
  const selectedProjectId = useSelector((state: RootState) => state.selectedProjectId);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const response = await fetch("/api/users/check");
      if (!response.ok) {
        router.push("/");
      } else {
        const data = await response.json();
      }
    };
    checkUser();
  }, [router]);

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
    <main className="h-screen flex gap-8">
      <ProjectsSidebar />
      {content}
    </main>
  );
};

export default Home;

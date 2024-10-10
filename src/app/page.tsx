"use client";
import NewProject from "@/components/NewProject";
import NoProjectSelected from "@/components/NoProjectSelected";
import ProjectsSidebar from "@/components/ProjectsSidebar";
import SelectedProject from "@/components/SelectedProject";
import { RootState } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const currAction = useSelector((state: RootState) => state.currAction);
  const projects = useSelector((state: RootState) => state.projects);
  const selectedProjectId = useSelector((state: RootState) => state.selectedProjectId);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        await axios.get("/api/users/check");
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        router.push("/login");
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

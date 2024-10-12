"use client";
import NewProject from "@/components/NewProject";
import NoProjectSelected from "@/components/NoProjectSelected";
import ProjectsSidebar from "@/components/ProjectsSidebar";
import SelectedProject from "@/components/SelectedProject";
import { fetchProjects } from "@/store/projectSlice";
import { AppDispatch } from "@/store/store";
import { RootState } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const [user, setUser] = useState(false);
  const currAction = useSelector((state: RootState) => state.currAction);
  const projects = useSelector((state: RootState) => state.projects);
  const selectedProjectId = useSelector((state: RootState) => state.selectedProjectId);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkUser = async () => {
      try {
        await axios.get("/api/users/check");
        setUser(true);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        router.push("/");
      }
    };
    checkUser();
  }, [router]);

  useEffect(() => {
    if (user) {
      dispatch(fetchProjects());
    }
  }, [dispatch, user]);

  let content;

  if (currAction === "none") {
    content = <NoProjectSelected />;
  } else if (currAction === "add") {
    content = <NewProject />;
  } else {
    const selectedProject = projects.find(project => project.Id === selectedProjectId);
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

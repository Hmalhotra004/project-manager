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
  const [loading, setLoading] = useState(true);
  const currAction = useSelector((state: RootState) => state.currAction);
  const projects = useSelector((state: RootState) => state.projects);
  const selectedProjectId = useSelector(
    (state: RootState) => state.selectedProjectId
  );
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkUser = async () => {
      try {
        await axios.post("/api/users/check");
        setUser(true);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        router.push("/");
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      dispatch(fetchProjects()).finally(() => setLoading(false));
    }
  }, [dispatch, user]);

  let content;

  if (currAction === "none") {
    content = <NoProjectSelected />;
  } else if (currAction === "add") {
    content = <NewProject />;
  } else {
    const selectedProject = projects.find(
      (project) => project.Id === selectedProjectId
    );
    content = selectedProject ? (
      <SelectedProject project={selectedProject} />
    ) : (
      <NoProjectSelected />
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-stone-400">
        <div className="pageloader0"></div>
      </div>
    );
  }

  return (
    <main className="h-screen flex gap-8">
      <ProjectsSidebar />
      {content}
    </main>
  );
};

export default Home;

"use client";
import { projectActions } from "@/store/projectSlice";
import { RootState } from "@/types";
import { UserButton } from "@clerk/nextjs";
import { Projects } from "@prisma/client";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { ScrollArea } from "./ui/scroll-area";

const ProjectsSidebar = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects);
  const selectedProjectId = useSelector((state: RootState) => state.selectedProjectId);

  useEffect(() => {
    async function getProjects() {
      const response = await axios.get("/api/projects/find");
      console.log(response.data.projects);
      const projectData: Projects[] = response.data.projects;
      try {
        projectData.forEach(element => {
          dispatch(projectActions.AddProject(element));
        });
        console.log(projects);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    }
    getProjects();
    console.log(projects);
  }, [dispatch]);

  function handleSelectClick(id: string) {
    dispatch(projectActions.SelectProject(id));
  }

  function handleAddClick() {
    dispatch(projectActions.StartAddProject());
  }

  return (
    <aside className="w-1/3 px-6 pt-8 pb-4 bg-stone-900 text-stone-50 md:w-72 h-screen flex flex-col">
      <h2 className="mb-4 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
      <div>
        <Button onClick={handleAddClick}>+ Add Project</Button>
      </div>
      <ScrollArea className="my-4">
        <ul className="">
          {projects.map(project => {
            const isSelected = project.id === selectedProjectId;
            const cssClass = `w-full text-left px-2 py-1 rounded-sm my-1 transition-colors ${isSelected ? "text-stone-200 bg-stone-800" : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"}`;
            return (
              <li key={project.id}>
                <button
                  onClick={() => handleSelectClick(project.id)}
                  className={cssClass}
                >
                  {project.title}
                </button>
              </li>
            );
          })}
        </ul>
      </ScrollArea>
      <div className="flex items-center justify-end mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};

export default ProjectsSidebar;

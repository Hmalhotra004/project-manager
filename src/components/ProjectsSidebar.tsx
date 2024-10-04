"use client";
import { UserButton } from "@clerk/nextjs";
import { Projects } from "@prisma/client";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import Button from "./Button";
import { ScrollArea } from "./ui/scroll-area";

const ProjectsSidebar = ({ initialProjects }: { initialProjects: Projects[] }) => {
  const [projects, setProjects] = useState<Projects[]>(initialProjects);

  // Function to refetch projects after deletion
  async function fetchProjects() {
    const response = await axios.get("/api/projects/find");
    setProjects(response.data);
  }

  // Function to handle deleting a project
  async function handleDelete(projectId: string) {
    try {
      await axios.post(`/api/projects/delete`, { projectId });
      await fetchProjects(); // Refetch projects after successful deletion
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  }

  return (
    <aside className="w-1/3 px-6 pt-8 pb-4 bg-stone-900 text-stone-50 md:w-72 h-screen flex flex-col">
      <h2 className="mb-4 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
      <div>
        <Button>
          <a href="new-project">+ Add Project</a>
        </Button>
      </div>
      <ScrollArea>
        <ul className="my-4">
          {projects.map(project => {
            let cssClass = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800 transition-colors";

            if (project.projectId === project.projectId) {
              // this should be selected project id
              cssClass += " text-stone-200 bg-stone-800";
            } else {
              cssClass += " text-stone-400";
            }

            return (
              <li
                key={project.projectId}
                className={`${cssClass} flex cursor-pointer`}
              >
                <a href={`${project.projectId}`}>{project.name}</a>
                <button
                  className="ml-auto flex hover:text-rose-800 transition-all"
                  onClick={() => handleDelete(project.projectId)}
                >
                  <Trash2 className="w-5" />
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

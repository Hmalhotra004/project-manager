"use client";
import { UserButton } from "@clerk/nextjs";
import { Projects } from "@prisma/client";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./Button";
import { ScrollArea } from "./ui/scroll-area";

const ProjectsSidebar = () => {
  const [projects, setProjects] = useState<Projects[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const projectIdFromPath = pathSegments.length > 1 ? pathSegments[1] : null;

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.get("/api/projects/find");
        setProjects(response.data.projects);
        router.refresh();
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    fetchProjects();
  }, [router]);

  async function handleDelete(projectId: string) {
    try {
      await axios.post(`/api/projects/delete`, { projectId });
      const response = await axios.get("/api/projects/find");
      setProjects(response.data.projects);
      router.refresh();
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

            cssClass += project.projectId === projectIdFromPath ? " text-stone-200 bg-stone-800" : " text-stone-400";

            return (
              <li
                key={project.projectId}
                className={`${cssClass} flex cursor-pointer`}
              >
                <a
                  href={`${project.projectId}`}
                  className="w-full"
                >
                  {project.name}
                </a>
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

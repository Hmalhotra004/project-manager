"use client";
import Tasks from "@/components/Tasks";
import { Projects } from "@prisma/client";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SelectedProject = ({ params }: { params: { projectId: string } }) => {
  const [project, setProject] = useState<Projects | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const projectIdFromPath = pathSegments.length > 1 ? pathSegments[1] : null;

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await axios.post("/api/projects/details", { projectId: params.projectId });
        setProject(response.data.project);
        router.refresh();
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    fetchProjects();
  }, [router, params.projectId]);

  console.log(projectIdFromPath);
  const handleDelete = async () => {
    if (!projectIdFromPath) return; // Check if projectId exists
    try {
      await axios.post("/api/projects/delete", { projectId: projectIdFromPath }); // API call to delete project
      router.push("/");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (!project) {
    return <p>Loading project details...</p>;
  }

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.name}</h1>
          <button
            onClick={handleDelete}
            className="text-stone-600 hover:text-red-500 transition-colors"
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{project.dueDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">{project.description}</p>
      </header>
      <Tasks />
    </div>
  );
};

export default SelectedProject;

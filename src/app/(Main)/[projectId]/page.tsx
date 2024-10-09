"use client";
import Tasks from "@/components/Tasks";
import { Projects } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SelectedProject = ({ params }: { params: { projectId: string } }) => {
  const [project, setProject] = useState<Projects | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await axios.post("/api/projects/details", { projectId: params.projectId });
        setProject(response.data.project);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        setLoading(false);
      }
    }

    fetchProject();
  }, [params.projectId]);

  const handleDelete = async () => {
    try {
      await axios.post("/api/projects/delete", { projectId: params.projectId });
      router.push("/");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  if (loading) {
    return <p>Loading project details...</p>;
  }

  if (!project) {
    return <p>Project not found.</p>;
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

"use client";

import Loader from "@/components/Loader";
import EditProjectModal from "@/components/modals/EditProjectModal";
import { cn } from "@/lib/utils";
import { Project } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ServerCrash } from "lucide-react";
import { useParams } from "next/navigation";

const ProjectIdPage = () => {
  const params = useParams();
  const queryClient = useQueryClient();

  const {
    data: project,
    isLoading,
    isError,
  } = useQuery<Project>({
    queryKey: [params.projectId],
    queryFn: async () => {
      try {
        const response = await axios.post(`/api/projects/find`, {
          projectId: params.projectId,
        });
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { mutateAsync: StateChange, isPending } = useMutation({
    mutationKey: [params.projectId],
    mutationFn: async () => {
      try {
        await axios.put(`/api/projects/find/`, {
          state: project?.completed,
          id: project?.id,
        });
      } catch (err) {
        console.error(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [params.projectId],
      });
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });

  const isDueDatePassed =
    project?.dueDate && new Date(project.dueDate) < new Date();

  const formattedDate = project?.dueDate;

  if (isLoading) {
    return (
      <section className="flex mx-auto items-center">
        <Loader />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex mx-auto items-center justify-center flex-col gap-y-2">
        <ServerCrash />
        <h2>Something went wrong, please try again.</h2>
      </section>
    );
  }

  return (
    <div className="w-full mt-14 overflow-y-auto scroll-area mx-10">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">
            {project?.name}
          </h1>
          <button
            onClick={() => StateChange()}
            className={cn(
              "text-black transition-colors",
              project?.completed
                ? "hover:text-red-500"
                : "hover:text-emerald-800"
            )}
            disabled={isPending}
          >
            {isPending ? (
              <Loader />
            ) : project?.completed ? (
              "Mark as Not Completed"
            ) : (
              "Mark as Completed"
            )}
          </button>
        </div>

        <p
          className={cn(
            "mb-3 text-stone-400 font-medium",
            isDueDatePassed && "text-rose-600"
          )}
        >
          {formattedDate}
        </p>

        <p className="text-stone-600 whitespace-pre-wrap">
          {project?.description}
        </p>

        <EditProjectModal project={project!}>
          <button className="text-blue-500 mt-1">Edit Project</button>
        </EditProjectModal>
      </header>
      {/* <Tasks /> */}
    </div>
  );
};

export default ProjectIdPage;

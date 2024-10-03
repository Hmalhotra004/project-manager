"use client";
import React from "react";
import { projectActions } from "@/store/projectslice";
import { AppDispatch } from "@/store/store";
import { Project } from "@/types";
import { UserButton } from "@clerk/nextjs";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import { ScrollArea } from "./ui/scroll-area";

const ProjectsSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const projects: Project[] = useSelector((state: { project: { projects: Project[] } }) => state.project.projects);
  const selectedProjectId: undefined | number = useSelector((state: { project: { selectedProjectId: undefined | number } }) => state.project.selectedProjectId);

  function handleSelectClick(id: number) {
    dispatch(projectActions.SelectProject(id));
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

            if (project.id === selectedProjectId) {
              cssClass += " text-stone-200 bg-stone-800";
            } else {
              cssClass += " text-stone-400";
            }

            return (
              <>
                <button
                  onClick={() => handleSelectClick(project.id)}
                  key={project.id}
                  className={`${cssClass} flex`}
                >
                  {project.title}
                  <button className="ml-auto flex hover:text-rose-800 transition-all">
                    <Trash2 className="text-xs" />
                  </button>
                </button>
              </>
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

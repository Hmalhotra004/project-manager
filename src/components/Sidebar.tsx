"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import CreateProjectModal from "./modals/CreateProjectModal";

const Sidebar = () => {
  return (
    <aside className="w-1/3 px-6 pt-8 pb-4 bg-stone-900 text-stone-50 md:w-72 h-screen md:flex md:flex-col 2xs:hidden">
      <h2 className="mb-4 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <CreateProjectModal>
        <Button
          variant="stone"
          onClick={() => {}}
          className="w-fit"
        >
          + Add Project
        </Button>
      </CreateProjectModal>
      <ul className="my-4 overflow-y-auto scroll-area">
        {/* {sortedProjects.map((project) => {
          const isSelected = project.Id === selectedProjectId;
          const cssClass = `w-full text-left px-2 py-1 rounded-sm my-1 transition-colors ${
            isSelected
              ? "text-stone-200 bg-stone-800"
              : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
          }`;

          return (
            <li
              key={project.Id}
              className="flex"
            >
              <button
                onClick={() => handleSelectClick(project.Id)}
                className={`flex-1 ${cssClass} text-left break-words max-w-full`}
              >
                {project.completed ? (
                  <del>{project.name}</del>
                ) : (
                  <span>{project.name}</span>
                )}
              </button>
              <button
                className="ml-2 hover:text-red-500 transition-all"
                disabled={loading}
              >
                {deletingProjectId === project.Id ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <Alert onClick={() => handleDelete(project.Id)} />
                )}
              </button>
            </li>
          );
        })} */}
      </ul>
      <button
        onClick={() => signOut()}
        className="flex text-stone-200 hover:text-stone-400 transition-all items-center justify-center mt-auto"
      >
        <LogOut className="w-5 mr-2" />
        Log out
      </button>
    </aside>
  );
};

export default Sidebar;

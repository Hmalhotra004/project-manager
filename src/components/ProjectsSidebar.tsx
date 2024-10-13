"use client";
import { projectActions } from "@/store/projectSlice";
import { AppDispatch } from "@/store/store";
import { RootState } from "@/types";
import { useClerk } from "@clerk/nextjs";
import axios from "axios";
import { LogOut, Trash } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";

const ProjectsSidebar = () => {
  const [loading, setLoading] = useState(false);
  const projects = useSelector((state: RootState) => state.projects);
  const selectedProjectId = useSelector((state: RootState) => state.selectedProjectId);
  const dispatch = useDispatch<AppDispatch>();
  const { signOut } = useClerk();

  function handleSelectClick(id: string) {
    dispatch(projectActions.SelectProject(id));
  }

  function handleAddClick() {
    dispatch(projectActions.StartAddProject());
  }

  async function handleDelete(id: string) {
    try {
      setLoading(true);
      await axios.post("/api/projects/delete", { id });
      dispatch(projectActions.DeleteProject(id));
    } catch (error) {
      console.error("Failed to delete project:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogOut() {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }

  const sortedProjects = projects.slice().sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    return a.name.localeCompare(b.name);
  });

  return (
    <aside className="w-1/3 px-6 pt-8 pb-4 bg-stone-900 text-stone-50 md:w-72 h-screen flex flex-col">
      <h2 className="mb-4 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
      <div>
        <Button onClick={handleAddClick}>+ Add Project</Button>
      </div>
      <ul className="my-4 overflow-y-auto scroll-area">
        {sortedProjects.map(project => {
          const isSelected = project.Id === selectedProjectId;
          const cssClass = `w-full text-left px-2 py-1 rounded-sm my-1 transition-colors ${isSelected ? "text-stone-200 bg-stone-800" : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"}`;

          return (
            <li
              key={project.Id}
              className="flex"
            >
              <button
                onClick={() => handleSelectClick(project.Id)}
                className={`flex-1 ${cssClass} text-left break-words max-w-full`}
              >
                {project.completed ? <del>{project.name}</del> : <span>{project.name}</span>}
              </button>
              <button
                className="ml-2 hover:text-red-500 transition-all"
                onClick={() => handleDelete(project.Id)}
                disabled={loading}
              >
                <Trash className="w-5" />
              </button>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-center mt-auto">
        <button
          onClick={handleLogOut}
          className="flex text-stone-200 hover:text-stone-400 transition-all"
        >
          <LogOut className="w-5 mr-2" />
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default ProjectsSidebar;

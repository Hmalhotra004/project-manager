import { projectActions } from "@/store/projectSlice";
import { AppDispatch } from "@/store/store";
import { Projects } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Tasks from "./Tasks";

interface Props {
  project: Projects;
}

const SelectedProject = ({ project }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(project.description);

  useEffect(() => {
    setDescription(project.description);
    setIsEditing(false);
  }, [project.description]);

  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  function handleEditToggle() {
    setIsEditing(!isEditing);
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }

  async function handleState() {
    setLoading(true);
    const state = !project.completed;
    await axios.put("/api/projects/state", { projectId: project.Id, state });
    dispatch(projectActions.UpdateState({ id: project.Id, Pstate: state }));
    setLoading(false);
  }

  async function handleDespSave() {
    setLoading(true);
    if (!description.trim()) {
      setDescription(project.description);
      setIsEditing(false);
      return;
    }

    await axios.put("/api/projects/desp", { description, projectId: project.Id });
    dispatch(projectActions.UpdateDesp({ id: project.Id, description }));
    setIsEditing(false);
    setLoading(false);
  }

  return (
    <div className="w-[45rem] mt-16 overflow-y-auto scroll-area">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.name}</h1>
          <button
            onClick={handleState}
            className={`text-black transition-colors ${project.completed ? "hover:text-red-500" : "hover:text-emerald-800"}`}
            disabled={loading}
          >
            {project.completed ? "Mark as Not Completed" : "Mark as Completed"}
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>

        {isEditing ? (
          <div>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              className="w-full p-2 border border-stone-300 rounded"
              rows={4}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleDespSave}
                className="px-4 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 transition-colors"
              >
                {loading ? <div className="spinner" /> : <span>Save</span>}
              </button>
              <button
                onClick={handleEditToggle}
                className="ml-2 text-black hover:text-rose-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-stone-600 whitespace-pre-wrap">{project.description}</p>
        )}

        <button
          onClick={handleEditToggle}
          className="text-blue-500 mt-1"
        >
          {!isEditing && "Edit Description"}
        </button>
      </header>
      <Tasks />
    </div>
  );
};

export default SelectedProject;

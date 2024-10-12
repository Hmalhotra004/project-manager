import { projectActions } from "@/store/projectSlice";
import { Projects } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Tasks from "./Tasks";
import { ScrollArea } from "./ui/scroll-area";

interface Props {
  project: Projects;
}

const SelectedProject = ({ project }: Props) => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(project.description);

  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  function handleDelete() {
    dispatch(projectActions.DeleteProject(project.Id));
  }

  function handleEditToggle() {
    setIsEditing(!isEditing);
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value);
  }

  async function handleDespSave() {
    await axios.post("/api/projects/desp", { description, projectId: project.Id });
    dispatch(projectActions.UpdateProject({ id: project.Id, description }));
    setIsEditing(false);
  }

  return (
    <ScrollArea>
      <div className="w-[45rem] mt-16 ">
        <header className="pb-4 mb-4 border-b-2 border-stone-300">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.name}</h1>
            <button
              onClick={handleDelete}
              className="text-black hover:text-emerald-700 transition-colors"
            >
              Mark as Completed
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
                  Save
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
            className="text-blue-500 mt-2"
          >
            {!isEditing && "Edit Description"}
          </button>
        </header>
        <Tasks />
      </div>
    </ScrollArea>
  );
};

export default SelectedProject;

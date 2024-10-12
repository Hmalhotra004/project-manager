import { projectActions } from "@/store/projectSlice";
import { RootState } from "@/types";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import NewTask from "./NewTask";

const Tasks = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const selectedProjectId = useSelector((state: RootState) => state.selectedProjectId);
  const dispatch = useDispatch();

  async function deleteTask(Id: number) {
    await axios.post("/api/tasks/delete", { Id, projectId: selectedProjectId });
    dispatch(projectActions.DeleteTask(Id));
  }

  const selectedProjectTasks = tasks.filter(task => task.projectId === selectedProjectId);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask />
      {selectedProjectTasks.length === 0 && <p className="text-stone-800 my-4">This project does not have any task yet.</p>}
      {selectedProjectTasks.length > 0 && (
        <ul className="px-4 py-2 mt-8 rounded-md bg-stone-100">
          {selectedProjectTasks.map(task => {
            return (
              <li
                key={task.Id}
                className="flex justify-between my-4"
              >
                <span>{task.name}</span>
                <button
                  onClick={() => deleteTask(task.Id)}
                  className="text-stone-700 hover:text-red-500 transition-colors"
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default Tasks;

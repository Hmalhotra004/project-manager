import { projectActions } from "@/store/projectslice";
import { Task } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import NewTask from "./NewTask";

const Tasks = () => {
  const tasks = useSelector((state: { project: { tasks: Task[] } }) => state.project.tasks);
  const selectedProjectId: undefined | number = useSelector((state: { project: { selectedProjectId: undefined | number } }) => state.project.selectedProjectId);
  const dispatch = useDispatch();

  function deleteTask(id: number) {
    dispatch(projectActions.DeleteTask(id));
  }

  const selectedProjectTasks = tasks.filter(task => task.projectId === selectedProjectId);

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">tasks</h2>
      <NewTask />
      {selectedProjectTasks.length === 0 && <p className="text-stone-800 my-4">This project does not have any task yet.</p>}
      {selectedProjectTasks.length > 0 && (
        <ul className="px-4 py-2 mt-8 rounded-md bg-stone-100">
          {selectedProjectTasks.map(task => {
            return (
              <li
                key={task.id}
                className="flex justify-between my-4"
              >
                <span>{task.text}</span>
                <button
                  onClick={() => deleteTask(task.id)}
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

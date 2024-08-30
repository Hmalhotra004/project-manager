import { Task } from "@/lib/models";
import { projectActions } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import NewTask from "./NewTask";

const Tasks = () => {
  const tasks = useSelector((state: { tasks: Task[] }) => state.tasks);
  const dispatch = useDispatch();

  function deleteTask(id: number) {
    dispatch(projectActions.DeleteTask(id));
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">tasks</h2>
      <NewTask />
      {tasks.length === 0 && <p className="text-stone-800 my-4">This project does not have any task yet.</p>}
      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map(task => {
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

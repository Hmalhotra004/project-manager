import { Task } from "@/lib/models";
import NewTask from "./NewTask";

type Props = {
  onAdd: (e: string) => void;
  onDel: (id: number) => void;
  tasks: Task[];
};

const Tasks = ({ onAdd, onDel, tasks }: Props) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">tasks</h2>
      <NewTask onAdd={onAdd} />
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
                  onClick={() => onDel(task.id)}
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

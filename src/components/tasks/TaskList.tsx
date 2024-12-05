import { type Task as TaskType } from "@prisma/client";
import Task from "./Task";

interface TaskListProps {
  label: string;
  list: TaskType[];
  type: "Active" | "Completed";
}

const TaskList = ({ list, label, type }: TaskListProps) => {
  return (
    <>
      {list.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-stone-600 my-2">{label}</h3>
          <ul className="px-4 py-2 rounded-md bg-stone-200">
            {list.map((task) => (
              <Task
                key={task.id}
                task={task}
                type={type}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default TaskList;

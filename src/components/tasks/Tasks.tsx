"use client";
import { Task } from "@prisma/client";
import NewTask from "./NewTask";
import TaskList from "./TaskList";

interface TasksProps {
  tasks: Task[] | undefined;
  projectId: string | undefined;
}

const Tasks = ({ tasks, projectId }: TasksProps) => {
  const activeTasks = tasks
    ?.filter((task) => !task.completed)
    .sort((a, b) => a.name.localeCompare(b.name));

  const completedTasks = tasks
    ?.filter((task) => task.completed)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask projectId={projectId!} />

      {activeTasks?.length === 0 && completedTasks?.length === 0 ? (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>
      ) : (
        <>
          <TaskList
            label="Active"
            list={activeTasks!}
            type="Active"
          />

          <TaskList
            label="Completed"
            list={completedTasks!}
            type="Completed"
          />
        </>
      )}
    </section>
  );
};

export default Tasks;

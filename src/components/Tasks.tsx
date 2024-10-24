"use client";
import { fetchTasks } from "@/store/projectSlice";
import { AppDispatch } from "@/store/store";
import { RootState } from "@/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewTask from "./NewTask";
import TaskList from "./TaskList";

const Tasks = () => {
  const [loading, setLoading] = useState(false);
  const tasks = useSelector((state: RootState) => state.tasks);
  const selectedProjectId = useSelector(
    (state: RootState) => state.selectedProjectId
  );
  const dispatch = useDispatch<AppDispatch>();

  const selectedProjectTasks = tasks.filter(
    (task) => task.projectId === selectedProjectId
  );

  const activeTasks = selectedProjectTasks
    .filter((task) => !task.completed)
    .sort((a, b) => a.name.localeCompare(b.name));

  const completedTasks = selectedProjectTasks
    .filter((task) => task.completed)
    .sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    async function getTasks() {
      setLoading(true);
      const id = selectedProjectId;
      if (!id?.trim()) {
        return;
      }
      try {
        await dispatch(fetchTasks(id));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    }
    getTasks();
  }, [dispatch, selectedProjectId]);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask />

      {loading ? (
        <div className="loader" />
      ) : (
        <>
          {activeTasks.length === 0 && completedTasks.length === 0 ? (
            <p className="text-stone-800 my-4">
              This project does not have any tasks yet.
            </p>
          ) : (
            <>
              <TaskList
                label="Active Lists"
                list={activeTasks}
                type="Active"
              />

              <TaskList
                label="Completed Tasks"
                list={completedTasks}
                type="Completed"
              />
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Tasks;

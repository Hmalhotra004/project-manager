"use client";
import { fetchTasks, projectActions } from "@/store/projectSlice";
import { AppDispatch } from "@/store/store";
import { RootState } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewTask from "./NewTask";

const Tasks = () => {
  const [loading, setLoading] = useState(true);
  const tasks = useSelector((state: RootState) => state.tasks);
  const selectedProjectId = useSelector((state: RootState) => state.selectedProjectId);
  const dispatch = useDispatch<AppDispatch>();

  async function deleteTask(Id: string) {
    await axios.post("/api/tasks/delete", { Id, projectId: selectedProjectId });
    dispatch(projectActions.DeleteTask(Id));
  }

  const selectedProjectTasks = tasks.filter(task => task.projectId === selectedProjectId);

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
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    }
    getTasks();
  }, [dispatch, selectedProjectId]);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask />
      {loading ? (
        <p className="text-black text-base my-4">Loading Tasks</p>
      ) : (
        <>
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
        </>
      )}
    </section>
  );
};

export default Tasks;

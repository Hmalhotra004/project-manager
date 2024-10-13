"use client";
import { fetchTasks, projectActions } from "@/store/projectSlice";
import { AppDispatch } from "@/store/store";
import { RootState } from "@/types";
import axios from "axios";
import { Check, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewTask from "./NewTask";
import { Separator } from "./ui/separator";

const Tasks = () => {
  const [delLoading, setDelLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const tasks = useSelector((state: RootState) => state.tasks);
  const selectedProjectId = useSelector((state: RootState) => state.selectedProjectId);
  const dispatch = useDispatch<AppDispatch>();

  async function deleteTask(Id: string) {
    try {
      setDelLoading(true);
      await axios.post("/api/tasks/delete", { Id, projectId: selectedProjectId });
      dispatch(projectActions.DeleteTask(Id));
    } catch (error) {
      console.log(error);
    } finally {
      setDelLoading(false);
    }
  }

  async function taskState(Id: string, state: boolean, projectId: string) {
    try {
      setDelLoading(true);
      const Tstate = !state;
      await axios.put("/api/tasks/state", { Id, state: Tstate, projectId });
      dispatch(projectActions.UpdateTaskState({ Id, Tstate, projectId }));
    } catch (error) {
      console.log(error);
    } finally {
      setDelLoading(false);
    }
  }

  const selectedProjectTasks = tasks.filter(task => task.projectId === selectedProjectId);

  const activeTasks = selectedProjectTasks.filter(task => !task.completed).sort((a, b) => a.name.localeCompare(b.name));
  const completedTasks = selectedProjectTasks.filter(task => task.completed).sort((a, b) => a.name.localeCompare(b.name));

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
            <p className="text-stone-800 my-4">This project does not have any tasks yet.</p>
          ) : (
            <>
              {activeTasks.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-stone-600 my-2">Active Tasks</h3>
                  <ul className="px-4 py-2 rounded-md bg-stone-100">
                    {activeTasks.map(task => (
                      <li
                        key={task.Id}
                        className="flex justify-between my-2 text-left break-words"
                      >
                        <span>{task.name}</span>
                        <div className="flex">
                          <button
                            className="hover:text-emerald-600"
                            onClick={() => taskState(task.Id, task.completed, task.projectId)}
                            disabled={delLoading}
                          >
                            <Check className="w-5" />
                          </button>

                          <Separator
                            orientation="vertical"
                            className="mx-2 bg-stone-700"
                          />

                          <button
                            onClick={() => deleteTask(task.Id)}
                            className="text-stone-700 hover:text-red-500 transition-colors"
                            disabled={delLoading}
                          >
                            <Trash className="w-5" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {completedTasks.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-stone-600 my-2">Completed Tasks</h3>
                  <ul className="px-4 py-2 rounded-md bg-stone-100">
                    {completedTasks.map(task => (
                      <li
                        key={task.Id}
                        className="flex justify-between my-2 line-through text-stone-500 text-left break-words"
                      >
                        <span>{task.name}</span>
                        <div className="flex">
                          <button
                            className="hover:text-rose-700 text-stone-700"
                            onClick={() => taskState(task.Id, task.completed, task.projectId)}
                            disabled={delLoading}
                          >
                            <X className="w-5" />
                          </button>

                          <Separator
                            orientation="vertical"
                            className="mx-2 bg-stone-700"
                          />

                          <button
                            onClick={() => deleteTask(task.Id)}
                            className="text-stone-700 hover:text-red-500 transition-colors"
                            disabled={delLoading}
                          >
                            <Trash className="w-5" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Tasks;

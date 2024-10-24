"use client";
import { projectActions } from "@/store/projectSlice";
import { RootState } from "@/types";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { KeyboardEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NewTask = () => {
  const [loading, setLoading] = useState(false);
  const enteredTaskRef = useRef<HTMLInputElement>(null);
  const selectedProjectId = useSelector(
    (state: RootState) => state.selectedProjectId
  );
  const dispatch = useDispatch();

  async function addTask() {
    if (!enteredTaskRef.current) {
      return;
    }

    const name =
      enteredTaskRef.current.value.charAt(0).toUpperCase() +
      enteredTaskRef.current.value.slice(1);

    if (!name.trim()) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/tasks/new", {
        name,
        projectId: selectedProjectId,
      });
      dispatch(projectActions.AddTask(response.data.task));
    } catch (err) {
      console.log(err);
    } finally {
      enteredTaskRef.current.value = "";
      setLoading(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      addTask();
    }
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        ref={enteredTaskRef}
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button
        onClick={addTask}
        className="text-stone-700 hover:text-stone-950 transition-all"
        disabled={loading}
      >
        {loading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <span>Add Task</span>
        )}
      </button>
    </div>
  );
};

export default NewTask;

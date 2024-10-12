import { projectActions } from "@/store/projectSlice";
import { RootState } from "@/types";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const NewTask = () => {
  const enteredTaskRef = useRef<HTMLInputElement>(null);
  const selectedProjectId = useSelector((state: RootState) => state.selectedProjectId);
  const dispatch = useDispatch();

  async function addTask() {
    if (!enteredTaskRef.current) {
      return;
    }

    const taskText = enteredTaskRef.current.value;

    if (!taskText.trim()) {
      return;
    }

    const id = Math.random();

    dispatch(projectActions.AddTask({ id, text: taskText, projectId: selectedProjectId }));

    enteredTaskRef.current.value = "";
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        ref={enteredTaskRef}
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
      />
      <button
        onClick={addTask}
        className="text-stone-700 hover:text-stone-950 transition-all"
      >
        Add Task
      </button>
    </div>
  );
};

export default NewTask;

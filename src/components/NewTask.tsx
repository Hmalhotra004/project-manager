import { projectActions } from "@/store/store";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NewTask = () => {
  const [enteredTask, setEnteredTask] = useState<string>("");

  const selectedProjectId: undefined | number = useSelector((state: { selectedProjectId: undefined | number }) => state.selectedProjectId);
  const dispatch = useDispatch();

  function addTask() {
    if (enteredTask.trim() === "") {
      return;
    }
    const id = Math.random();
    dispatch(projectActions.AddTask({ id: id, text: enteredTask, projectId: selectedProjectId }));
    setEnteredTask("");
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredTask(e.target.value);
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={handleChange}
        value={enteredTask}
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

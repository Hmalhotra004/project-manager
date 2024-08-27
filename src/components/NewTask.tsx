import { ChangeEvent, useState } from "react";

type Props = {
  onAdd: (p: string) => void;
};

const NewTask = ({ onAdd }: Props) => {
  const [enteredTask, setEnteredTask] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredTask(e.target.value);
  };

  const handleClick = () => {
    if (enteredTask.trim() === "") {
      return;
    }

    onAdd(enteredTask);
    setEnteredTask("");
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
        onClick={handleClick}
        className="text-stone-700 hover:text-stone-950 transition-all"
      >
        Add Task
      </button>
    </div>
  );
};

export default NewTask;

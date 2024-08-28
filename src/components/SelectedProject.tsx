import { ProjectData, Task } from "@/app/page";
import Tasks from "./Tasks";

type Props = {
  project: ProjectData;
  onDel: () => void;
  onAddT: (e: string) => void;
  onDelT: (id: number) => void;
  tasks: Task[];
};

const SelectedProject = ({ project, onDel, onAddT, onDelT, tasks }: Props) => {
  const formattedDate = new Date(project.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.title}</h1>
          <button
            onClick={onDel}
            className="text-stone-600 hover:text-stone-950 transition-colors"
          >
            Delete
          </button>
        </div>
        <p className="mb-4 text-stone-400">{formattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">{project.desp}</p>
      </header>
      <Tasks
        onAdd={onAddT}
        onDel={onDelT}
        tasks={tasks}
      />
    </div>
  );
};

export default SelectedProject;

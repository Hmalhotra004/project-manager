import { Project } from "@/app/page";
import { projectActions } from "@/store/store";
import { useDispatch } from "react-redux";
import Button from "./Button";

type Props = {
  projects: Project[];
  onSelect: (id: number) => void;
  selectedProjectId: number | undefined | null;
};

const ProjectsSidebar = ({ projects, onSelect, selectedProjectId }: Props) => {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(projectActions.StartAddProject());
  }

  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
      <div>
        <Button onClick={handleClick}>+ Add Project</Button>
      </div>
      <ul className="mt-4">
        {projects.map(project => {
          let cssClass = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800 transition-colors";

          if (project.id === selectedProjectId) {
            cssClass += " text-stone-200 bg-stone-800";
          } else {
            cssClass += " text-stone-400";
          }

          return (
            <li key={project.id}>
              <button
                onClick={() => onSelect(project.id)}
                className={cssClass}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default ProjectsSidebar;

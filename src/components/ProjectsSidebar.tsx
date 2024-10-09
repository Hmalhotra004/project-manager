import { Project } from "@/lib/models";
import { projectActions } from "@/store/store";
import { UserButton } from "@clerk/nextjs";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";

const ProjectsSidebar = () => {
  const dispatch = useDispatch();

  const projects: Project[] = useSelector((state: { projects: Project[] }) => state.projects);
  const selectedProjectId: undefined | number = useSelector((state: { selectedProjectId: undefined | number }) => state.selectedProjectId);

  function handleSelectClick(id: number) {
    dispatch(projectActions.SelectProject(id));
  }

  function handleAddClick() {
    dispatch(projectActions.StartAddProject());
  }

  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
      <div>
        <Button onClick={handleAddClick}>+ Add Project</Button>
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
                onClick={() => handleSelectClick(project.id)}
                className={cssClass}
              >
                {project.title}
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <UserButton />
      </div>
    </aside>
  );
};

export default ProjectsSidebar;

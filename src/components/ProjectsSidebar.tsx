import { Project } from "@/lib/models";
import { projectActions } from "@/store/projectslice";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";

const ProjectsSidebar = () => {
  const dispatch = useDispatch();

  const projects: Project[] = useSelector((state: {project: { projects: Project[] }}) => state.project.projects);
  const selectedProjectId: undefined | number = useSelector((state: { project: { selectedProjectId: undefined | number } }) => state.project.selectedProjectId);

  function handleSelectClick(id: number) {
    dispatch(projectActions.SelectProject(id));
  }

  function handleAddClick() {
    dispatch(projectActions.StartAddProject());
  }

  return (
    <>
      <aside className="w-1/3 px-6 pt-8 pb-4 bg-stone-900 text-stone-50 md:w-72 h-screen flex flex-col">
        <h2 className="mb-4 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
        <div>
          <Button onClick={handleAddClick}>+ Add Project</Button>
        </div>
        <ul className="my-4 overflow-y-scroll">
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
        <div className="flex items-center justify-end mt-auto">
          <button className="transition-colors text-stone-200 hover:text-stone-400 ml-2 mr-auto">Logout</button>
        </div>
      </aside>
    </>
  );
};

export default ProjectsSidebar;

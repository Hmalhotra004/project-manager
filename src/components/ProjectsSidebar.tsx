import { Project } from "@/lib/models";
import { projectActions } from "@/store/store";
import { BsLayoutSidebar } from "react-icons/bs";
import { PiPlusLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

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
    <>
      <aside className="w-1/3 px-4 py-2 bg-stone-900 text-stone-50 md:w-72">
        {/* <div className="flex items-center justify-end my-4 ">
        <button className="ml-1 mr-auto transition-colors text-stone-200 hover:text-stone-400">
          <Link href="Login">Login</Link>
        </button>

        {/* <button className="transition-colors text-stone-200 hover:text-stone-400">
          <Link href="Signup">Signup</Link>
        </button> 
      </div>*/}
        <div className="flex items-center justify-end mb-4">
          <button className="ml-1 mr-auto text-stone-200">
            <BsLayoutSidebar size={20} />
          </button>

          <button
            className="text-stone-200"
            onClick={handleAddClick}
          >
            <PiPlusLight size={25} />
          </button>
        </div>

        <h2 className="mb-4 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
        {/* <div>
          <Button onClick={handleAddClick}>+ Add Project</Button>
        </div> */}
        {projects.length === 0 && <p className="text-stone-200 my-4">You don&apos;t have any projects </p>}
        <ul className="mt-4">
          {projects.map(project => {
            let cssClass = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800 transition-colors";

            if (project.id === selectedProjectId) {
              cssClass += " text-stone-200 bg-stone-800";
            } else {
              cssClass += " text-stone-400";
            }

            return (
              <li
                key={project.id}
                className="overflow-y-scroll"
              >
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
      </aside>
    </>
  );
};

export default ProjectsSidebar;

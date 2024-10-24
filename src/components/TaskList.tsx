import { cn } from "@/lib/utils";
import { projectActions } from "@/store/projectSlice";
import { AppDispatch } from "@/store/store";
import { RootState } from "@/types";
import { Tasks } from "@prisma/client";
import axios from "axios";
import { Check, LoaderCircle, LucideProps, Trash, X } from "lucide-react";
import { ForwardRefExoticComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionTooltip from "./ActionTooltip";
import { Separator } from "./ui/separator";

interface TaskListProps {
  label: string;
  list: Tasks[];
  type: "Active" | "Completed";
}

const TaskList = ({ label, list, type }: TaskListProps) => {
  const [taskLoadingStates, setTaskLoadingStates] = useState<{
    [key: string]: { updating: boolean; deleting: boolean };
  }>({});
  const dispatch = useDispatch<AppDispatch>();
  const selectedProjectId = useSelector(
    (state: RootState) => state.selectedProjectId
  );

  const setTaskLoadingState = (
    taskId: string,
    updating: boolean,
    deleting: boolean
  ) => {
    setTaskLoadingStates((prevState) => ({
      ...prevState,
      [taskId]: { updating, deleting },
    }));
  };

  async function taskState(Id: string, state: boolean, projectId: string) {
    try {
      setTaskLoadingState(Id, true, false);
      const Tstate = !state;
      await axios.put("/api/tasks/state", { Id, state: Tstate, projectId });
      dispatch(projectActions.UpdateTaskState({ Id, Tstate, projectId }));
    } catch (error) {
      console.log(error);
    } finally {
      setTaskLoadingState(Id, false, false);
    }
  }

  async function deleteTask(Id: string) {
    try {
      setTaskLoadingState(Id, false, true);
      await axios.post("/api/tasks/delete", {
        Id,
        projectId: selectedProjectId,
      });
      dispatch(projectActions.DeleteTask(Id));
    } catch (error) {
      console.log(error);
    } finally {
      setTaskLoadingState(Id, false, false);
    }
  }

  return (
    <>
      {list.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-stone-600 my-2">{label}</h3>
          <ul className="px-4 py-2 rounded-md bg-stone-100">
            {list.map((task) => (
              <li
                key={task.Id}
                className="flex justify-between my-2 text-left break-words"
              >
                <span
                  className={cn(
                    type === "Completed" && "line-through opacity-60"
                  )}
                >
                  {task.name}
                </span>
                <div className="flex">
                  <button
                    className="hover:text-emerald-600"
                    onClick={() =>
                      taskState(task.Id, task.completed, task.projectId)
                    }
                    disabled={taskLoadingStates[task.Id]?.updating || false}
                  >
                    {taskLoadingStates[task.Id]?.updating ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      <IconButton
                        text={
                          type === "Active"
                            ? "Mark as Completed"
                            : "Mark as Not Completed"
                        }
                        icon={type === "Active" ? Check : X}
                      />
                    )}
                  </button>

                  <Separator
                    orientation="vertical"
                    className="mx-2 bg-stone-700"
                  />

                  <button
                    onClick={() => deleteTask(task.Id)}
                    className="text-stone-700 hover:text-red-500 transition-colors"
                    disabled={taskLoadingStates[task.Id]?.deleting || false}
                  >
                    {taskLoadingStates[task.Id]?.deleting ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      <IconButton
                        text="Delete Task"
                        icon={Trash}
                      />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

const IconButton = ({
  text,
  icon: Icon,
}: {
  text: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
}) => {
  return (
    <ActionTooltip label={text}>
      <Icon className="w-5" />
    </ActionTooltip>
  );
};

export default TaskList;

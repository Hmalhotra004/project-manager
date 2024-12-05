import { Project, Task } from "@prisma/client";

export type projectWithTasks = Project & {
  tasks: Task[];
}
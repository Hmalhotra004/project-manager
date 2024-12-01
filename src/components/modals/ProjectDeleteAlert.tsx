"use client";
import { Project } from "@prisma/client";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProjectDeleteAlertProps {
  children: React.ReactNode;
  project: Project;
  deleteFn: () => void;
}

const ProjectDeleteAlert = ({
  children,
  project,
  deleteFn,
}: ProjectDeleteAlertProps) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            Delete {project.name}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            This action cannot be undone. <br />
            This will permanently delete
            <span className="font-bold"> {project.name}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="text-rose-600"
            onClick={deleteFn}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProjectDeleteAlert;

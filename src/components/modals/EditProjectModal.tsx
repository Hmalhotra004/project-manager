"use client";

import FormTextArea from "@/components/auth/FormTextArea";
import DatePicker from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Project } from "@prisma/client";
import { format } from "date-fns";

interface EditProjectModalProps {
  children: React.ReactNode;
  project: Project;
}

const formSchema = z.object({
  desp: z.string().optional(),
  dueDate: z.date().refine((date) => date > new Date(), {
    message: "Due date must be in the future.",
  }),
});

const EditProjectModal = ({ children, project }: EditProjectModalProps) => {
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desp: project.description || "",
      dueDate: new Date(project.dueDate),
    },
  });

  const { mutateAsync: createProject } = useMutation({
    mutationKey: ["projects"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      try {
        console.log(format(values.dueDate, "PP"));
        const response = await axios.patch("/api/projects/find", {
          desp: values.desp,
          date: format(values.dueDate, "PP"),
          id: project.id,
        });
        if (response.status === 200) {
          form.reset();
          setOpen(false);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          form.setError("root", {
            type: "manual",
            message: "Something went wrong",
          });
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", project.id] });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsCreating(true);
    try {
      await createProject(values);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  }

  useEffect(() => {
    form.reset();
    form.setValue("desp", project.description || "");
    form.setValue("dueDate", new Date(project.dueDate));
  }, [project, form]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="desp"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel id="desp">Description</FormLabel>
                  <FormControl>
                    <FormTextArea
                      type="text"
                      disabled={isCreating}
                      field={field}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel id="date">Due Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isCreating}
              >
                {isCreating ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProjectModal;

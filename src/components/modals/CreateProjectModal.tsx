"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import FormInput from "../auth/FormInput";
import FormTextArea from "../auth/FormTextArea";

interface CreateProjectModalProps {
  children: React.ReactNode;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  desp: z.string().optional(),
  dueDate: z.date().optional(),
});

const CreateProjectModal = ({ children }: CreateProjectModalProps) => {
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desp: "",
      dueDate: new Date(),
    },
  });

  const { mutateAsync: createProject } = useMutation({
    mutationKey: ["projects"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      try {
        const response = await axios.post("/api/projects", {
          title: values.title,
          desp: values.desp,
          date: values.dueDate,
        });
        if (response.status === 200) {
          form.reset();
          setOpen(false);
          router.push(`/projects/${response.data.id}`);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 409) {
          const errorData = error.response.data;
          form.setError("title", {
            type: "manual",
            message: errorData,
          });
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
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

  const isLoading = form.formState.isLoading;

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
              name="title"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel id="title">Title</FormLabel>
                  <FormControl>
                    <FormInput
                      id="title"
                      type="text"
                      field={field}
                      disabled={isLoading}
                      fieldState={fieldState}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

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

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isCreating}
              >
                {isCreating ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;

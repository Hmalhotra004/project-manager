"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
                    <Input
                      id="title"
                      type="text"
                      disabled={isCreating}
                      {...field}
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
                    <Textarea
                      id="desp"
                      disabled={isCreating}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <div className="flex gap-x-6 justify-end">
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

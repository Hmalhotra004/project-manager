"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "../Loader";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

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
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desp: "",
      dueDate: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
    } catch (err) {
      console.error(err);
    }
  }

  const isloading = form.formState.isLoading;

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
                      disabled={isloading}
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
                      disabled={isloading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <div className="flex gap-x-6 justify-end">
              {/* <DialogClose>Close</DialogClose> */}
              <Button type="submit">{isloading ? <Loader /> : "Create"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;

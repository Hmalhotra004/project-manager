import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface NewTaskProps {
  projectId: string;
}

const formSchema = z.object({
  task: z.string().min(1),
});

const NewTask = ({ projectId }: NewTaskProps) => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      task: "",
    },
  });

  const { mutateAsync: createTasks } = useMutation({
    mutationKey: [projectId],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      try {
        const response = await axios.post("/api/tasks", {
          name: values.task,
          projectId,
        });
        if (response.status === 200) {
          form.reset();
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
      queryClient.invalidateQueries({ queryKey: [projectId] });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    createTasks(values);
  }

  const isLoading = form.formState.isLoading;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center ml-1"
      >
        <FormField
          name="task"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  disabled={isLoading}
                  {...field}
                  autoComplete="off"
                  className="w-64 px-2 py-1 rounded-sm bg-stone-200 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-stone-700 sm:text-sm sm:leading-6 focus-visible:ring-offset-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          variant="ghost"
          type="submit"
          disabled={isLoading}
          className="text-stone-700 hover:text-stone-950 text-lg"
        >
          Add Task
        </Button>
      </form>
    </Form>
  );
};

export default NewTask;

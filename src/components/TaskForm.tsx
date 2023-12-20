import { Form, useForm, FormProvider } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  SelectContent,
  SelectTrigger,
  Select,
  SelectValue,
  SelectItem,
} from "./ui/select";
import { Button } from "./ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TaskApiService,
  TaskRequestProps,
  TaskResponseProps,
} from "@/service/TaskApiService";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createTaskFormSchema = z.object({
  description: z.string().min(1, "Description is required"),
  situation: z.enum(["COMPLETED", "PENDING"]).optional(),
  image: z.instanceof(File).optional(),
});

type createTaskFormData = z.infer<typeof createTaskFormSchema>;

interface TaskFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taskId?: number;
}

export function TaskForm({ setOpen, taskId }: TaskFormProps) {
  const queryClient = useQueryClient();

  const mutationInsert = useMutation({
    mutationFn: TaskApiService.insertTask,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["todos"] });
    },
  });
  const mutationUpdate = useMutation({
    mutationFn: TaskApiService.updateTask,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["todos"] });
    },
  });

  const methods = useForm<createTaskFormData>({
    defaultValues: taskId
      ? async () => await TaskApiService.getTaskById(taskId)
      : {},
    resolver: zodResolver(createTaskFormSchema),
  });

  async function onSubmit(values: z.infer<typeof createTaskFormSchema>) {
    if (taskId) {
      mutationUpdate.mutate({
        id: taskId,
        ...values,
      } as TaskRequestProps);
    } else {
      mutationInsert.mutate(values);
    }
    toast("Action done successfully!");
    setOpen(false);
  }

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="grid gap-8 py-4"
        {...methods}
      >
        <div className="flex flex-col gap-2">
          <FormField
            control={methods.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Description" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          {taskId && (
            <FormField
              control={methods.control}
              name="situation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status for the task" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PENDING">PENDING</SelectItem>
                      <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={methods.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value?.fileName}
                    onChange={(event) => {
                      const file = event?.target?.files;
                      if (!file) return;

                      field.onChange(file[0]);
                    }}
                    type="file"
                    placeholder="Image"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit"> Save </Button>
      </Form>
    </FormProvider>
  );
}

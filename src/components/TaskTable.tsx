import Tag from "@/components/Tag";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Image, LoaderIcon, Pencil } from "lucide-react";
import { TaskApiService } from "../service/TaskApiService";
import { TaskImageModal } from "./TaskImageModal";
import { TaskModal } from "./TaskModal";
import { toast } from "react-toastify";

export default function TaskTable() {
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: TaskApiService.getAllTask,
  });

  const queryClient = useQueryClient();

  const mutationComplete = useMutation({
    mutationFn: TaskApiService.completeTask,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <div className="col-span-4 row-span-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            data?.map((task) => {
              return (
                <TableRow key={task.id}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    <Tag>{task.situation}</Tag>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row gap-4">
                      <TaskImageModal taskId={task.id}>
                        <button>
                          <Image size={20} />
                        </button>
                      </TaskImageModal>

                      <TaskModal taskId={task.id}>
                        <button>
                          <span className="sr-only">Edit task</span>
                          <Pencil size={20} />
                        </button>
                      </TaskModal>
                      <button
                        onClick={() => {
                          if (task.situation === "COMPLETED") {
                            toast("Task already completed!");
                          }
                          mutationComplete.mutate(task.id);
                        }}
                      >
                        <span className="sr-only">Complete task</span>
                        <Check size={20} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        {isLoading && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} align="center">
                <LoaderIcon className="animate-spin" />
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}

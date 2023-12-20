import { API_URL } from "@/service/api";
import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { TaskApiService } from "@/service/TaskApiService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Image } from "./Image";

interface TaskImageModalProps {
  taskId: number;
  children: ReactNode;
}

export function TaskImageModal({ taskId, children }: TaskImageModalProps) {
  const [open, setOpen] = useState(false);

  const mutationImage = useMutation({
    mutationFn: TaskApiService.getTaskFile,
    onError: (error) => {
      console.log(error);
      toast("The task does not have an image!");
    },
    onSuccess: (image) => {
      setOpen(true);
    },
  });

  return (
    <Dialog modal={true} defaultOpen={false} open={open}>
      <DialogTrigger
        asChild
        onClick={() => {
          mutationImage.mutate(taskId);
        }}
      >
        {children}
      </DialogTrigger>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Image</DialogTitle>
        </DialogHeader>
        {taskId && (
          <Image
            className="w-full h-full"
            src={`${API_URL}/api/v1/task/${taskId}/image`}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

import React, { ReactNode, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { TaskForm } from "./TaskForm";
import { X } from "lucide-react";

interface TaskModalProps {
  taskId?: number;
  children: ReactNode;
}

export function TaskModal({ taskId, children }: TaskModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog modal={true} defaultOpen={false} open={open}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>{!taskId ? "Insert task" : "Update task"}</DialogTitle>
        </DialogHeader>
        <TaskForm taskId={taskId} setOpen={setOpen} />

        <DialogPrimitive.Close
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogContent>
    </Dialog>
  );
}

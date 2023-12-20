import api from "./api";

export interface TaskRequestProps {
  id?: number;
  description: string;
  situation?: "PENDING" | "COMPLETED";
  image?: File;
}

export interface TaskResponseProps {
  id: number;
  description: string;
  situation: "PENDING" | "COMPLETED";
}

async function getAllTask() {
  const { data } = await api.get<TaskResponseProps[]>("/api/v1/task");

  return data;
}

async function getTaskById(id: number) {
  const { data } = await api.get<TaskResponseProps>(`/api/v1/task/${id}`);

  return data;
}

async function insertTask(task: TaskRequestProps) {
  const { data } = await api.post<TaskResponseProps>("/api/v1/task", {
    description: task.description,
    situation: "PENDING",
  } as TaskRequestProps);

  task.image && (await uploadFile(data.id, task.image));

  return data;
}
async function uploadFile(id: number, file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post<TaskResponseProps>(
    `/api/v1/task/${id}/upload`,
    formData
  );

  return data;
}
async function getTaskFile(id: number) {
  const { data } = await api.get<File>(`/api/v1/task/${id}/image`);

  return data;
}

async function updateTask(task: TaskRequestProps) {
  const { data } = await api.put<TaskResponseProps>(
    `/api/v1/task/${task.id}`,
    task
  );

  task.image && (await uploadFile(data.id, task.image));

  return data;
}
async function completeTask(taskId: number) {
  const { data } = await api.post<TaskResponseProps>(
    `/api/v1/task/${taskId}/complete`
  );

  return data;
}

export const TaskApiService = {
  getAllTask,
  completeTask,
  uploadFile,
  getTaskById,
  insertTask,
  getTaskFile,
  updateTask,
};

export type TaskPriority = 1 | 2 | 3 | 4;
export type TaskStatus = "Todo" | "Doing" | "Done";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string | null;
  tags: string[];
  createdAt: string;
  status: TaskStatus;
}

export const taskStatuses: TaskStatus[] = ["Todo", "Doing", "Done"];

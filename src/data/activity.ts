export type ActivityAction =
  | "task_created"
  | "task_edited"
  | "task_moved"
  | "task_deleted";

export interface Activity {
  id: string;
  action: ActivityAction;
  taskTitle: string;
  details?: string;
  timestamp: string;
}

export const actionLabels: Record<ActivityAction, string> = {
  task_created: "Task Created",
  task_edited: "Task Edited",
  task_moved: "Task Moved",
  task_deleted: "Task Deleted",
};

export const actionIcons: Record<ActivityAction, string> = {
  task_created: "➕",
  task_edited: "✏️",
  task_moved: "↔️",
  task_deleted: "🗑️",
};

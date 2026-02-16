import type { Task, TaskPriority } from "../data/kanban";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  draggable: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, task: Task) => void;
}

const priorityLabels: Record<TaskPriority, string> = {
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent",
};

const priorityColors: Record<TaskPriority, string> = {
  1: "bg-gray-200 text-gray-800",
  2: "bg-green-200 text-green-800",
  3: "bg-yellow-200 text-yellow-800",
  4: "bg-red-200 text-red-800",
};

export function TaskCard({
  task,
  onEdit,
  onDelete,
  draggable,
  onDragStart,
}: TaskCardProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div
      draggable={draggable}
      onDragStart={(e) => onDragStart(e, task)}
      className="bg-white rounded-lg border border-gray-200 p-3 cursor-move hover:shadow-md transition space-y-2"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-sm flex-1 break-words">{task.title}</h3>
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-600 transition flex-shrink-0"
          title="Delete"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {task.description && (
        <p className="text-xs text-gray-600 line-clamp-2">{task.description}</p>
      )}

      <div className="flex flex-wrap gap-1">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            priorityColors[task.priority]
          }`}
        >
          {priorityLabels[task.priority]}
        </span>
      </div>

      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        {task.dueDate ? (
          <span
            className={`text-xs ${
              isOverdue ? "text-red-600 font-medium" : "text-gray-500"
            }`}
          >
            {isOverdue ? "Overdue: " : "Due: "}
            {formatDate(task.dueDate)}
          </span>
        ) : (
          <span className="text-xs text-gray-400">No due date</span>
        )}
        <button
          onClick={() => onEdit(task)}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
        >
          Edit
        </button>
      </div>
    </div>
  );
}

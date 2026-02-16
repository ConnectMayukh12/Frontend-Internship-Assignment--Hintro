import { useState, useEffect } from "react";
import type { Task, TaskStatus, TaskPriority } from "../data/kanban";
import { taskStatuses } from "../data/kanban";
import type { Activity } from "../data/activity";
import { TaskCard } from "./TaskCard";
import { TaskModal } from "./TaskModal";
import { ActivityLog } from "./ActivityLog";
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from "../utils/storage";

const priorityLabels: Record<TaskPriority, string> = {
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent",
};

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      return loadFromStorage<Task[]>(STORAGE_KEYS.TASKS, []);
    } catch (error) {
      console.error("Error loading tasks:", error);
      return [];
    }
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">(
    "all",
  );
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [activities, setActivities] = useState<Activity[]>(() => {
    try {
      return loadFromStorage<Activity[]>(STORAGE_KEYS.ACTIVITIES, []);
    } catch (error) {
      console.error("Error loading activities:", error);
      return [];
    }
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.TASKS, tasks);
  }, [tasks]);

  // Save activities to localStorage whenever they change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ACTIVITIES, activities);
  }, [activities]);

  const addActivity = (
    action: "task_created" | "task_edited" | "task_moved" | "task_deleted",
    taskTitle: string,
    details?: string,
  ) => {
    const newActivity: Activity = {
      id: `activity-${Date.now()}`,
      action,
      taskTitle,
      details,
      timestamp: new Date().toISOString(),
    };
    setActivities([newActivity, ...activities].slice(0, 50)); // Keep last 50 activities
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const getTasksByStatus = (status: TaskStatus) => {
    return filteredTasks
      .filter((task) => task.status === status)
      .sort((a, b) => {
        // Sort by due date, with null values last
        if (a.dueDate === null && b.dueDate === null) return 0;
        if (a.dueDate === null) return 1;
        if (b.dueDate === null) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleSaveTask = (
    taskData: Omit<Task, "id" | "createdAt"> & { id?: string },
  ) => {
    if (taskData.id) {
      // Update existing task
      setTasks(
        tasks.map((t) =>
          t.id === taskData.id
            ? {
                ...t,
                ...taskData,
                id: t.id,
                createdAt: t.createdAt,
              }
            : t,
        ),
      );
      addActivity("task_edited", taskData.title);
    } else {
      // Create new task
      const newTask: Task = {
        ...taskData,
        id: `task-${Date.now()}`,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setTasks([...tasks, newTask]);
      addActivity("task_created", taskData.title);
    }
    setShowModal(false);
  };

  const handleDeleteTask = (taskId: string) => {
    const taskToDelete = tasks.find((t) => t.id === taskId);
    if (taskToDelete) {
      addActivity("task_deleted", taskToDelete.title);
    }
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDropOnColumn = (status: TaskStatus) => {
    if (!draggedTask) return;

    if (draggedTask.status === status) {
      setDraggedTask(null);
      return;
    }

    setTasks(
      tasks.map((t) => (t.id === draggedTask.id ? { ...t, status } : t)),
    );
    addActivity(
      "task_moved",
      draggedTask.title,
      `moved from ${draggedTask.status} to ${status}`,
    );
    setDraggedTask(null);
  };

  const handleResetBoard = () => {
    try {
      setTasks([]);
      setActivities([]);
      saveToStorage(STORAGE_KEYS.TASKS, []);
      saveToStorage(STORAGE_KEYS.ACTIVITIES, []);
      setShowResetConfirm(false);
    } catch (error) {
      console.error("Error resetting board:", error);
      setShowResetConfirm(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold">Task Board</h2>
        <button
          onClick={handleAddTask}
          className="rounded-lg bg-black px-6 py-2 text-white font-medium hover:bg-gray-800 transition w-full md:w-auto"
        >
          + New Task
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <input
          type="text"
          placeholder="Search tasks by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2"
        />
        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(
              e.target.value === "all"
                ? "all"
                : (parseInt(e.target.value) as TaskPriority),
            )
          }
          className="rounded-lg border border-gray-300 px-4 py-2"
        >
          <option value="all">All Priorities</option>
          {Object.entries(priorityLabels).map(([val, label]) => (
            <option key={val} value={val}>
              {label}
            </option>
          ))}
        </select>
        <button
          onClick={() => setShowResetConfirm(true)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
        >
          Reset Board
        </button>
      </div>

      {/* Kanban Board and Activity Log */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Board */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {taskStatuses.map((status) => (
              <div
                key={status}
                onDragOver={handleDragOver}
                onDrop={() => handleDropOnColumn(status)}
                className="bg-gray-50 rounded-lg p-4 min-h-[600px] border-2 border-dashed border-gray-200 hover:border-gray-300 transition"
              >
                <h3 className="font-bold text-lg mb-4 text-gray-700">
                  {status}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({getTasksByStatus(status).length})
                  </span>
                </h3>

                <div className="space-y-3">
                  {getTasksByStatus(status).length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <p className="text-sm">No tasks yet</p>
                      <p className="text-xs mt-1">
                        Drag tasks here or create new
                      </p>
                    </div>
                  ) : (
                    getTasksByStatus(status).map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                        draggable={true}
                        onDragStart={handleDragStart}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log */}
        <div>
          <ActivityLog activities={activities} />
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={showModal}
        task={editingTask}
        onClose={() => {
          setShowModal(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
      />

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowResetConfirm(false)}
          ></div>

          <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm mx-4">
            <h2 className="text-xl font-bold mb-2">Reset Board</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to reset the board to initial tasks? This
              action cannot be undone.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleResetBoard}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

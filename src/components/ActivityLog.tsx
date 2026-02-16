import type { Activity } from "../data/activity";
import { actionLabels, actionIcons } from "../data/activity";

interface ActivityLogProps {
  activities: Activity[];
}

export function ActivityLog({ activities }: ActivityLogProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold mb-4">Activity Log</h3>

      {activities.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">No activities yet</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-b-0"
            >
              <span className="text-lg mt-0.5">
                {actionIcons[activity.action]}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {actionLabels[activity.action]}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  "{activity.taskTitle}"
                </p>
                {activity.details && (
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.details}
                  </p>
                )}
              </div>
              <span className="text-xs text-gray-500 flex-shrink-0 whitespace-nowrap">
                {formatTime(activity.timestamp)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

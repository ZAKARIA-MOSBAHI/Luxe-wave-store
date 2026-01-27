import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Check } from "lucide-react";

const NotificationItem = ({ notification, onMarkAsRead }) => {
  const formattedDate = formatDistanceToNow(new Date(notification.createdAt), {
    addSuffix: true,
  });

  return (
    <div
      className={cn(
        "group relative flex items-start gap-3 w-full rounded-xl transition-all duration-200",
        notification.isRead ? "ps-3" : "",
      )}
    >
      {/* Unread indicator dot */}
      {notification.isRead ? null : (
        <div
          className={cn(
            "mt-2 h-2.5 w-2.5 rounded-full shrink-0 transition-all duration-300",
            "bg-red-500 animate-pulse",
          )}
        />
      )}

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <p
          className={cn(
            "text-sm leading-relaxed transition-colors duration-200",
            notification.isRead ? "text-gray-500" : "text-gray-900 font-medium",
          )}
        >
          {notification.message}
        </p>
        <p className="text-xs text-gray-400">{formattedDate}</p>
      </div>

      {/* Mark as read button */}
      {!notification.isRead && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onMarkAsRead(notification.id)}
          aria-label="Mark as read"
        >
          <Check className="h-4 w-4 hover:bg-red-500" />
        </Button>
      )}
    </div>
  );
};

export default NotificationItem;

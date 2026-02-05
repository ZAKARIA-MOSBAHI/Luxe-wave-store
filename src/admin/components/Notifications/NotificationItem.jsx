import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Check, MoreVertical, Trash2 } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { toast } from "sonner";

const notificationItemVariants = {
  compact: {
    TitleFontSize: "text-sm",
    DateFontSize: "text-xs",
  },
  default: {
    TitleFontSize: "text-base",
    DateFontSize: "text-sm",
  },
};

const NotificationItem = ({ notification, className, variant = "default" }) => {
  const { markNotifAsRead, deleteNotif } = useNotifications();
  const formattedDate = formatDistanceToNow(new Date(notification.createdAt), {
    addSuffix: true,
  });
  const onMarkAsRead = async () => {
    const response = await markNotifAsRead(notification._id);
    if (!response.success) {
      toast.error(response.message);
    }
  };
  const onDelete = async () => {
    const response = await deleteNotif(notification._id);
    if (!response.success) {
      toast.error(response.message);
    }
  };

  return (
    <div
      className={cn(
        "group relative flex items-start gap-3 w-full transition-all duration-200",
        notification.isRead ? "ps-3" : "",
        className,
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
            " leading-relaxed transition-colors duration-200",
            notification.isRead ? "text-gray-500" : "text-gray-900 font-medium",
            notificationItemVariants[variant].TitleFontSize,
          )}
        >
          {notification.message}
        </p>
        <p
          className={`text-gray-400 ${notificationItemVariants[variant].DateFontSize}`}
        >
          {formattedDate}
        </p>
      </div>

      {/* Mark as read button */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-gray-200"
            aria-label="Notification actions"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-44">
          {!notification.isRead && (
            <DropdownMenuItem onClick={onMarkAsRead} className="cursor-pointer">
              <Check className="mr-2 h-4 w-4" />
              Mark as read
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            onClick={onDelete}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NotificationItem;

import { Check } from 'lucide-react';

interface NotificationItemProps {
  message: string;
  timestamp: string;
  isRead: boolean;
  onMarkAsRead?: () => void;
}

export function NotificationItem({ message, timestamp, isRead, onMarkAsRead }: NotificationItemProps) {
  return (
    <div
      className={`p-4 rounded-lg border transition-all ${
        isRead
          ? 'bg-white border-gray-200'
          : 'bg-blue-50 border-blue-200'
      }`}
    >
      <div className="flex items-start gap-3">
        {!isRead && (
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
        )}
        <div className="flex-1 min-w-0">
          <p className={`text-sm ${isRead ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
            {message}
          </p>
          <p className="text-xs text-gray-500 mt-1">{timestamp}</p>
        </div>
        {!isRead && (
          <button
            onClick={onMarkAsRead}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            title="Mark as read"
          >
            <Check className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

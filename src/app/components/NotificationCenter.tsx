import { useState } from 'react';
import { Bell } from 'lucide-react';
import { NotificationItem } from './NotificationItem';

type FilterType = 'all' | 'unread' | 'read';

interface Notification {
  id: number;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    message: 'Your adoption request for Rocky has been APPROVED!',
    timestamp: '2 hours ago',
    isRead: false
  },
  {
    id: 2,
    message: 'New pets available at Bogotá Shelter',
    timestamp: '5 hours ago',
    isRead: false
  },
  {
    id: 3,
    message: 'Luna has been adopted by another family',
    timestamp: '1 day ago',
    isRead: true
  },
  {
    id: 4,
    message: 'Reminder: Complete your adoption application for Max',
    timestamp: '1 day ago',
    isRead: false
  },
  {
    id: 5,
    message: 'Happy Tails Shelter updated their profile',
    timestamp: '2 days ago',
    isRead: true
  },
  {
    id: 6,
    message: 'Your message to Second Chance Shelter was delivered',
    timestamp: '3 days ago',
    isRead: false
  },
  {
    id: 7,
    message: 'Welcome to PetMatch! Start browsing available pets',
    timestamp: '1 week ago',
    isRead: true
  },
  {
    id: 8,
    message: 'New match found: Bella matches your preferences',
    timestamp: '3 days ago',
    isRead: false
  }
];

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<FilterType>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const totalCount = notifications.length;

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'read') return n.isRead;
    return true;
  });

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">My Notifications</h1>
          <p className="text-gray-600">
            {unreadCount} unread of {totalCount} total notifications
          </p>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-5 py-2 rounded-lg font-medium transition-all ${
              filter === 'unread'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-5 py-2 rounded-lg font-medium transition-all ${
              filter === 'read'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Read
          </button>
        </div>

        <div className="space-y-3">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <NotificationItem
                key={notification.id}
                message={notification.message}
                timestamp={notification.timestamp}
                isRead={notification.isRead}
                onMarkAsRead={() => handleMarkAsRead(notification.id)}
              />
            ))
          ) : (
            <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">No notifications</h3>
              <p className="text-gray-500 text-sm">
                {filter === 'unread' && 'You have no unread notifications'}
                {filter === 'read' && 'You have no read notifications'}
                {filter === 'all' && 'No notifications to display'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

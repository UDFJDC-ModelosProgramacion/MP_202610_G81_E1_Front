import { User, Heart, MessageSquare, Bell } from 'lucide-react';

export function NotificationSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">🐾</span>
          </div>
          <span className="font-semibold text-lg text-gray-800">PetMatch</span>
        </div>
      </div>

      <nav className="space-y-2">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Heart className="w-5 h-5" />
          <span>My Adoptions</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Messages</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 bg-teal-50 text-teal-700 rounded-lg font-medium relative"
        >
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            5
          </span>
        </a>
      </nav>
    </aside>
  );
}

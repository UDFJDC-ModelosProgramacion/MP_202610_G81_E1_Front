import { User, Bell } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-neutral-200 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🐾</span>
            </div>
            <span className="font-semibold text-xl text-neutral-800">PetMatch</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-neutral-700 hover:text-green-600 transition-colors">Home</a>
            <a href="#" className="text-neutral-500 hover:text-green-600 transition-colors">About</a>
            <a href="#" className="text-neutral-500 hover:text-green-600 transition-colors">Contact</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-neutral-600 hover:text-green-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="hidden sm:inline">My Notifications</span>
          </button>
          <button className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors">
            <User className="w-5 h-5 text-orange-600" />
          </button>
        </div>
      </div>
    </header>
  );
}

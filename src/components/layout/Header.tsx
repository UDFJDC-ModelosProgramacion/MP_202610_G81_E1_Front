import { User, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  variant?: 'solid' | 'transparent';
}

export function Header({ variant = 'solid' }: Readonly<HeaderProps>) {
  const isTransparent = variant === 'transparent';

  const headerClasses = isTransparent
    ? 'absolute top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/10 px-6 py-4'
    : 'bg-white border-b border-neutral-200 px-6 py-4 shadow-sm';

  const logoTextClasses = isTransparent ? 'text-white' : 'text-neutral-800';
  const navLinkClasses = isTransparent
    ? 'text-white/70 hover:text-white transition-colors'
    : 'text-neutral-500 hover:text-orange-600 transition-colors';
  const activeLinkClasses = isTransparent
    ? 'text-white/90 hover:text-white font-medium'
    : 'text-neutral-700 hover:text-orange-600 font-medium';

  const iconClasses = isTransparent ? 'text-white' : 'text-orange-600';
  const buttonBgClasses = isTransparent
    ? 'bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30'
    : 'bg-orange-100 hover:bg-orange-200';

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">🐾</span>
            </div>
            <span className={`font-bold text-xl ${logoTextClasses}`}>PetMatch</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link to="/" className={activeLinkClasses}>Home</Link>
            <Link to="/pets" className={navLinkClasses}>Pets</Link>
            <Link to="/veterinarians" className={navLinkClasses}>Veterinarians</Link>
            <Link to="/test" className={navLinkClasses}>Dev Test</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className={`flex items-center gap-2 transition-colors ${isTransparent ? 'text-white/80 hover:text-white' : 'text-neutral-600 hover:text-orange-600'}`}>
            <Bell className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Notifications</span>
          </button>
          <button className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border ${buttonBgClasses}`}>
            <User className={`w-5 h-5 ${iconClasses}`} />
          </button>
        </div>
      </div>
    </header>
  );
}

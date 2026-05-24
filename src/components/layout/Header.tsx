import { User, Bell, MessageSquare, Star, Calendar, LogOut, Settings, ShieldCheck, Stethoscope } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';

interface HeaderProps {
  variant?: 'solid' | 'transparent';
}

export function Header({ variant = 'solid' }: Readonly<HeaderProps>) {
  const isTransparent = variant === 'transparent';
  const { user, isAuthenticated, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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

  const popoverContentClasses = "w-80 p-0 overflow-hidden rounded-xl border border-gray-100 shadow-2xl animate-in fade-in zoom-in duration-200";

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
            {hasRole('ADMIN') && <Link to="/test" className={navLinkClasses}>Dev Test</Link>}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <button className={`flex items-center gap-2 transition-colors ${isTransparent ? 'text-white/80 hover:text-white' : 'text-neutral-600 hover:text-orange-600'}`}>
                    <div className="relative">
                      <Bell className="w-5 h-5" />
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </div>
                    <span className="hidden sm:inline text-sm">Activities</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className={popoverContentClasses}>
                  <div className="bg-gray-50/50 p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Recent Activities</h3>
                    <p className="text-xs text-gray-500">Quick access to your interactions</p>
                  </div>
                  <div className="flex flex-col max-h-[400px] overflow-y-auto">
                    {/* Common for all logged in users */}
                    <Link to="/notifications" className="flex items-center gap-3 p-4 hover:bg-orange-50 transition-colors group">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Bell className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Notifications</p>
                        <p className="text-xs text-gray-500">View your latest alerts</p>
                      </div>
                    </Link>

                    {/* Veterinarian & Admin options */}
                    {hasRole(['VETERINARIAN', 'ADMIN']) && (
                      <>
                        <Link to="/vaccines" className="flex items-center gap-3 p-4 hover:bg-orange-50 transition-colors group">
                          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <ShieldCheck className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Vaccines</p>
                            <p className="text-xs text-gray-500">Manage vaccine records</p>
                          </div>
                        </Link>
                        <Link to="/medical-histories" className="flex items-center gap-3 p-4 hover:bg-orange-50 transition-colors group">
                          <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                            <Stethoscope className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Medical Histories</p>
                            <p className="text-xs text-gray-500">Check pet health history</p>
                          </div>
                        </Link>
                      </>
                    )}

                    {/* Adopter & Admin options */}
                    {hasRole(['ADOPTER', 'ADMIN']) && (
                      <>
                        <Link to="/send-message" className="flex items-center gap-3 p-4 hover:bg-orange-50 transition-colors group">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                            <MessageSquare className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Send Message</p>
                            <p className="text-xs text-gray-500">Contact shelter owners</p>
                          </div>
                        </Link>
                        <Link to="/reviews" className="flex items-center gap-3 p-4 hover:bg-orange-50 transition-colors group">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <Star className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Reviews</p>
                            <p className="text-xs text-gray-500">Manage your pet reviews</p>
                          </div>
                        </Link>
                      </>
                    )}
                    
                    {/* Admin only options */}
                    {hasRole('ADMIN') && (
                      <Link to="/register-shelter-event" className="flex items-center gap-3 p-4 hover:bg-orange-50 transition-colors group">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Shelter Events</p>
                          <p className="text-xs text-gray-500">Register new events</p>
                        </div>
                      </Link>
                    )}
                  </div>
                  <div className="p-3 bg-gray-50/50 border-t border-gray-100 text-center">
                    <Link to="/test" className="text-xs text-orange-600 font-medium hover:underline">View all modules</Link>
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <button className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border ${buttonBgClasses}`}>
                    <User className={`w-5 h-5 ${iconClasses}`} />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-56 p-2 rounded-xl border border-gray-100 shadow-2xl animate-in fade-in zoom-in duration-200">
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-800 uppercase">
                        {user?.role}
                      </span>
                    </div>
                  </div>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <Link 
              to="/login" 
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                isTransparent 
                ? 'bg-white text-blue-600 hover:bg-blue-50' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
              }`}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

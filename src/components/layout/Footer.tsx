import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🐾</span>
              </div>
              <span className="text-white font-semibold text-xl">PetMatch</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Connecting loving families with pets in need since 2010.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">For Adopters</h4>
            <ul className="space-y-2">
              <li><Link to="/pets" className="hover:text-white transition-colors">Browse Pets</Link></li>
              <li><Link to="/test" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/register-adopter" className="hover:text-white transition-colors">Join Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/register-shelter" className="hover:text-white transition-colors">Register Shelter</Link></li>
              <li><Link to="/veterinarians" className="hover:text-white transition-colors">Veterinarians</Link></li>
              <li><Link to="/test" className="hover:text-white transition-colors">Documentation</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © 2026 PetMatch. All rights reserved. Helping pets find loving homes.
          </p>
        </div>
      </div>
    </footer>
  );
}

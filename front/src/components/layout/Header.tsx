// src/components/Layout/Header.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Menu } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 hover:text-slate-700">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span>Market Gap Finder</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-slate-600 hover:text-slate-900 font-medium">
              Home
            </Link>
            <Link to="/search" className="text-slate-600 hover:text-slate-900 font-medium">
              Search
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 font-medium"
            >
              Docs
            </a>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/search"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
            >
              Start Searching
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-slate-900" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              className="block px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/search"
              className="block px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Search
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Docs
            </a>
            <Link
              to="/search"
              className="block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Searching
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

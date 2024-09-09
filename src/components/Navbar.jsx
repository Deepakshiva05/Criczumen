import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navbarColor, setNavbarColor] = useState('bg-gray-900'); // Initial navbar color (dark)

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
    setNavbarColor('bg-blue-600'); // Change navbar color to blue when closing
  };

  const handleLinkClick = () => {
    closeSidebar(); // Close sidebar when a link is clicked
    setNavbarColor('bg-blue-600'); // Change navbar color to blue when a link is clicked
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`flex items-center justify-between px-4 py-3 ${navbarColor} text-white`}>
        <div className="container mx-auto flex justify-between items-center">
          <Link className="text-2xl font-bold" to="/" onClick={handleLinkClick}>
            CricZUMEN
          </Link>
          <button
            className="text-white focus:outline-none lg:hidden"
            onClick={toggleSidebar}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <Link className="hover:text-gray-300" to="/" onClick={handleLinkClick}>
              Home
            </Link>
            <Link className="hover:text-gray-300" to="/matches" onClick={handleLinkClick}>
              Recent Matches
            </Link>
            <Link className="hover:text-gray-300" to="/ucm" onClick={handleLinkClick}>
              Upcomming Matches
            </Link>
          </div>
        </div>
      </nav>

      {/* Sidebar (Mobile) */}
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 transform z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
        <div className="bg-gray-900 w-64 h-full p-4">
          <button
            className="text-white mb-4"
            onClick={toggleSidebar}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <ul className="space-y-4">
            <li>
              <Link to="/" className="text-white" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/matches" className="text-white" onClick={handleLinkClick}>
                Recent Matches
              </Link>
            </li>
            <li>
              <Link to="/ucm" className="text-white" onClick={handleLinkClick}>
                Upcomming Matches
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom'; // Pastikan react-router-dom sudah terinstal
import Logo from '../assets/Logo_SiMANGGIS.png';

export default function Navbar() {
  return (
    <nav 
      className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 shadow-lg"
    style={{
      background: 'linear-gradient(135deg, #f3e8ff 0%, #fdf2f8 50%, #e0e7ff 100%)'
    }}
    >
      {/* Company Logo */}
      <div className="flex items-center flex-shrink-0 text-white"> 
        <img 
          src={Logo}  
          alt="Company Logo" 
          className="w-auto h-12" 
        />
      </div>

      {/* Navigation Links */}
      <div className="hidden gap-8 md:flex"> 
        <Link 
          to="/" 
          className="font-medium text-gray-700 transition duration-300 hover:text-purple-600"
        >
          Home
        </Link>
        <Link 
          to="/schools" 
          className="font-medium text-gray-700 transition duration-300 hover:text-purple-600"
        >
          Sekolah
        </Link>
        <Link 
          to="/about" 
          className="font-medium text-gray-700 transition duration-300 hover:text-purple-600"
        >
          About
        </Link>
      </div>

      {/* Auth Buttons */}
      <div className="items-center hidden space-x-4 md:flex">
        <Link to="/login" className="px-5 py-2 font-medium text-gray-700 transition duration-300 rounded-full hover:bg-purple-100">
          Login
        </Link>
        <Link to="/register"
          className="px-6 py-2 font-medium text-white transition duration-300 transform rounded-full shadow-md hover:scale-105"
          style={{
            background: 'linear-gradient(to right, #9333ea, #6366f1)',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(to right, #7c3aed, #4f46e5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(to right, #9333ea, #6366f1)';
          }}
        >
          Register
        </Link>
      </div>

      {/* Mobile Menu Button (Hamburger Icon) */}
      <div className="md:hidden">
        <button className="text-gray-700 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
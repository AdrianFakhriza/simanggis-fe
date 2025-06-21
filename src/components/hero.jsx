import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div 
      className="relative flex items-center justify-center min-h-screen px-4"
      style={{
        background: 'linear-gradient(135deg, #f3e8ff 0%, #fdf2f8 50%, #e0e7ff 100%)'
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Welcome Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-3 mb-12 transition-all duration-300 border border-purple-200 rounded-full shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl">
          <Link to="/schools"
           className="font-medium text-purple-600">Statistik Sekolah Terbaru</Link>
          <svg 
            className="w-4 h-4 text-purple-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>

        {/* Main Heading */}
        <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-800 md:text-6xl lg:text-7xl">
          Sistem Monitoring{' '}
          <span 
            className="font-bold text-pink-500"
            style={{
              background: 'linear-gradient(to right, #9333ea, #ec4899, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Makan Bergizi Gratis
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto mb-12 text-xl leading-relaxed text-gray-600 md:text-2xl">
          Monitoring Digital untuk Program Makan Bergizi Gratis yang Lebih Terencana dan Efisien.
        </p>

        {/* CTA Button */}
        <Link
          to="/register" 
          className="relative px-8 py-4 overflow-hidden text-lg font-semibold text-white transition-all duration-300 transform rounded-full shadow-lg hover:shadow-xl hover:scale-105"
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
          Daftar Sekarang
        </Link>

        {/* Decorative Elements */}
        <div className="absolute w-20 h-20 bg-purple-200 rounded-full top-20 left-10 opacity-60 animate-pulse"></div>
        <div className="absolute w-16 h-16 bg-pink-200 rounded-full opacity-50 bottom-32 right-16 animate-bounce"></div>
        <div className="absolute w-12 h-12 bg-indigo-200 rounded-full top-1/2 right-8 opacity-40 animate-pulse"></div>
      </div>
    </div>
  );
}
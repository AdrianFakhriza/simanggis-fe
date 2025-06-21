import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Simple chart component using Canvas API
const SimpleChart = ({ data, labels }) => {
  const canvasRef = React.useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Chart styling
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    const maxValue = Math.max(...data.sudah, ...data.belum, 1);
    
    // Draw grid
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    // Draw lines
    const drawLine = (values, color, fill = false) => {
      if (values.length === 0) return;
      
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      values.forEach((value, index) => {
        const x = padding + (chartWidth / (values.length - 1)) * index;
        const y = padding + chartHeight - (value / maxValue) * chartHeight;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      if (fill) {
        ctx.lineTo(padding + chartWidth, padding + chartHeight);
        ctx.lineTo(padding, padding + chartHeight);
        ctx.closePath();
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      
      ctx.stroke();
      
      // Draw points
      ctx.fillStyle = color;
      values.forEach((value, index) => {
        const x = padding + (chartWidth / (values.length - 1)) * index;
        const y = padding + chartHeight - (value / maxValue) * chartHeight;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fill();
      });
    };
    
    // Draw data
    drawLine(data.sudah, '#9333ea', true);
    drawLine(data.belum, '#ec4899', true);
    
  }, [data, labels]);
  
  return <canvas ref={canvasRef} width={300} height={120} className="w-full h-24" />;
};

export default function SchoolsIndex() {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    const filtered = schools.filter(school =>
      (school.school_name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSchools(filtered);
  }, [searchTerm, schools]);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      setError(null);

      // Ambil data sekolah dari API
      const response = await axios.get('http://127.0.0.1:8000/api/schoolsPublic');
      // Jika response.data.data adalah array sekolah
      const schoolsData = response.data.data || response.data;

      setSchools(schoolsData);
      setFilteredSchools(schoolsData);
      setLoading(false);
    } catch (error) {
      setError('Gagal memuat data sekolah. Silakan coba lagi.');
      setLoading(false);
    }
  };

  const getChartData = (school) => ({
    sudah: (school.dataMingguSudah || []).map(Number),
    belum: (school.dataMingguBelum || []).map(Number),
    labels: school.labelsMinggu || ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
  });

  if (loading) {
    return (
      <div 
        className="flex items-center justify-center min-h-screen"
        style={{
          background: 'linear-gradient(135deg, #f3e8ff 0%, #fdf2f8 50%, #e0e7ff 100%)'
        }}
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-dashed rounded-full animate-spin border-t-purple-600"></div>
          <p className="mt-4 text-lg text-purple-600">Memuat data sekolah...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen px-4 py-16"
      style={{
        background: 'linear-gradient(135deg, #f3e8ff 0%, #fdf2f8 50%, #e0e7ff 100%)'
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 transition-all duration-300 border border-purple-200 rounded-full shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl">
            <span className="font-medium text-purple-600">Data Sekolah Terkini</span>
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19c-5 0-8-4-8-9s4-9 9-9 9 4 9 9-4 9-9 9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9l3 3L22 2" />
            </svg>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-800 md:text-5xl lg:text-6xl">
            Data{' '}
            <span 
              className="font-bold"
              style={{
                background: 'linear-gradient(to right, #9333ea, #ec4899, #6366f1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Sekolah
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto mb-8 text-lg leading-relaxed text-gray-600 md:text-xl">
            Berikut adalah daftar sekolah beserta statistik jumlah guru, kelas, siswa, feedback, dan distribusi makan gratis.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-md p-4 mx-auto mb-8 bg-red-100 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Search Section */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari nama sekolah..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 text-gray-900 transition-all duration-300 border border-purple-200 rounded-full shadow-lg bg-white/80 backdrop-blur-sm focus:ring-4 focus:ring-purple-200 focus:border-purple-400"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Schools Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredSchools.map((school) => (
            <div
              key={school.school_id}
              className="overflow-hidden transition-all duration-500 border border-purple-100 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl hover:-translate-y-2 group"
            >
              {/* Chart Section */}
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-purple-600">{school.siswaSudahMakan || 0}</span>
                    <span className="block text-sm text-gray-500">Sudah</span>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-pink-600">{school.siswaBelumMakan || 0}</span>
                    <span className="block text-sm text-gray-500">Belum</span>
                  </div>
                </div>
                <div className="h-24">
                  <SimpleChart data={getChartData(school)} labels={school.labelsMinggu} />
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-purple-600">
                  {school.school_name}
                </h3>
                <p className="mb-4 text-sm text-gray-500">{school.address || '-'}</p>
                
                {/* Stats Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 text-xs font-medium text-purple-800 bg-purple-100 rounded-full">
                    Guru: {school.users?.filter(u => u.role === 'guru').length || 0}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                    Kelas: {school.classes?.length || 0}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
                    Siswa: {school.students?.length || 0}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium text-pink-800 bg-pink-100 rounded-full">
                    Feedback: {school.feedback?.length || 0}
                  </span>
                  <span className="px-3 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full">
                    Distribusi: {school.mealDistributions?.length || 0}
                  </span>
                </div>

                {/* Action Button */}
                <Link
                  to={`/schools/${school.school_id}`}
                  className="block w-full py-3 font-semibold text-center text-white transition-all duration-300 transform rounded-full shadow-lg hover:scale-105"
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
                  Lihat Detail
                </Link>
              </div>
            </div>  
          ))}
        </div>

        {/* No Results */}
        {filteredSchools.length === 0 && searchTerm && (
          <div className="py-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-purple-100 rounded-full">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291.94-5.709 2.291" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Tidak ada sekolah ditemukan</h3>
            <p className="text-gray-500">Coba ubah kata kunci pencarian Anda</p>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="absolute w-20 h-20 bg-purple-200 rounded-full pointer-events-none top-20 left-10 opacity-60 animate-pulse"></div>
        <div className="absolute w-16 h-16 bg-pink-200 rounded-full opacity-50 pointer-events-none bottom-32 right-16 animate-bounce"></div>
        <div className="absolute w-12 h-12 bg-indigo-200 rounded-full pointer-events-none top-1/2 right-8 opacity-40 animate-pulse"></div>
      </div>
    </div>
  );
}
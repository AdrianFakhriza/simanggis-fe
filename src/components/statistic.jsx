import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const Statistic = () => {
  const [selectedFilter, setSelectedFilter] = useState('minggu');
  const [stats, setStats] = useState({ siswaSudahMakan: 0, siswaBelumMakan: 0 });
  const [dataStatistik, setDataStatistik] = useState({ minggu: { data: [] }, bulan: { data: [] }, tahun: { data: [] } });
  const [totalData, setTotalData] = useState({ sekolah: 0, guru: 0, siswa: 0 });


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/statistics')
      .then((response) => {
        const res = response.data.data;

        const totalSiswa = res.total.siswa;
        const sudahHariIni = res.total.siswa_sudah_makan_hari_ini;

        setStats({
          siswaSudahMakan: sudahHariIni,
          siswaBelumMakan: totalSiswa - sudahHariIni
        });

        setTotalData({
          sekolah: res.total.sekolah,
          guru: res.total.guru,
          siswa: res.total.siswa
        });


        // Format data for charts
        const mingguData = res.mingguan.labels.map((label, index) => ({
          name: label,
          sudah: parseInt(res.mingguan.sudah[index]),
          belum: parseInt(res.mingguan.belum[index])
        }));

        const bulanData = res.bulanan.labels.map((label, index) => ({
          name: label,
          sudah: parseInt(res.bulanan.sudah[index]),
          belum: parseInt(res.bulanan.belum[index])
        }));

        const tahunData = res.tahunan.labels.map((label, index) => ({
          name: label,
          sudah: parseInt(res.tahunan.sudah[index]),
          belum: parseInt(res.tahunan.belum[index])
        }));

        setDataStatistik({
          minggu: { data: mingguData },
          bulan: { data: bulanData },
          tahun: { data: tahunData }
        });
      })
      .catch((error) => {
        console.error("Error fetching statistics:", error);
      });
  }, []);

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="p-4 border shadow-xl border-purple-200/50 rounded-xl backdrop-blur-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)'
          }}
        >
          <p className="mb-2 text-sm font-bold text-gray-800">{`📅 ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="flex items-center gap-2 text-sm font-medium" style={{ color: entry.color }}>
              <span className="text-lg">{entry.dataKey === 'sudah' ? '✅' : '⏳'}</span>
              {`${entry.dataKey === 'sudah' ? 'Sudah Makan' : 'Belum Makan'}: ${entry.value} siswa`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <section className="relative py-20 text-center bg-blue-100"
    style={{
        background: 'linear-gradient(135deg, #f3e8ff 0%, #fdf2f8 50%, #e0e7ff 100%)'
      }}>
        
      <div className="max-w-4xl px-4 mx-auto">
        <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
          Memantau Nutrisi Siswa di Seluruh Indonesia
        </h2>
        <p className="mb-12 text-lg text-gray-700 md:text-xl">
          Platform monitoring makan bergizi gratis yang membantu memastikan setiap siswa mendapat nutrisi yang dibutuhkan. Data real-time untuk transparansi dan akuntabilitas program:
        </p>

        {/* Statistics from API */}
        <div className="grid grid-cols-1 mb-12 overflow-hidden border border-purple-200 divide-x divide-purple-200 shadow-md md:grid-cols-3 rounded-xl bg-white/70 backdrop-blur-sm">
        <div className="px-6 py-8 text-center">
          <p className="text-4xl font-bold text-purple-700">{totalData.sekolah}</p>
          <p className="mt-2 text-sm text-gray-600">Sekolah Terdaftar</p>
        </div>
        <div className="px-6 py-8 text-center">
          <p className="text-4xl font-bold text-pink-600">{totalData.guru}</p>
          <p className="mt-2 text-sm text-gray-600">Guru Terlibat</p>
        </div>
        <div className="px-6 py-8 text-center">
          <p className="text-4xl font-bold text-indigo-600">{totalData.siswa}</p>
          <p className="mt-2 text-sm text-gray-600">Siswa Terdaftar</p>
        </div>
      </div>
      
      </div>
    </section>

    
  
    <div 
      className="relative p-8 overflow-hidden border shadow-2xl rounded-2xl backdrop-blur-sm border-purple-200/30"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 50%, rgba(240,245,255,0.9) 100%)'
      }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute w-24 h-24 rounded-full bg-purple-200/30 -top-4 -right-4 animate-pulse"></div>
      <div className="absolute w-16 h-16 rounded-full bg-pink-200/30 top-1/2 -left-4 animate-bounce"></div>
      <div className="absolute w-12 h-12 rounded-full bg-indigo-200/30 bottom-8 right-8 animate-pulse"></div>

      <div className="relative z-10">
        <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
          <div>
            <h3 
              className="mb-2 text-2xl font-bold"
              style={{
                background: 'linear-gradient(to right, #9333ea, #ec4899, #6366f1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Statistik Makan Bergizi Gratis
            </h3>
            <p className="text-lg text-gray-600">Monitor data siswa yang sudah & belum mendapatkan makan bergizi gratis</p>
          </div>
          <div>
            <select 
              id="statistikFilter" 
              className="px-4 py-3 text-sm font-medium transition-all duration-300 border-2 border-purple-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:shadow-lg"
              value={selectedFilter}
              onChange={handleFilterChange}
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)'
              }}
            >
              <option value="minggu">📅 Minggu Ini</option>
              <option value="bulan">📊 Bulan Ini</option>
              <option value="tahun">📈 Tahun Ini</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
          <div 
            className="p-6 transition-all duration-300 border shadow-lg rounded-xl border-purple-200/30 hover:shadow-xl hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #9333ea 0%, #6366f1 100%)'
            }}
          >
            <div className="flex items-center justify-between text-white">
              <div>
                <span className="text-3xl font-bold">{stats.siswaSudahMakan}</span>
                <p className="mt-1 font-medium text-purple-100">Siswa Sudah Mendapat Makan Bergizi Gratis Hari Ini</p>
              </div>
              <div className="text-4xl opacity-80">✅</div>
            </div>
          </div>
          <div 
            className="p-6 transition-all duration-300 border shadow-lg rounded-xl border-pink-200/30 hover:shadow-xl hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)'
            }}
          >
            <div className="flex items-center justify-between text-white">
              <div>
                <span className="text-3xl font-bold">{stats.siswaBelumMakan}</span>
                <p className="mt-1 font-medium text-pink-100">Siswa Belum Mendapat Makan Bergizi Gratis Hari Ini</p>
              </div>
              <div className="text-4xl opacity-80">⏳</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div 
        className="relative p-6 border shadow-lg h-96 rounded-xl border-purple-200/30"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)'
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dataStatistik[selectedFilter]?.data || []}
            margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
          >
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '14px',
                color: '#374151',
                fontWeight: '600'
              }}
            />
            <Line
              type="monotone"
              dataKey="sudah"
              stroke="#9333ea"
              strokeWidth={3}
              dot={{ fill: '#9333ea', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: '#9333ea', strokeWidth: 2, fill: '#ffffff' }}
              name="✅ Sudah Makan"
            />
            <Line
              type="monotone"
              dataKey="belum"
              stroke="#ec4899"
              strokeWidth={3}
              dot={{ fill: '#ec4899', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: '#ec4899', strokeWidth: 2, fill: '#ffffff' }}
              name="⏳ Belum Makan"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    </>
  );
};

export default Statistic;

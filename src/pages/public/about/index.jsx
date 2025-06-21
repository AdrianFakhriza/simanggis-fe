import React from 'react';

export default function About() {
  const teamMembers = [
    {
      name: "Adib Muhammad Zain",
      universitas: "Universitas Nurul Jadid",
      role: "Backend Developer",
      avatar: "https://simanggis.pro/foto/adib.png",
    },
    {
      name: "Muhammad Efendi Vivria",
      universitas: "Universitas Muhammadiyah Jakarta",
      role: "Frontend Developer",
      avatar: "https://simanggis.pro/foto/pendi.jpg",
    },
    {
      name: "Adrian Fakhriza Hakim",
      universitas: "UPN Veteran Jakarta",
      role: "Backend Developer",
      avatar: "https://simanggis.pro/foto/adrian.jpg",
    },
    {
      name: "Aditya Ega Pratama",
      universitas: "UPN Veteran Jakarta",
      role: "Backend Developer",
      avatar: "https://simanggis.pro/foto/ega.jpg",
    },
    {
      name: "Najlaa Maharani Dewi Tiara G.",
      universitas: "Universitas Muhammadiyah Jakarta",
      role: "Frontend Developer",
      avatar: "https://simanggis.pro/foto/najla.jpg",
    }
  ];

  return (
    <div 
      className="relative min-h-screen px-4 py-16"
      style={{
        background: 'linear-gradient(135deg, #f3e8ff 0%, #fdf2f8 50%, #e0e7ff 100%)'
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute w-24 h-24 bg-purple-200 rounded-full top-16 left-8 opacity-60 animate-pulse"></div>
      <div className="absolute w-20 h-20 bg-pink-200 rounded-full opacity-50 top-1/3 right-12 animate-bounce"></div>
      <div className="absolute w-16 h-16 bg-indigo-200 rounded-full bottom-32 left-16 opacity-40 animate-pulse"></div>
      <div className="absolute w-12 h-12 bg-purple-300 rounded-full bottom-16 right-8 opacity-30 animate-bounce"></div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 transition-all duration-300 border border-purple-200 rounded-full shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl">
            <span className="font-medium text-purple-600">Tentang Sistem Kami</span>
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-800 md:text-5xl lg:text-6xl">
            Tentang <span className="font-bold" style={{
              background: 'linear-gradient(to right, #9333ea, #ec4899, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Kami</span>
          </h1>
        </div>

        {/* About Section */}
        <div className="mb-20">
          <div className="p-8 border border-purple-100 shadow-lg rounded-3xl bg-white/70 backdrop-blur-sm hover:shadow-xl">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-gray-800">
                  Sistem Monitoring Makan Bergizi Gratis
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-gray-600">
                  Kami adalah tim yang berdedikasi untuk mengembangkan solusi digital terdepan dalam monitoring program Makan Bergizi Gratis. Sistem kami dirancang khusus untuk membantu sekolah-sekolah di seluruh Indonesia dalam mengelola program nutrisi siswa dengan lebih efektif dan transparan.
                </p>
                <p className="mb-6 text-lg leading-relaxed text-gray-600">
                  Dengan teknologi modern dan antarmuka yang user-friendly, kami memastikan setiap data konsumsi makanan tercatat dengan akurat dan transparan.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">Real-time Monitoring</div>
                  <div className="px-4 py-2 text-sm font-medium text-pink-700 bg-pink-100 rounded-full">Data Analytics</div>
                  <div className="px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">Mobile Friendly</div>
                </div>
              </div>
              <div className="relative">
                <div className="p-8 shadow-xl rounded-2xl" style={{
                  background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #6366f1 100%)'
                }}>
                  <div className="text-center text-white">
                    <div className="mb-4 text-4xl font-bold">1000+</div>
                    <div className="mb-2 text-lg">Sekolah Terdaftar</div>
                    <div className="mb-6 text-sm opacity-90">Dipercaya oleh institusi pendidikan</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="mb-1 text-2xl font-bold">50K+</div>
                        <div className="opacity-90">Siswa Aktif</div>
                      </div>
                      <div>
                        <div className="mb-1 text-2xl font-bold">99.9%</div>
                        <div className="opacity-90">Uptime</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
            Tim <span className="font-bold" style={{
              background: 'linear-gradient(to right, #9333ea, #ec4899, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Pengembang</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Bertemu dengan tim ahli yang berdedikasi mengembangkan sistem monitoring terbaik untuk pendidikan Indonesia
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div key={index} className="p-6 transition-transform border border-purple-100 shadow-lg rounded-2xl bg-white/70 backdrop-blur-sm hover:shadow-xl hover:scale-105">
              <div className="text-center">
                <img src={member.avatar} alt={member.name} className="object-cover w-24 h-24 mx-auto mb-4 rounded-full shadow-md" />
                <h3 className="mb-1 text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-sm font-medium" style={{
                  background: 'linear-gradient(to right, #9333ea, #ec4899, #6366f1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {member.role}
                </p>
                <p className="mt-1 text-sm text-gray-600">{member.universitas}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="mt-20">
          <div className="p-8 text-center text-white shadow-xl rounded-3xl md:p-12" style={{
            background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 50%, #6366f1 100%)'
          }}>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Misi Kami</h2>
            <p className="max-w-4xl mx-auto text-lg leading-relaxed opacity-95 md:text-xl">
              Menciptakan ekosistem digital yang mendukung program Makan Bergizi Gratis di seluruh Indonesia, memastikan setiap anak mendapatkan nutrisi terbaik untuk mendukung prestasi belajar dan tumbuh kembang optimal.
            </p>
            <div className="grid gap-6 mt-12 md:grid-cols-3">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                <div className="mb-3 text-2xl">🎯</div>
                <h3 className="mb-2 text-lg font-semibold">Akurasi Data</h3>
                <p className="text-sm opacity-90">Monitoring presisi untuk hasil optimal</p>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                <div className="mb-3 text-2xl">🚀</div>
                <h3 className="mb-2 text-lg font-semibold">Inovasi</h3>
                <p className="text-sm opacity-90">Teknologi terdepan untuk pendidikan</p>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                <div className="mb-3 text-2xl">🤝</div>
                <h3 className="mb-2 text-lg font-semibold">Kolaborasi</h3>
                <p className="text-sm opacity-90">Kemitraan yang kuat untuk masa depan</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
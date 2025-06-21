import React from 'react';

export default function Testimonial() {
  return (
    <section 
      className="relative flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50"
    >
      <h2 className="mb-8 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
        Apa Kata Mereka?
      </h2>
      <div className="grid w-full max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Testimonial Card 1 */}
        <div className="relative flex flex-col items-center p-8 bg-white border border-purple-100 shadow-xl rounded-3xl">
          <div className="absolute w-12 h-12 -translate-x-1/2 bg-purple-100 rounded-full -top-6 left-1/2"></div>
          <p className="mb-4 text-lg italic text-gray-700">“SiMANGGIS sangat bagus untuk mendukung program MBG, ini sangat membantu anak-anak di sekolah kami. Makanannya sehat dan anak-anak jadi lebih semangat belajar!”</p>
          <div className="flex items-center gap-3 mt-4">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="user" className="w-10 h-10 border-2 border-purple-300 rounded-full" />
            <div>
              <div className="font-semibold text-purple-700">Ibu Sari</div>
              <div className="text-xs text-gray-400">Guru SDN 1 Jakarta</div>
            </div>
          </div>
        </div>
        {/* Testimonial Card 2 */}
        <div className="relative flex flex-col items-center p-8 bg-white border border-pink-100 shadow-xl rounded-3xl">
          <div className="absolute w-12 h-12 -translate-x-1/2 bg-pink-100 rounded-full -top-6 left-1/2"></div>
          <p className="mb-4 text-lg italic text-gray-700">“Saya menyukai SiMANGGIS, Karena bisa memonitoring mendapatkan Makan Bergizi Gratis, Saya senang bisa makan bersama teman-teman setiap hari.”</p>
          <div className="flex items-center gap-3 mt-4">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="user" className="w-10 h-10 border-2 border-pink-300 rounded-full" />
            <div>
              <div className="font-semibold text-pink-600">Budi</div>
              <div className="text-xs text-gray-400">Siswa Kelas 5</div>
            </div>
          </div>
        </div>
        {/* Testimonial Card 3 */}
        <div className="relative flex flex-col items-center p-8 bg-white border border-indigo-100 shadow-xl rounded-3xl">
          <div className="absolute w-12 h-12 -translate-x-1/2 bg-indigo-100 rounded-full -top-6 left-1/2"></div>
          <p className="mb-4 text-lg italic text-gray-700">“Sebagai kepala sekolah, saya sangat mendukung website SiMANGGIS. program MBG jadi lebih terpantau oleh masyarakat terutama pihak sekolah.”</p>
          <div className="flex items-center gap-3 mt-4">
            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="user" className="w-10 h-10 border-2 border-indigo-300 rounded-full" />
            <div>
              <div className="font-semibold text-indigo-600">Celline</div>
              <div className="text-xs text-gray-400">Kepala Sekolah SMAN 2 Cibinong</div>
            </div>
          </div>
        </div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute w-16 h-16 bg-purple-100 rounded-full top-8 left-8 opacity-40 animate-pulse"></div>
      <div className="absolute w-12 h-12 bg-pink-100 rounded-full bottom-12 right-16 opacity-30 animate-bounce"></div>
      <div className="absolute w-10 h-10 bg-indigo-100 rounded-full top-1/2 right-8 opacity-20 animate-pulse"></div>
    </section>
  );
}

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getClassDetail } from "../../../_services/classes";

export default function ClassDetailPage() {
  const { id } = useParams(); 
  const [classData, setClassData] = useState(null);
  
  useEffect(() => {
    console.log("Class ID:", id);
    async function fetchClass() {
      try {
        const data = await getClassDetail(id);
        setClassData(data);
      } catch (error) {
        console.error("Gagal mengambil data kelas:", error);
      }
    }

    fetchClass();
  }, [id]);
  
  if (!classData) return <div className="p-6">Loading...</div>;

  return (
    <main className="p-6 overflow-y-auto">
      <div className="mb-6">
        <nav className="flex text-sm text-gray-600" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/admin/dashboard" className="inline-flex items-center text-blue-600 hover:underline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"></path>
                </svg>
                Dashboard
              </Link>
            </li>
            <li><span className="mx-2 text-gray-400">/</span></li>
            <li>
              <Link to="/admin/classes" className="text-blue-600 hover:underline">
                Data Kelas
              </Link>
            </li>
            <li><span className="mx-2 text-gray-400">/</span></li>
            <li className="inline-flex items-center text-gray-500">
              Detail Kelas
            </li>
          </ol>
        </nav>
      </div>

      <div className="p-6 bg-white rounded shadow">
        <h2 className="mb-4 text-2xl font-bold">Detail Kelas: {classData.class_name}</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-gray-600">Nama Kelas:</p>
            <p className="font-semibold text-gray-900">{classData.class_name}</p>
          </div>
          <div>
            <p className="text-gray-600">Sekolah:</p>
            <p className="font-semibold text-gray-900">{classData.school?.school_name}</p>
          </div>
          <div>
            <p className="text-gray-600">Jumlah Siswa:</p>
            <p className="font-semibold text-gray-900">{classData.students?.length || 0}</p>
          </div>
          <div>
            <p className="text-gray-600">Wali Kelas:</p>
            <p className="font-semibold text-gray-900">{classData.teacher?.name}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-2 text-xl font-semibold">Deskripsi:</h3>
          <p className="text-gray-700">{classData.description}</p>
        </div>
      </div>
    </main>
  );
}

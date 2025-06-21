import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSchools } from "../../../_services/schools";

export default function AdminSchools() {
  const [school, setSchool] = useState(null);

  useEffect(() => {
    async function fetchSchool() {
      try {
        const res = await getSchools();
        // Jika getSchools mengembalikan array, ambil sekolah pertama
        setSchool(Array.isArray(res) ? res[0] : res);
      } catch (error) {
        console.error("Failed to fetch school:", error);
      }
    }

    fetchSchool();
  }, []);
  console.log(school);
  return (
    <div>
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
            <li>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="inline-flex items-center text-gray-500">
              Data Sekolah
            </li>
          </ol>
        </nav>
      </div>

      <div className="p-4 overflow-x-auto bg-white rounded shadow">
        <h2 className="mb-4 text-2xl font-bold">Profil Sekolah</h2>
        <table className="min-w-full text-left table-auto">
          <tbody>
            <tr>
              <th className="w-1/4 px-4 py-2 bg-gray-100 border">Nama Sekolah</th>
              <td className="px-4 py-2 border">{school?.school_name}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-100 border">Alamat</th>
              <td className="px-4 py-2 border">{school?.address}</td>
            </tr>
            <tr>
              <th className="px-4 py-2 bg-gray-100 border">Nomor Kontak</th>
              <td className="px-4 py-2 border">{school?.contact_number}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Link
          to="/admin/schools/detail"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Edit Informasi
        </Link>
      </div>
    </div>
  );
};

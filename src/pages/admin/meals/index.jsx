import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDistributions } from "../../../_services/meals";

export default function AdminDistribution() {
  const [distributions, setDistributions] = useState([]);
  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
  });

  const fetchDistributions = async () => {
    try {
      const data = await getDistributions(filters);
      setDistributions(data);
    } catch (error) {
      console.error("Gagal memuat data distribusi", error);
    }
  };

  useEffect(() => {
    fetchDistributions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // hanya panggil sekali saat pertama render
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchDistributions();
  };

  return (
    <div>
      <div className="mb-6">
        <nav className="flex text-sm text-gray-600" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/admin" className="inline-flex items-center text-blue-600 hover:underline">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="inline-flex items-center text-gray-500">Data Distribusi</li>
          </ol>
        </nav>
      </div>

      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Data Distribusi</h2>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/admin/meals/create"
            className="inline-flex items-center px-4 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M12 4v16m8-8H4" />
            </svg>
            Tambah Jadwal
          </Link>

          <form onSubmit={handleFilterSubmit} className="flex items-end gap-4">
            <div>
              <label htmlFor="start_date" className="block mb-1 text-sm font-semibold text-gray-700">Start Date</label>
              <input
                type="date"
                name="start_date"
                id="start_date"
                value={filters.start_date}
                onChange={handleFilterChange}
                className="p-2 border border-gray-300 rounded-md w-36 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="end_date" className="block mb-1 text-sm font-semibold text-gray-700">End Date</label>
              <input
                type="date"
                name="end_date"
                id="end_date"
                value={filters.end_date}
                onChange={handleFilterChange}
                className="p-2 border border-gray-300 rounded-md w-36 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Filter
            </button>
          </form>
        </div>

        <div className="p-4 overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-left table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Nama Kelas</th>
                <th className="px-4 py-2 border">Total Distribusi</th>
                <th className="px-4 py-2 border">Tanggal Distribusi</th>
                <th className="px-4 py-2 border">Guru Penanggung Jawab</th>
              </tr>
            </thead>
            <tbody>
              {distributions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-6 italic text-center text-gray-500 border">
                    Tidak ada distribusi ditemukan
                  </td>
                </tr>
              ) : (
                distributions.map((row, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{row.class_name}</td>
                    <td className="px-4 py-2 border">{row.total_distributions}</td>
                    <td className="px-4 py-2 border">{row.meal_date}</td>
                    <td className="px-4 py-2 border">{row.teacher_name}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

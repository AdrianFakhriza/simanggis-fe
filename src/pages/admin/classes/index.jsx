import React, { useEffect, useState } from "react";
// import { getGenres } from "../../../_services/genres";
import { Link } from "react-router-dom";
import { getClasses } from "../../../_services/classes";
import { deleteClass } from "../../../_services/classes";

export default function AdminClasses() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    async function fetchClasses() {
      try {
        const res = await getClasses();
        setClasses(res);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    }

    fetchClasses();
  }, []);

  return (
    <section className="p-4 sm:p-6">
      <div className="mb-6">
        <nav className="flex text-sm text-gray-600" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"></path>
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="inline-flex items-center text-gray-500">
              Data Kelas
            </li>
          </ol>
        </nav>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Daftar Kelas</h2>
        <Link
          to="/admin/classes/create"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          + Tambah Kelas
        </Link>
      </div>
      <div className="p-4 overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Nama</th>
              <th className="px-4 py-2 border">Wali Kelas</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((item, index) => (
              <tr key={item.class_id || item.id || index}>
                <td className="w-12 px-2 py-2 text-center border">
                  {index + 1}
                </td>
                <td className="w-56 px-4 py-2 border">
                  {item.class_name || item.nama || "-"}
                </td>
                <td className="w-64 px-4 py-2 border">
                  {item.teacher && item.teacher.name
                    ? item.teacher.name
                    : "Belum ada wali kelas"}
                </td>
                <td className="w-32 px-2 py-2 border">
                  <div className="flex justify-center gap-2">
                    <div className="flex flex-col items-center">
                      <Link
                        to={`/admin/classes/detail/${
                          item.class_id || item.id || ""
                        }`}
                        className="flex flex-col items-center text-green-600 hover:underline"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 mb-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        Detail
                      </Link>
                    </div>
                    <div className="flex flex-col items-center">
                      <Link
                        to={`/admin/classes/edit/${
                          item.class_id || item.id || ""
                        }`}
                        className="flex flex-col items-center text-blue-600 hover:underline"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 mb-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm0 0v2a2 2 0 002 2h2"
                          />
                        </svg>
                        Edit
                      </Link>
                    </div>
                    <div className="flex flex-col items-center">
                      <button
                        onClick={async () => {
                          if (
                            window.confirm("Yakin ingin menghapus kelas ini?")
                          ) {
                            try {
                              await deleteClass(item.class_id || item.id);
                              // Refresh data setelah delete
                              setClasses((prev) =>
                                prev.filter((cls) => cls.class_id !== item.class_id)
                              );
                            } catch (err) {
                              alert(
                                "Gagal menghapus kelas. Silakan coba lagi."
                              );
                            }
                          }
                        }}
                        className="flex flex-col items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 mb-1 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span className="text-red-600 hover:underline">
                          Hapus
                        </span>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {classes.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No classes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

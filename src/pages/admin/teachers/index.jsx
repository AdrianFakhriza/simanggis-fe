import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTeachers, deleteTeachers } from "../../../_services/teachers";

export default function AdminTeacher() {
  const [success, setSuccess] = useState("");
  const [teachers, setTeachers] = useState([]);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus guru ini?")) {
      try {
        await deleteTeachers(id);
        setTeachers((prev) => prev.filter((teacher) => teacher.id !== id));
        setSuccess("Guru berhasil dihapus.");
      } catch (error) {
        console.error(error);
        setSuccess("Gagal menghapus guru.");
      }
    }
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await getTeachers();
        setTeachers(res);
      } catch {
        setSuccess("Gagal mengambil data guru.");
      }
    };
    fetchTeachers();
  }, []);

  return (
    <div>
      {/* Breadcrumb */}
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
              Data Guru
            </li>
          </ol>
        </nav>
      </div>

      {/* Header & Add Button */}
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Daftar Guru</h2>
        <Link
          to="/admin/teachers/create"
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          + Tambah Guru
        </Link>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-4 text-green-600">
          <p>{success}</p>
        </div>
      )}

      {/* Table */}
      <div className="p-4 overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Nama</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, idx) => (
              <tr key={teacher.id}>
                <td className="w-12 px-2 py-2 text-center border">{idx + 1}</td>
                <td className="w-56 px-4 py-2 border">{teacher.name}</td>
                <td className="w-64 px-4 py-2 border">{teacher.email}</td>
                <td className="w-32 px-2 py-2 border">
                  <div className="flex justify-center gap-2">
                    <div className="flex flex-col items-center">
                      <Link
                        to={`/admin/teachers/edit/${teacher.id}`}
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
                        onClick={() => handleDelete(teacher.id)}
                        className="flex flex-col items-center text-red-600 hover:underline"
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
                        Hapus
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {teachers.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center">
                  Tidak ada data guru.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteStudent, getStudents } from "../../../_services/students";



export default function AdminStudent() {
    const [success, setSuccess] = useState(""); // Example: "Berhasil menambah siswa!"
    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const students = await getStudents();
                setStudentList(students);
            } catch {
                setSuccess("Gagal mengambil data siswa.");
            }
        };
        fetchStudents();
    }, []);

    const handleDelete = async (studentId) => {
    if (window.confirm("Yakin ingin menghapus siswa ini?")) {
        try {
            await deleteStudent(studentId); // panggil API hapus
            const updatedList = studentList.filter(s => s.student_id !== studentId);
            setStudentList(updatedList);
            setSuccess("Siswa berhasil dihapus!");
        } catch {
            setSuccess("Gagal menghapus siswa.");
        }
    }
};

    return (
        <div>
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
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                                </svg>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <span className="mx-2 text-gray-400">/</span>
                        </li>
                        <li className="inline-flex items-center text-gray-500">
                            Data Murid
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-bold">Data Murid</h2>
                {success && (
                    <div className="p-2 text-green-600 bg-green-100 rounded">
                        {success}
                    </div>
                )}
                <Link
                    to="/admin/students/create"
                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                    + Tambah Siswa
                </Link>
            </div>

            <div className="p-4 overflow-x-auto bg-white rounded shadow">
                <table className="min-w-full text-left table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 border">No</th>
                            <th className="px-4 py-2 border">Nama</th>
                            <th className="px-4 py-2 border">Kelas</th>
                            <th className="px-4 py-2 border">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentList.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-2 text-center border">
                                    Tidak ada data siswa.
                                </td>
                            </tr>
                        )}
                        {studentList.map((student, idx) => (
                            <tr key={student.student_id}>
                                <td className="w-12 px-2 py-2 text-center border">
                                    {idx + 1}
                                </td>
                                <td className="w-56 px-4 py-2 border">{student.name}</td>
                                <td className="w-64 px-4 py-2 border">
                                    {student.classes?.class_name || "Belum Mempunyai Kelas!"}
                                </td>
                                <td className="w-32 px-2 py-2 border">
                                    <div className="flex justify-center gap-2">
                                        <div className="flex flex-col items-center">
                                            <Link
                                                to={`/admin/students/detail/${student.student_id}`}
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
                                                        strokeWidth={2}
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>
                                                Detail
                                            </Link>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <Link
                                                to={`/admin/students/edit/${student.student_id}`}
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
                                                        strokeWidth={2}
                                                        d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm0 0v2a2 2 0 002 2h2"
                                                    />
                                                </svg>
                                                Edit
                                            </Link>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <button
                                                onClick={() => handleDelete(student.student_id)}
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
                                                        strokeWidth={2}
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
                    </tbody>
                </table>
            </div>
        </div>
    );
}

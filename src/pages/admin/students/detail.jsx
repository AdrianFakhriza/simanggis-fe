import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getStudentById } from "../../../_services/students";

export default function StudentDetail() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const data = await getStudentById(id);
                setStudent(data);
            } catch {
                setError("Gagal mengambil data siswa.");
            }
        };
        fetchStudent();
    }, [id]);

    if (error) {
        return <div className="text-red-600">{error}</div>;
    }

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 bg-white rounded shadow">
            <div className="mb-4">
                <Link
                    to="/admin/students"
                    className="text-blue-600 hover:underline"
                >
                    ← Kembali ke daftar siswa
                </Link>
            </div>
            <h2 className="mb-4 text-2xl font-bold">Detail Siswa</h2>
            <div className="space-y-2">
                <div><strong>Nama:</strong> {student.name}</div>
                <div><strong>Kelas:</strong> {student.classes?.class_name || "-"}</div>
                {/* Tambahkan info lain jika ada */}
            </div>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getStudentById, updateStudent } from "../../../_services/students";
import { getClasses } from "../../../_services/classes";

export default function EditStudent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [classId, setClassId] = useState("");
    const [classes, setClasses] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const student = await getStudentById(id);
                const classList = await getClasses();
                setName(student.name || "");
                setClassId(student.class_id || "");
                setClasses(classList);
            } catch {
                setErrors(["Gagal memuat data."]);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        try {
            await updateStudent(id, { name, class_id: classId });
            navigate("/admin/students");
        } catch (err) {
            const responseErrors = err?.response?.data?.errors;
            if (responseErrors) {
                setErrors(Object.values(responseErrors).flat());
            } else {
                setErrors(["Terjadi kesalahan saat mengupdate data."]);
            }
        }
    };

    return (
        <div className="max-w-lg mx-auto">
            <div className="mb-6">
                <nav className="flex text-sm text-gray-600" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link to="/admin/dashboard" className="inline-flex items-center text-blue-600 hover:underline">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                                </svg>
                                Dashboard
                            </Link>
                        </li>
                        <li><span className="mx-2 text-gray-400">/</span></li>
                        <li>
                            <Link to="/admin/students" className="text-blue-600 hover:underline">Data Siswa</Link>
                        </li>
                        <li><span className="mx-2 text-gray-400">/</span></li>
                        <li className="text-gray-500">Edit Siswa</li>
                    </ol>
                </nav>
            </div>

            <div className="p-6 bg-white rounded shadow">
                <h2 className="mb-6 text-xl font-bold">Edit Siswa</h2>

                {errors.length > 0 && (
                    <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">
                        <ul className="pl-5 list-disc">
                            {errors.map((err, idx) => (
                                <li key={idx}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-1 font-semibold">Nama Siswa</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="class_id" className="block mb-1 font-semibold">Kelas</label>
                        <select
                            id="class_id"
                            className="w-full px-3 py-2 border rounded"
                            value={classId}
                            onChange={(e) => setClassId(e.target.value)}
                        >
                            <option value="">-- Pilih Kelas --</option>
                            {classes.map((c) => (
                                <option key={c.class_id} value={c.class_id}>
                                    {c.class_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end">
                        <Link to="/admin/students" className="px-4 py-2 mr-3 bg-gray-200 rounded hover:bg-gray-300">
                            Batal
                        </Link>
                        <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

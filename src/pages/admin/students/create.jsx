import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createStudents } from "../../../_services/students";
import { getClasses } from "../../../_services/classes"; // pastikan path benar

const StudentForm = ({ onSubmit }) => {
    const [name, setName] = useState("");
    const [classId, setClassId] = useState("");
    const [classes, setClasses] = useState([]);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Ambil data kelas dari API
        const fetchClasses = async () => {
            try {
                const data = await getClasses();
                setClasses(data);
            } catch {
                setClasses([]);
            }
        };
        fetchClasses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        try {
            const response = await createStudents({ name, class_id: classId });
            if (response.errors) {
                setErrors(response.errors);
                return;
            }
            if (onSubmit) onSubmit();
            navigate("/admin/students");
        } catch (error) {
            console.error("Error creating student:", error);
            setErrors(["Terjadi kesalahan saat menambah siswa"]);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
                    Form Tambah Siswa
                </h2>
                {errors.length > 0 && (
                    <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
                        <ul>
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="block mb-1 text-sm font-semibold text-gray-700"
                        >
                            Nama Siswa
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="class_id"
                            className="block mb-1 text-sm font-semibold text-gray-700"
                        >
                            Kelas (Label)
                        </label>
                        <select
                            name="class_id"
                            id="class_id"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={classId}
                            onChange={(e) => setClassId(e.target.value)}
                        >
                            <option value="">Pilih Kelas</option>
                            {classes.map((classItem) => (
                                <option key={classItem.class_id} value={classItem.class_id}>
                                    {classItem.class_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input type="hidden" name="meal_status" value="" />

                    <div className="flex justify-end mt-6 space-x-3">
                        <button
                            type="button"
                            className="inline-block px-5 py-2 text-gray-700 transition duration-200 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
                            onClick={() => navigate("/admin/students")}
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;
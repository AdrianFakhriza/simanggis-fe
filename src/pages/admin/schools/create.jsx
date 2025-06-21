import React, { useState } from "react";
import { useNavigate } from "react-router-dom";// Pastikan path ini sesuai dengan struktur proyek Anda
// const CreateSchool = () => {
//     const [form, setForm] = useState({
//         school_name: "",
//         address: "",
//         contact_number: "",
//     });
//     const [errors, setErrors] = useState([]);
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };
export default function SchoolForm() {
    const [form, setForm] = useState({
        school_name: "",
        address: "",
        contact_number: "",
    });
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        try {
            // Gunakan service createSchool yang sudah diimport
            const response = await createSchools(form);
            if (response.errors) {
                setErrors(response.errors);
                return;
            }
            navigate("/admin/schools");
        } catch (error) {
            console.error("Error creating school:", error);
            setErrors(["Terjadi kesalahan saat menambah sekolah"]);
        }
    };

    return (
        <div className="container px-4 py-8 mx-auto">
            <div className="max-w-lg p-6 mx-auto bg-white rounded shadow">
                <h2 className="mb-6 text-xl font-bold">Tambah Sekolah</h2>
                {errors.length > 0 && (
                    <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">
                        <ul className="pl-5 list-disc">
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="school_name" className="block mb-1 font-semibold">
                            Nama Sekolah
                        </label>
                        <input
                            type="text"
                            name="school_name"
                            id="school_name"
                            value={form.school_name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="address" className="block mb-1 font-semibold">
                            Alamat
                        </label>
                        <textarea
                            name="address"
                            id="address"
                            rows="3"
                            value={form.address}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contact_number" className="block mb-1 font-semibold">
                            No. Kontak
                        </label>
                        <input
                            type="text"
                            name="contact_number"
                            id="contact_number"
                            value={form.contact_number}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/schools")}
                            className="px-4 py-2 mr-3 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

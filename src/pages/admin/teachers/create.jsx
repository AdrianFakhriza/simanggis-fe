import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTeachers } from "../../../_services/teachers"; // pastikan path benar

const CreateTeacher = () => {
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
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
            await createTeachers(form); // ← kirim data ke API
            navigate("/admin/teachers");
        } catch (error) {
            // Cek apakah error dari validasi Laravel
            if (error.response && error.response.data && error.response.data.errors) {
                const validationErrors = Object.values(error.response.data.errors).flat();
                setErrors(validationErrors);
            } else {
                setErrors(["Terjadi kesalahan saat menyimpan data."]);
            }
        }
    };

    return (
        <div className="max-w-2xl p-6 mx-auto bg-white rounded shadow">
            {/* Breadcrumbs dan Error Handling */}
            <div className="mb-6">
                <nav className="flex text-sm text-gray-600" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <a href="/admin/dashboard" className="inline-flex items-center text-blue-600 hover:underline">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"></path>
                                </svg>
                                Dashboard
                            </a>
                        </li>
                        <li><span className="mx-2 text-gray-400">/</span></li>
                        <li className="inline-flex items-center text-gray-500">Data Guru</li>
                    </ol>
                </nav>
            </div>

            {errors.length > 0 && (
                <div className="mb-4 text-red-600">
                    <ul className="pl-5 list-disc">
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {["name", "username", "email", "password", "password_confirmation"].map((field) => (
                    <div key={field}>
                        <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                            {field === "password_confirmation" ? "Konfirmasi Password" :
                             field === "password" ? "Password" :
                             field === "email" ? "Email" :
                             field === "username" ? "Username" : "Nama Lengkap"}
                        </label>
                        <input
                            type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
                            id={field}
                            name={field}
                            required
                            value={form[field]}
                            onChange={handleChange}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                ))}

                <div className="pt-4">
                    <div className="flex flex-row items-center justify-end space-x-2">
                        <button type="button" className="text-gray-600 hover:underline" onClick={() => navigate("/admin/teachers")}>
                            Batal
                        </button>
                        <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                            Simpan
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateTeacher;

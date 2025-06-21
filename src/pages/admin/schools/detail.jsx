import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSchools, updateSchool } from "../../../_services/schools";

export default function EditSchool() {
  const [school, setSchool] = useState({
    school_name: "",
    address: "",
    contact_number: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const res = await getSchools();
        const data = Array.isArray(res) ? res[0] : res;
        setSchool({
          school_name: data.school_name || "",
          address: data.address || "",
          contact_number: data.contact_number || "",
        });
      } catch (error) {
        setErrors(["Gagal memuat data sekolah."]);
      }
    };

    fetchSchool();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchool((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      await updateSchool(school);
      navigate("/admin/schools");
    } catch (error) {
      const responseErrors = error?.response?.data?.errors;
      if (responseErrors) {
        setErrors(Object.values(responseErrors).flat());
      } else {
        setErrors(["Terjadi kesalahan saat menyimpan data."]);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto">
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
            <li><span className="mx-2 text-gray-400">/</span></li>
            <li>
              <Link to="/admin/schools" className="text-blue-600 hover:underline">Data Sekolah</Link>
            </li>
            <li><span className="mx-2 text-gray-400">/</span></li>
            <li className="text-gray-500">Edit Sekolah</li>
          </ol>
        </nav>
      </div>

      <div className="p-6 bg-white rounded shadow">
        <h2 className="mb-6 text-xl font-bold">Edit Informasi Sekolah</h2>

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
            <label htmlFor="school_name" className="block mb-1 font-semibold">Nama Sekolah</label>
            <input
              type="text"
              name="school_name"
              id="school_name"
              value={school.school_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block mb-1 font-semibold">Alamat</label>
            <textarea
              name="address"
              id="address"
              value={school.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              rows="3"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contact_number" className="block mb-1 font-semibold">Nomor Kontak</label>
            <input
              type="text"
              name="contact_number"
              id="contact_number"
              value={school.contact_number}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="flex justify-end">
            <Link to="/admin/schools" className="px-4 py-2 mr-3 bg-gray-200 rounded hover:bg-gray-300">
              Batal
            </Link>
            <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

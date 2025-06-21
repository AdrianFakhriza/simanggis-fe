import React, { useEffect, useState } from "react";
import { createMeals } from "../../../_services/meals";
import { getClasses } from "../../../_services/classes";
import { useNavigate } from "react-router-dom";

export default function CreateMeal() {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    class_id: "",
    meal_date: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getClasses();
        setClasses(data);
      } catch{
        setError("Gagal mengambil data kelas.");
      }
    };

    fetchClasses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await createMeals(form);
      setSuccess("Jadwal distribusi berhasil ditambahkan!");
      setTimeout(() => navigate("/admin/meals"), 1000);
    } catch (error) {
  if (error.response?.data?.errors) {
    console.error("Validation Errors:", error.response.data.errors);
  } else {
    console.error("Error:", error);
  }
  throw error;
    }
  };

  return (
    <div className="w-full max-w-2xl p-6 mx-auto bg-white rounded shadow-md">
      <h2 className="mb-4 text-2xl font-semibold text-blue-600">
        Tambah Jadwal Distribusi Makanan
      </h2>

      {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}
      {success && <div className="p-3 mb-4 text-green-700 bg-green-100 rounded">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="class_id" className="block mb-1 text-sm font-semibold">
            Pilih Kelas
          </label>
          <select
            id="class_id"
            name="class_id"
            value={form.class_id}
            onChange={handleChange}
            className="block w-full py-2 border-gray-300 rounded"
            required
          >
            <option value="">-- Pilih Kelas --</option>
            {classes.map((cls) => (
              <option key={cls.class_id} value={cls.class_id}>
                {cls.class_name} (Wali: {cls.teacher?.name || "Belum Ada"})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="meal_date" className="block mb-1 text-sm font-semibold">
            Tanggal Distribusi
          </label>
          <input
            type="date"
            id="meal_date"
            name="meal_date"
            value={form.meal_date}
            onChange={handleChange}
            required
            className="block w-full py-2 border-gray-300 rounded"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Jadwalkan
          </button>
        </div>
      </form>
    </div>
  );
}

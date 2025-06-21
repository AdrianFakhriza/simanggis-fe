import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createClasses } from "../../../_services/classes";
import { getTeachers } from "../../../_services/teachers";

export default function ClassForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teachers, setTeachers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await getTeachers();
        setTeachers(res); // asumsi res adalah array of teachers
      } catch (error) {
        console.error("Gagal mengambil data guru:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleReset = () => {
    setName("");
    setDescription("");
    setTeacherId("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        class_name: name,
        description: description,
        teacher_id: teacherId,
      };
      await createClasses(payload);
      navigate("/admin/classes");
    } catch (error) {
      console.error("Gagal membuat kelas:", error);
      alert("Gagal membuat kelas. Silakan periksa input dan coba lagi.");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Form Tambah Kelas
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nama Kelas
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Contoh: X IPA 1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                Wali Kelas
              </label>
              <select
                name="teacher_id"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">-- Pilih Wali Kelas --</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Deskripsi
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Tuliskan deskripsi (opsional)"
              ></textarea>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              Simpan Kelas
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="text-gray-600 inline-flex items-center hover:text-white border border-gray-600 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-900"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

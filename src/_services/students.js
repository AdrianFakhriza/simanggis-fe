import API from "../_api";

const API_URL = "http://localhost:8000/api/students";

// Ambil semua siswa
export const getStudents = async () => {
  const token = localStorage.getItem("token");

  const { data } = await API.get("/students", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return data;
};

// Tambah siswa
export const createStudents = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.post("/students", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// Hapus siswa
export async function deleteStudent(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:8000/api/students/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Gagal menghapus siswa");
  return await res.json();
}

// Ambil siswa berdasarkan ID
export const getStudentById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await API.get(`/students/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data;
};

export const updateStudent = async (id, data) => {
  const token = localStorage.getItem("token");

  const response = await API.put(`/students/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.data;
};

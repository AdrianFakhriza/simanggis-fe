import API from "../_api";

const API_URL = "http://localhost:8000/api";

// script pertama
export const getClasses = async () => {
  const token = localStorage.getItem("token");
  const { data } = await API.get("/classes", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data;
};

/* script kedua cek response setelah script pertama error
export const getBooks = async () => {
  const response = await API.get("/books")  
  console.log("Response from API:", response.data); // log response mentah
  return response.data 
} */

/* Penambah Buku */
export const createClasses = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.post("/classes", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Gagal membuat kelas:", error);
    throw error;
  }
};

/* Edit Class */
export const updateClass = async (id, data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await API.put(`/classes/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Update error:", error.response?.data);
    throw error;
  }
};

/* Delete Class */
export const deleteClass = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await API.delete(`/classes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Gagal menghapus kelas:", error.response?.data || error.message);
    throw error;
  }
};

export async function editClass(id, data, token) {
  const res = await fetch(`${API_URL}/classes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Gagal mengedit kelas");
  return await res.json();
}

export async function getClassDetail(id) {
  const token = localStorage.getItem("token");

  try {
    const { data } = await API.get(`/classes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return data; 
  } catch (error) {
    console.error(
      "Gagal mengambil detail kelas:",
      error.response?.data || error.message
    );
    throw error;
  }
}

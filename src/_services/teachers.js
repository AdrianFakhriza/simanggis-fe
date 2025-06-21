import API from "../_api";

export const getTeachers = async () => {
  const token = localStorage.getItem("token"); // atau ambil dari tempat kamu simpan token
  const { data } = await API.get("/teachers", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data;
};

export const createTeachers = async (data) => {
  try {
    const token = localStorage.getItem("token"); // atau ambil dari tempat kamu simpan token
    const response = await API.post("/teachers", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json", // penting kalau kamu pakai FormData
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTeachers = async (id) => {
  try {
    const token = localStorage.getItem("token"); // atau ambil dari tempat kamu simpan token
    const response = await API.delete("/teachers/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const editTeacher = async (id, data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.put(`/teachers/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Edit teacher failed:", error.response?.data || error.message);
    throw error;
  }
};

export const getTeacherById = async (id) => {
  try {
    const token = localStorage.getItem("token"); // atau ambil dari tempat kamu simpan token
    const response = await API.get("/teachers/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

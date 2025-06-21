import API from "../_api";

// Ambil data distribusi
export const getDistributions = async (filters = {}) => {
  const token = localStorage.getItem("token");

  const response = await API.get("/meal-distribution", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    params: filters, // jika ingin pakai filter tanggal
  });

  return response.data;
};

// Tambah data distribusi
export const createMeals = async (data) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.post("/meal-distribution", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Gagal membuat distribusi:", error);
    throw error;
  }
};

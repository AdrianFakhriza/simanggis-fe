import API from "../_api";

// script pertama
export const getSchools = async () => {
  const token = localStorage.getItem("token");
  const { data } = await API.get("/schools", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data;
};

/* Penambah Buku */
export const updateSchool = async (schoolData) => {
  const token = localStorage.getItem("token");
  return await API.put(`/schools/${schoolData.school_id}`, schoolData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getSchoolsPublic = async () => {
  const { data } = await API.get("/schoolsPublic");
  return data;
};
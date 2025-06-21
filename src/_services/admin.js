import API from "../_api";

export const getDashboardData = async () => {
  const token = localStorage.getItem("token");
  
  const data  = await API.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return data.data;
};

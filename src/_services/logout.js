const API_URL = "http://localhost:8000/api";

export async function logout(token) {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Logout gagal");
  return await res.json();
}

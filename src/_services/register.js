export async function register({ name, username, email, password, password_confirmation, school_name }) {
  const res = await fetch("http://localhost:8000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, username, email, password, password_confirmation, school_name }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.errors ? Object.values(data.errors).join(", ") : data.message || "Registrasi gagal");
  return data;
}

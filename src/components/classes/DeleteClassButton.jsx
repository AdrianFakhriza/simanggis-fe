import React from "react";
import { deleteClass } from "../../_services/classes";

export default function DeleteClassButton({ id, onSuccess }) {
  const token = localStorage.getItem("token");
  const handleDelete = async () => {
    if (window.confirm("Yakin hapus kelas ini?")) {
      try {
        await deleteClass(id, token);
        if (onSuccess) onSuccess();
      } catch (e) {
        alert(e.message);
      }
    }
  };
  return (
    <button onClick={handleDelete} style={{ color: "red" }}>
      Hapus
    </button>
  );
}

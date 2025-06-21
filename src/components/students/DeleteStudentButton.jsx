import React from "react";
import { deleteStudent } from "../../_services/students";

export default function DeleteStudentButton({ id, onSuccess }) {
  const token = localStorage.getItem("token");
  const handleDelete = async () => {
    if (window.confirm("Yakin hapus siswa ini?")) {
      try {
        await deleteStudent(id, token);
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

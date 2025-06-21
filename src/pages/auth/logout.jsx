// import React, { useEffect } from "react";
// import { logout } from "../../_services/logout";

// export default function Logout({ history }) {
//   useEffect(() => {
//     const doLogout = async () => {
//       const token = localStorage.getItem("token");
//       try {
//         await logout(token);
//       } catch (e) {
//         // Optional: tampilkan error jika perlu
//       }
//       localStorage.removeItem("token");
//       history.push("/login");
//     };
//     doLogout();
//   }, [history]);

//   return <div>Logging out...</div>;
// }

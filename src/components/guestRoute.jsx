import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/admin" replace /> : children;
}

// GuestRoute.jsx

// import { Navigate, useLocation } from "react-router-dom";

// export default function GuestRoute({ children }) {
//   const token = localStorage.getItem("token");
//   const location = useLocation();

//   // Hanya redirect jika user mencoba masuk ke /login atau /register
//   const guestOnlyPaths = ["/login", "/register"];
//   const isGuestOnlyPage = guestOnlyPaths.includes(location.pathname);

//   if (token && isGuestOnlyPage) {
//     return <Navigate to="/admin" replace />;
//   }

//   return children;
// }

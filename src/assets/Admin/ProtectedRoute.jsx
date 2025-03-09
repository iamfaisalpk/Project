import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAdmin = localStorage.getItem("isAdmin"); // Check if admin is logged in

    return isAdmin ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;

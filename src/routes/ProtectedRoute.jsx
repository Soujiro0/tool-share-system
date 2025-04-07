import PropTypes from "prop-types";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
    const { auth, isAuthenticated } = useContext(AuthContext);

    // If not logged in, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // If a role is required, ensure the user has it
    const allowedRoles = ["SUPER_ADMIN", "ADMIN", "INSTRUCTOR"]; // Add roles that should be allowed

    if (requiredRole && (!auth.user || !allowedRoles.includes(auth.user.role))) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
ProtectedRoute.propTypes = {
    children: PropTypes.any,
    requiredRole: PropTypes.string,
};

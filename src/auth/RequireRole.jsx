import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireRole({ role, children }) {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    if (!user) return <Navigate to="/user/login" />;

    // Normalize roles by removing "ROLE_" prefix for comparison
    const userRole = user.role?.replace("ROLE_", "");
    const requiredRole = role?.replace("ROLE_", "");

    if (userRole !== requiredRole) {
        return <Navigate to="/user/login" />;
    }

    return children;
}


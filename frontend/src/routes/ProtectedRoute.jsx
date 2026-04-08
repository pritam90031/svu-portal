import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// ProtectedRoute: redirects to login if not authenticated
function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;
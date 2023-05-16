import React from 'react';
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isloggedIn, element }) {
    return (
        isloggedIn ? element : <Navigate to="/singin" replace />
    );
}

export default ProtectedRoute; 
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, initialized } = useAuth();
  const location = useLocation();

  // Nếu chưa kiểm tra xong token, hiển thị loading
  if (!initialized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  // Nếu không đăng nhập, chuyển hướng đến trang login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu đã đăng nhập, hiển thị component con
  return children;
};

export default ProtectedRoute; 
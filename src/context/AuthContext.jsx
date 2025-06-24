import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { authAPI } from '../services/api';
import { mockAPI } from '../services/mockData';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [initialized, setInitialized] = useState(false);

  // Kiểm tra token và tải thông tin người dùng khi khởi động
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setInitialized(true);
        return;
      }

      try {
        // Sử dụng mockAPI thay vì authAPI
        const response = mockAPI.getProfile();
        // Dispatch action để cập nhật thông tin người dùng trong Redux store
        dispatch({ 
          type: 'auth/login/fulfilled', 
          payload: { user: response, token } 
        });
      } catch (error) {
        // Nếu token không hợp lệ, xóa khỏi localStorage
        localStorage.removeItem('token');
      } finally {
        setInitialized(true);
      }
    };

    loadUser();
  }, [dispatch]);

  // Xử lý lỗi từ Redux store
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'auth/clearError' });
    }
  }, [error, dispatch]);

  const value = {
    user,
    isAuthenticated,
    loading,
    initialized,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 
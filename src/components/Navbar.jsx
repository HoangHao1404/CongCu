import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { totalQuantity } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const handleLogout = () => {
    dispatch(logoutUser());
    setIsProfileOpen(false);
    navigate('/');
  };
  
  return (
    <nav className="wabi-navbar shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-serif text-wood-dark wabi-title">Wabi Shop</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-wood-dark hover:text-matcha border-b border-transparent hover:border-matcha transition-colors">Trang chủ</Link>
            <Link to="/category/ao" className="text-wood-dark hover:text-matcha border-b border-transparent hover:border-matcha transition-colors">Áo</Link>
            <Link to="/category/quan" className="text-wood-dark hover:text-matcha border-b border-transparent hover:border-matcha transition-colors">Quần</Link>
            <Link to="/category/giay" className="text-wood-dark hover:text-matcha border-b border-transparent hover:border-matcha transition-colors">Giày</Link>
            <Link to="/upload-search" className="text-wood-dark hover:text-matcha border-b border-transparent hover:border-matcha transition-colors flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Tìm bằng ảnh
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:block flex-grow max-w-md mx-4">
            <SearchBar />
          </div>
          
          {/* User Menu & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-wood-dark hover:text-matcha transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 bg-clay text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQuantity}
                </span>
              )}
            </Link>
            
            {/* User Profile */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-1 text-wood-dark hover:text-matcha focus:outline-none transition-colors"
                >
                  <span>{user.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-rice rounded-sm shadow-wabi py-1 z-10 border border-stone-light">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-wood-dark hover:bg-stone-light hover:text-matcha-dark"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Hồ sơ
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-wood-dark hover:bg-stone-light hover:text-matcha-dark"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="text-wood-dark hover:text-matcha border-b border-transparent hover:border-matcha transition-colors">
                  Đăng nhập
                </Link>
                <Link to="/register" className="bg-matcha text-white px-4 py-1 rounded-sm hover:bg-matcha-dark transition-colors">
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative p-2 text-wood-dark mr-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 bg-clay text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQuantity}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-wood-dark focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-rice border-t border-stone-light animate-fade-in">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="py-2 text-wood-dark hover:text-matcha" onClick={() => setIsMenuOpen(false)}>
                Trang chủ
              </Link>
              <Link to="/category/ao" className="py-2 text-wood-dark hover:text-matcha" onClick={() => setIsMenuOpen(false)}>
                Áo
              </Link>
              <Link to="/category/quan" className="py-2 text-wood-dark hover:text-matcha" onClick={() => setIsMenuOpen(false)}>
                Quần
              </Link>
              <Link to="/category/giay" className="py-2 text-wood-dark hover:text-matcha" onClick={() => setIsMenuOpen(false)}>
                Giày
              </Link>
              <Link to="/upload-search" className="py-2 text-wood-dark hover:text-matcha flex items-center" onClick={() => setIsMenuOpen(false)}>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Tìm bằng ảnh
              </Link>
              
              {user ? (
                <>
                  <Link to="/profile" className="py-2 text-wood-dark hover:text-matcha" onClick={() => setIsMenuOpen(false)}>
                    Hồ sơ
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="py-2 text-left text-wood-dark hover:text-matcha"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="py-2 text-wood-dark hover:text-matcha" onClick={() => setIsMenuOpen(false)}>
                    Đăng nhập
                  </Link>
                  <Link to="/register" className="py-2 text-wood-dark hover:text-matcha" onClick={() => setIsMenuOpen(false)}>
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useAuth();
  const { totalQuantity } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Theo dõi scroll để thay đổi hiệu ứng navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Đóng menu khi chuyển trang
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);
  
  const handleLogout = () => {
    dispatch(logoutUser());
    setIsProfileOpen(false);
    navigate('/');
  };
  
  return (
    <nav className={`wabi-navbar sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md bg-rice bg-opacity-95 backdrop-blur-sm' : 'bg-rice'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 mr-2 bg-matcha rounded-sm flex items-center justify-center">
                <span className="text-rice font-serif text-xl">W</span>
              </div>
              <span className="text-2xl font-serif text-wood-dark hidden sm:block">
                Wabi Shop
                <span className="block text-xs text-stone-dark font-sans">Vẻ đẹp từ sự không hoàn hảo</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-wood-dark hover:text-matcha border-b-2 py-1 ${location.pathname === '/' ? 'border-matcha' : 'border-transparent'} hover:border-matcha transition-colors`}
            >
              Trang chủ
            </Link>
            <Link 
              to="/category/ao" 
              className={`text-wood-dark hover:text-matcha border-b-2 py-1 ${location.pathname === '/category/ao' ? 'border-matcha' : 'border-transparent'} hover:border-matcha transition-colors`}
            >
              Áo
            </Link>
            <Link 
              to="/category/quan" 
              className={`text-wood-dark hover:text-matcha border-b-2 py-1 ${location.pathname === '/category/quan' ? 'border-matcha' : 'border-transparent'} hover:border-matcha transition-colors`}
            >
              Quần
            </Link>
            <Link 
              to="/category/giay" 
              className={`text-wood-dark hover:text-matcha border-b-2 py-1 ${location.pathname === '/category/giay' ? 'border-matcha' : 'border-transparent'} hover:border-matcha transition-colors`}
            >
              Giày
            </Link>
            <Link 
              to="/upload-search" 
              className={`text-wood-dark hover:text-matcha border-b-2 py-1 ${location.pathname === '/upload-search' ? 'border-matcha' : 'border-transparent'} hover:border-matcha transition-colors flex items-center`}
            >
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
                  <div className="w-8 h-8 bg-matcha-light rounded-full flex items-center justify-center text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block">{user.name}</span>
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
                <Link to="/register" className="bg-matcha text-white px-4 py-1.5 rounded-sm hover:bg-matcha-dark transition-colors">
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
              className="text-wood-dark p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              )}
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
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`py-2 flex items-center ${location.pathname === '/' ? 'text-matcha font-medium' : 'text-wood-dark'} hover:text-matcha`} 
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Trang chủ
              </Link>
              <Link 
                to="/category/ao" 
                className={`py-2 flex items-center ${location.pathname === '/category/ao' ? 'text-matcha font-medium' : 'text-wood-dark'} hover:text-matcha`} 
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Áo
              </Link>
              <Link 
                to="/category/quan" 
                className={`py-2 flex items-center ${location.pathname === '/category/quan' ? 'text-matcha font-medium' : 'text-wood-dark'} hover:text-matcha`} 
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Quần
              </Link>
              <Link 
                to="/category/giay" 
                className={`py-2 flex items-center ${location.pathname === '/category/giay' ? 'text-matcha font-medium' : 'text-wood-dark'} hover:text-matcha`} 
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Giày
              </Link>
              <Link 
                to="/upload-search" 
                className={`py-2 flex items-center ${location.pathname === '/upload-search' ? 'text-matcha font-medium' : 'text-wood-dark'} hover:text-matcha`} 
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Tìm bằng ảnh
              </Link>
              
              <div className="border-t border-stone-light my-2"></div>
              
              {user ? (
                <>
                  <Link 
                    to="/profile" 
                    className="py-2 flex items-center text-wood-dark hover:text-matcha" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Hồ sơ
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="py-2 text-left flex items-center w-full text-wood-dark hover:text-matcha"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="py-2 flex items-center text-wood-dark hover:text-matcha" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                    </svg>
                    Đăng nhập
                  </Link>
                  <Link 
                    to="/register" 
                    className="py-2 flex items-center text-wood-dark hover:text-matcha" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                    </svg>
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
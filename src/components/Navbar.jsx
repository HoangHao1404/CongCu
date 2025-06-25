import React, { useState, useEffect, useRef } from 'react';
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
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const categoryRef = useRef(null);
  
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
    setIsCategoryOpen(false);
  }, [location.pathname]);
  
  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleLogout = () => {
    dispatch(logoutUser());
    setIsProfileOpen(false);
    navigate('/');
  };
  
  // Xác định trang hiện tại
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // Danh sách danh mục
  const categories = [
    { id: 'ao', name: 'Áo', path: '/category/ao' },
    { id: 'quan', name: 'Quần', path: '/category/quan' },
    { id: 'giay', name: 'Giày', path: '/category/giay' },
    { id: 'phu-kien', name: 'Phụ kiện', path: '/category/phu-kien' },
    { id: 'bo-suu-tap', name: 'Bộ sưu tập', path: '/category/bo-suu-tap' },
  ];
  
  return (
    <nav 
      className={`wabi-navbar sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'shadow-wabi-depth bg-rice/90 backdrop-blur-md py-2' 
          : 'py-4 bg-rice'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <div className="relative w-14 h-14 mr-3 overflow-hidden transition-all duration-500 group-hover:rotate-12">
                <div className="absolute inset-0 bg-gradient-wabi from-matcha to-moss-light rounded-2xl transform rotate-45 shadow-wabi-3d animate-subtle-bounce"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-rice font-serif text-3xl text-shadow">W</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-serif text-wood-dark tracking-wide group-hover:text-matcha transition-colors duration-300">
                  Wabi Shop
                </span>
                <span className="block text-xs text-stone-dark font-sans tracking-widest uppercase">
                  VẺ ĐẸP TỪ SỰ KHÔNG HOÀN HẢO • 2025
                </span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink to="/" label="Trang chủ" isActive={isActive('/')} />
            
            {/* Categories Dropdown */}
            <div className="relative" ref={categoryRef}>
              <button 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={`flex items-center space-x-1 relative text-wood-dark hover:text-matcha transition-colors py-1 ${
                  location.pathname.includes('/category') ? 'font-medium text-matcha' : ''
                }`}
              >
                <span>Danh mục</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path>
                </svg>
                <span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-matcha transform origin-left transition-transform duration-300 ${
                    location.pathname.includes('/category') ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
              
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 glass-card rounded-xl py-2 z-10 animate-fade-in">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={category.path}
                      className="block px-4 py-2.5 text-sm text-wood-dark hover:bg-matcha/5 hover:text-matcha transition-colors"
                      onClick={() => setIsCategoryOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <NavLink 
              to="/upload-search" 
              label={
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Tìm bằng ảnh
                </div>
              } 
              isActive={isActive('/upload-search')} 
            />
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:block flex-grow max-w-md mx-4">
            <SearchBar />
          </div>
          
          {/* User Menu & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-2 text-wood-dark hover:text-matcha transition-colors group"
              aria-label="Giỏ hàng"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-wabi from-clay to-terracotta text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-wabi-3d">
                  {totalQuantity}
                </span>
              )}
            </Link>
            
            {/* User Profile */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-wood-dark hover:text-matcha focus:outline-none transition-colors"
                >
                  <div className="w-9 h-9 bg-gradient-wabi from-matcha to-moss-light rounded-full flex items-center justify-center text-white shadow-wabi">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block font-medium">{user.name}</span>
                  <svg className="w-4 h-4 transition-transform duration-300" style={{ transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-52 glass-card rounded-xl py-1 z-10 shadow-wabi-depth animate-fade-in">
                    <Link
                      to="/profile"
                      className="block px-4 py-2.5 text-sm text-wood-dark hover:bg-matcha/5 hover:text-matcha transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Hồ sơ
                      </div>
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2.5 text-sm text-wood-dark hover:bg-matcha/5 hover:text-matcha transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                        Đơn hàng
                      </div>
                    </Link>
                    <div className="border-t border-stone-light/30 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2.5 text-sm text-wood-dark hover:bg-matcha/5 hover:text-matcha transition-colors"
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        Đăng xuất
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4 items-center">
                <Link to="/login" className="text-wood-dark hover:text-matcha border-b border-transparent hover:border-matcha transition-colors">
                  Đăng nhập
                </Link>
                <Link to="/register" className="bg-gradient-wabi from-matcha to-moss text-white px-5 py-2.5 rounded-full hover:shadow-wabi-3d transition-all transform hover:-translate-y-1">
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button & Cart */}
          <div className="md:hidden flex items-center">
            <Link 
              to="/cart" 
              className="relative p-2 text-wood-dark mr-2 group"
              aria-label="Giỏ hàng"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-wabi from-clay to-terracotta text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-wabi-3d">
                  {totalQuantity}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-wood-dark p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span 
                  className={`bg-wood-dark block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                  }`} 
                />
                <span 
                  className={`bg-wood-dark block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                    isMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`} 
                />
                <span 
                  className={`bg-wood-dark block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="md:hidden pt-4 pb-2">
          <SearchBar />
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-rice/95 backdrop-blur-md border-t border-stone-light/20 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-3">
              <MobileNavLink 
                to="/" 
                label="Trang chủ"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                }
                isActive={isActive('/')}
                onClick={() => setIsMenuOpen(false)}
              />
              
              {/* Mobile Categories Dropdown */}
              <div className="py-3">
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center justify-between w-full text-wood-dark hover:text-matcha"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                    Danh mục
                  </div>
                  <svg 
                    className={`w-5 h-5 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                {isCategoryOpen && (
                  <div className="mt-2 pl-8 border-l-2 border-matcha/20 space-y-3 animate-fade-in">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={category.path}
                        className="block py-2 text-wood-dark hover:text-matcha transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <MobileNavLink 
                to="/upload-search" 
                label="Tìm bằng ảnh"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                }
                isActive={isActive('/upload-search')}
                onClick={() => setIsMenuOpen(false)}
              />
              
              <div className="border-t border-stone-light/30 my-2"></div>
              
              {user ? (
                <>
                  <MobileNavLink 
                    to="/profile" 
                    label="Hồ sơ"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    }
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <MobileNavLink 
                    to="/orders" 
                    label="Đơn hàng"
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                    }
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="py-3 text-left flex items-center w-full text-wood-dark hover:text-matcha"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <div className="flex flex-col space-y-3">
                    <Link 
                      to="/login" 
                      className="bg-rice border border-matcha text-matcha py-2.5 rounded-lg text-center font-medium hover:bg-matcha/10 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Đăng nhập
                    </Link>
                    <Link 
                      to="/register" 
                      className="bg-gradient-wabi from-matcha to-moss text-white py-2.5 rounded-lg text-center font-medium hover:shadow-wabi-3d transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Đăng ký
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Desktop Nav Link Component
const NavLink = ({ to, label, isActive }) => (
  <Link 
    to={to} 
    className={`relative text-wood-dark hover:text-matcha transition-colors py-1 ${
      isActive ? 'font-medium text-matcha' : ''
    }`}
  >
    {label}
    <span 
      className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-wabi from-matcha to-moss transform origin-left transition-transform duration-300 ${
        isActive ? 'scale-x-100' : 'scale-x-0'
      } hover:scale-x-100`}
    />
  </Link>
);

// Mobile Nav Link Component
const MobileNavLink = ({ to, label, icon, isActive, onClick }) => (
  <Link 
    to={to} 
    className={`py-3 flex items-center ${
      isActive ? 'text-matcha font-medium' : 'text-wood-dark'
    } hover:text-matcha transition-colors`} 
    onClick={onClick}
  >
    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isActive ? 'bg-matcha/10' : 'bg-stone-light/30'} mr-3`}>
      {icon}
    </div>
    {label}
  </Link>
);

export default Navbar; 
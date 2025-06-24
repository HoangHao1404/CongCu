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
  
  // Xác định trang hiện tại
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav 
      className={`wabi-navbar sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'shadow-md bg-rice bg-opacity-95 backdrop-blur-sm py-2' 
          : 'py-4 bg-rice'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <div className="relative w-12 h-12 mr-3">
                <div className="absolute inset-0 bg-matcha rounded-sm transform rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-rice font-serif text-2xl">W</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-serif text-wood-dark tracking-wide">
                  Wabi Shop
                </span>
                <span className="block text-xs text-stone-dark font-sans tracking-widest uppercase">
                  Vẻ đẹp từ sự không hoàn hảo
                </span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLink to="/" label="Trang chủ" isActive={isActive('/')} />
            <NavLink to="/category/ao" label="Áo" isActive={isActive('/category/ao')} />
            <NavLink to="/category/quan" label="Quần" isActive={isActive('/category/quan')} />
            <NavLink to="/category/giay" label="Giày" isActive={isActive('/category/giay')} />
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
              className="relative p-2 text-wood-dark hover:text-matcha transition-colors"
              aria-label="Giỏ hàng"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-clay text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
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
                  <div className="w-8 h-8 bg-matcha-light rounded-full flex items-center justify-center text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block font-medium">{user.name}</span>
                  <svg className="w-4 h-4 transition-transform duration-300" style={{ transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-sm shadow-wabi py-1 z-10 border border-stone-light scale-in">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-wood-dark hover:bg-stone-light hover:text-matcha-dark"
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
                      className="block px-4 py-2 text-sm text-wood-dark hover:bg-stone-light hover:text-matcha-dark"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                        Đơn hàng
                      </div>
                    </Link>
                    <div className="border-t border-stone-light my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-wood-dark hover:bg-stone-light hover:text-matcha-dark"
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
                <Link to="/register" className="bg-matcha text-white px-4 py-2 rounded-sm hover:bg-matcha-dark transition-all transform hover:-translate-y-1 hover:shadow-md">
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button & Cart */}
          <div className="md:hidden flex items-center">
            <Link 
              to="/cart" 
              className="relative p-2 text-wood-dark mr-2"
              aria-label="Giỏ hàng"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-clay text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
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
        <div className="md:hidden bg-rice border-t border-stone-light animate-fade-in">
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
              <MobileNavLink 
                to="/category/ao" 
                label="Áo"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                }
                isActive={isActive('/category/ao')}
                onClick={() => setIsMenuOpen(false)}
              />
              <MobileNavLink 
                to="/category/quan" 
                label="Quần"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                }
                isActive={isActive('/category/quan')}
                onClick={() => setIsMenuOpen(false)}
              />
              <MobileNavLink 
                to="/category/giay" 
                label="Giày"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                }
                isActive={isActive('/category/giay')}
                onClick={() => setIsMenuOpen(false)}
              />
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
              
              <div className="border-t border-stone-light my-2"></div>
              
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
                      className="bg-rice border border-matcha text-matcha py-2.5 rounded-sm text-center font-medium hover:bg-matcha-light hover:bg-opacity-10 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Đăng nhập
                    </Link>
                    <Link 
                      to="/register" 
                      className="bg-matcha text-white py-2.5 rounded-sm text-center font-medium hover:bg-matcha-dark transition-colors"
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
      className={`absolute bottom-0 left-0 w-full h-0.5 bg-matcha transform origin-left transition-transform duration-300 ${
        isActive ? 'scale-x-100' : 'scale-x-0'
      }`}
    />
  </Link>
);

// Mobile Nav Link Component
const MobileNavLink = ({ to, label, icon, isActive, onClick }) => (
  <Link 
    to={to} 
    className={`py-3 flex items-center ${
      isActive ? 'text-matcha font-medium' : 'text-wood-dark'
    } hover:text-matcha`} 
    onClick={onClick}
  >
    <span className="mr-3">{icon}</span>
    {label}
  </Link>
);

export default Navbar; 
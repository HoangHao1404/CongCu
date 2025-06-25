import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import axios from 'axios';
import { categories as mockCategories } from '../services/mockData';

const categories = [
  {
    id: 'ao',
    name: 'Áo',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h10a2 2 0 012 2v12a4 4 0 01-4 4H7z"></path>
      </svg>
    ),
    subcategories: [
      { id: 'ao-so-mi', name: 'Áo sơ mi' },
      { id: 'ao-thun', name: 'Áo thun' },
      { id: 'ao-khoac', name: 'Áo khoác' },
      { id: 'ao-len', name: 'Áo len' },
    ],
  },
  {
    id: 'quan',
    name: 'Quần',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 6l2 7v8m0 0l-2-7h8l-2 7m0 0V6"></path>
      </svg>
    ),
    subcategories: [
      { id: 'quan-dai', name: 'Quần dài' },
      { id: 'quan-short', name: 'Quần short' },
      { id: 'quan-jean', name: 'Quần jean' },
      { id: 'quan-kaki', name: 'Quần kaki' },
    ],
  },
  {
    id: 'giay',
    name: 'Giày',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 3h5m0 0v5m0-5l-6 6M4 16v5m0 0h5m-5 0l6-6"></path>
      </svg>
    ),
    subcategories: [
      { id: 'giay-the-thao', name: 'Giày thể thao' },
      { id: 'giay-tay', name: 'Giày tây' },
      { id: 'giay-sandal', name: 'Sandal' },
      { id: 'giay-boot', name: 'Boot' },
    ],
  },
  {
    id: 'phu-kien',
    name: 'Phụ kiện',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
      </svg>
    ),
    subcategories: [
      { id: 'that-lung', name: 'Thắt lưng' },
      { id: 'tui-xach', name: 'Túi xách' },
      { id: 'vi', name: 'Ví' },
      { id: 'mu-non', name: 'Mũ & nón' },
    ],
  },
  {
    id: 'bo-suu-tap',
    name: 'Bộ sưu tập',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
      </svg>
    ),
    subcategories: [
      { id: 'wabi-sabi', name: 'Wabi-sabi' },
      { id: 'thu-dong', name: 'Thu - Đông' },
      { id: 'xuan-he', name: 'Xuân - Hè' },
      { id: 'gioi-han', name: 'Giới hạn' },
    ],
  },
];

const CategoryMenu = () => {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <div className="glass-card rounded-xl shadow-wabi-depth overflow-hidden">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="flex items-center justify-between w-full p-4 text-wood-dark hover:bg-matcha/5 transition-colors"
        >
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-wabi from-matcha to-moss-light flex items-center justify-center text-white shadow-wabi mr-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </div>
            <span className="font-medium font-serif">Danh mục sản phẩm</span>
          </div>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${mobileMenuOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
      
      <div className={`md:block ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="divide-y divide-stone-light/30">
          {categories.map((category) => (
            <li key={category.id} className="relative">
              <div className="group">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className={`flex items-center justify-between w-full p-4 text-left transition-all duration-300 hover:bg-matcha/5 ${
                    isActive(`/category/${category.id}`) ? 'bg-matcha/10 text-matcha-dark' : 'text-wood-dark'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${isActive(`/category/${category.id}`) ? 'bg-gradient-wabi from-matcha to-moss-light shadow-wabi' : 'bg-stone-light/50'} mr-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-wabi`}>
                      <span className={`${isActive(`/category/${category.id}`) ? 'text-white' : 'text-wood-dark'} transition-colors duration-300 group-hover:text-white`}>{category.icon}</span>
                    </div>
                    <span className={`${isActive(`/category/${category.id}`) ? 'font-medium' : ''} font-serif transition-all duration-300 group-hover:translate-x-1`}>
                      {category.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {expandedCategories[category.id] ? (
                      <span className="text-xs mr-2 text-matcha">Thu gọn</span>
                    ) : (
                      <span className="text-xs mr-2 text-stone-dark">Xem thêm</span>
                    )}
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${expandedCategories[category.id] ? 'transform rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </button>
                
                {/* Hover effect for desktop */}
                <div className="hidden md:block absolute left-0 top-0 w-1 h-full bg-gradient-wabi from-matcha to-moss-light scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
              </div>
              
              {/* Subcategories */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-wabi-bounce ${
                  expandedCategories[category.id] ? 'max-h-60' : 'max-h-0'
                }`}
              >
                <ul className="bg-stone-light/10 backdrop-blur-xs pl-12 py-2 space-y-1">
                  {category.subcategories.map((subcategory, index) => (
                    <li key={subcategory.id} className="transform transition-all duration-300" style={{ transitionDelay: `${index * 50}ms` }}>
                      <Link
                        to={`/category/${category.id}/${subcategory.id}`}
                        className={`block py-2 px-4 text-sm transition-all duration-300 hover:text-matcha hover:translate-x-1 rounded-lg ${
                          isActive(`/category/${category.id}/${subcategory.id}`) 
                            ? 'text-matcha font-medium bg-matcha/5' 
                            : 'text-wood-dark'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full ${isActive(`/category/${category.id}/${subcategory.id}`) ? 'bg-matcha' : 'bg-stone'} mr-2`}></span>
                          {subcategory.name}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          
          {/* Special categories */}
          <li>
            <Link
              to="/sale"
              className="flex items-center p-4 text-clay-dark hover:bg-clay/5 transition-all duration-300 group relative"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-clay shadow-wabi mr-3 transition-all duration-300 group-hover:scale-110">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a4 4 0 00-4-4H5.52a2.5 2.5 0 01-2.5-2.5v0a2.5 2.5 0 012.5-2.5H12a4 4 0 014 4v0a4 4 0 01-4 4H8"></path>
                </svg>
              </div>
              <div className="transition-all duration-300 group-hover:translate-x-1">
                <span className="font-medium font-serif">Giảm giá</span>
                <span className="ml-2 bg-gradient-clay text-white text-xs px-2 py-0.5 rounded-full shadow-wabi">-30%</span>
              </div>
              <div className="hidden md:block absolute left-0 top-0 w-1 h-full bg-gradient-clay scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
            </Link>
          </li>
          <li>
            <Link
              to="/new-arrivals"
              className="flex items-center p-4 text-matcha-dark hover:bg-matcha/5 transition-all duration-300 group relative"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-wabi from-matcha to-moss-light shadow-wabi mr-3 transition-all duration-300 group-hover:scale-110">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="transition-all duration-300 group-hover:translate-x-1">
                <span className="font-medium font-serif">Mới về</span>
                <span className="ml-2 bg-gradient-wabi from-matcha to-moss-light text-white text-xs px-2 py-0.5 rounded-full shadow-wabi">New</span>
              </div>
              <div className="hidden md:block absolute left-0 top-0 w-1 h-full bg-gradient-wabi from-matcha to-moss-light scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CategoryMenu; 
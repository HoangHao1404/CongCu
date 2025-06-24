import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import axios from 'axios';
import { categories as mockCategories } from '../services/mockData';

const CategoryMenu = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState({
    clothing: true,
    accessories: true,
    home: true
  });
  
  // Danh sách danh mục với cấu trúc phân cấp và icon
  const categories = [
    {
      id: 'clothing',
      name: 'Trang phục',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
      subcategories: [
        { id: 'ao', name: 'Áo', path: '/category/ao' },
        { id: 'quan', name: 'Quần', path: '/category/quan' },
        { id: 'vay', name: 'Váy', path: '/category/vay' },
        { id: 'ao-khoac', name: 'Áo khoác', path: '/category/ao-khoac' }
      ]
    },
    {
      id: 'accessories',
      name: 'Phụ kiện',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
        </svg>
      ),
      subcategories: [
        { id: 'giay', name: 'Giày', path: '/category/giay' },
        { id: 'tui', name: 'Túi xách', path: '/category/tui' },
        { id: 'mu', name: 'Mũ', path: '/category/mu' },
        { id: 'kinh', name: 'Kính', path: '/category/kinh' }
      ]
    },
    {
      id: 'home',
      name: 'Đồ nội thất',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
      ),
      subcategories: [
        { id: 'ghe', name: 'Ghế', path: '/category/ghe' },
        { id: 'ban', name: 'Bàn', path: '/category/ban' },
        { id: 'den', name: 'Đèn', path: '/category/den' },
        { id: 'binh', name: 'Bình hoa', path: '/category/binh' }
      ]
    }
  ];
  
  // Kiểm tra đường dẫn hiện tại có phải là danh mục đang được chọn
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // Toggle mở/đóng danh mục
  const toggleCategory = (categoryId) => {
    setExpanded({
      ...expanded,
      [categoryId]: !expanded[categoryId]
    });
  };
  
  return (
    <div className="bg-white rounded-sm shadow-wabi border border-stone-light overflow-hidden">
      <div className="p-4 bg-rice border-b border-stone-light">
        <h2 className="text-lg font-serif text-wood-dark">Danh mục sản phẩm</h2>
      </div>
      
      <div className="divide-y divide-stone-light">
        {categories.map((category) => (
          <div key={category.id} className="overflow-hidden">
            <button
              onClick={() => toggleCategory(category.id)}
              className="flex items-center justify-between w-full p-3 text-left text-wood-dark hover:bg-rice transition-colors"
            >
              <div className="flex items-center">
                <span className="text-matcha mr-2">
                  {category.icon}
                </span>
                <span className="font-medium">{category.name}</span>
              </div>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${expanded[category.id] ? 'transform rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expanded[category.id] ? 'max-h-60' : 'max-h-0'
              }`}
            >
              <div className="bg-rice bg-opacity-50 pl-10 pr-3 py-2 space-y-1">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    to={subcategory.path}
                    className={`block py-2 px-3 rounded-sm transition-colors ${
                      isActive(subcategory.path)
                        ? 'bg-matcha-light bg-opacity-20 text-matcha-dark font-medium'
                        : 'text-wood-dark hover:bg-matcha-light hover:bg-opacity-10'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-clay mr-2"></span>
                      {subcategory.name}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-matcha-light bg-opacity-10 border-t border-stone-light">
        <Link to="/category/sale" className="flex items-center text-matcha-dark hover:text-matcha transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Sản phẩm giảm giá
        </Link>
      </div>
    </div>
  );
};

export default CategoryMenu; 
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import axios from 'axios';
import { categories as mockCategories } from '../services/mockData';

const CategoryMenu = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Áo', slug: 'ao', icon: '👕' },
    { id: 2, name: 'Quần', slug: 'quan', icon: '👖' },
    { id: 3, name: 'Giày', slug: 'giay', icon: '👟' },
    { id: 4, name: 'Phụ kiện', slug: 'phu-kien', icon: '👜' },
  ]);
  
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  
  // Determine active category based on URL
  const activeCategory = categories.find(
    (category) => location.pathname === `/category/${category.slug}`
  );
  
  // Use mock categories instead of API
  useEffect(() => {
    // Simulate API loading
    setLoading(true);
    setTimeout(() => {
      setCategories(mockCategories.map(cat => ({
        ...cat,
        icon: getIconForCategory(cat.slug)
      })));
      setLoading(false);
    }, 300);
  }, []);
  
  // Helper function to get icon for category
  const getIconForCategory = (slug) => {
    const icons = {
      'ao': '🍃',
      'quan': '🌿',
      'giay': '🪴',
      'tui': '🧶',
      'phukien': '🧩',
      'vay': '🍵'
    };
    return icons[slug] || '🪵';
  };
  
  return (
    <div className="bg-rice border border-stone-light rounded-sm overflow-hidden fade-in">
      <h2 className="text-lg font-serif wabi-title p-4 border-b border-stone-light">Danh mục sản phẩm</h2>
      
      {loading ? (
        <div className="p-4 flex justify-center">
          <div className="wabi-spinner"></div>
        </div>
      ) : (
        <ul className="divide-y divide-stone-light">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to={`/category/${category.slug}`}
                className={`flex items-center px-4 py-3 transition-colors ${
                  activeCategory?.id === category.id 
                    ? 'bg-matcha-light/20 text-matcha-dark' 
                    : 'text-wood-dark hover:bg-stone-light/50'
                }`}
              >
                {category.icon && (
                  <span className="mr-3 text-xl">{category.icon}</span>
                )}
                <span className="font-medium">{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryMenu; 
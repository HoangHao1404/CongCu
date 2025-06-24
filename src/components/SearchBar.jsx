import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
import { searchProducts } from '../redux/slices/productSlice';
import { products as mockProducts } from '../services/mockData';

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  
  const { products } = useSelector((state) => state.product);
  
  // Xử lý khi click ra ngoài search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Tìm kiếm gợi ý khi người dùng nhập
  useEffect(() => {
    if (searchTerm.length > 1) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, products]);
  
  // Xử lý khi submit form tìm kiếm
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchProducts(searchTerm));
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
    }
  };
  
  // Xử lý khi chọn một gợi ý
  const handleSuggestionClick = (productId) => {
    navigate(`/product/${productId}`);
    setShowSuggestions(false);
    setSearchTerm('');
  };
  
  // Tạo highlight cho từ khóa trong kết quả tìm kiếm
  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, i) => 
          regex.test(part) ? (
            <span key={i} className="bg-matcha-light bg-opacity-30 text-matcha-dark">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };
  
  return (
    <div className="relative" ref={searchRef}>
      <form 
        onSubmit={handleSubmit}
        className={`wabi-search flex items-center transition-all duration-300 ${
          isFocused ? 'shadow-md' : ''
        }`}
      >
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full py-2 px-4 bg-rice focus:outline-none text-wood-dark placeholder-stone"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-matcha text-white hover:bg-matcha-dark transition-colors flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </form>
      
      {/* Gợi ý tìm kiếm */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border border-stone-light rounded-sm shadow-wabi z-20 scale-in">
          <ul className="divide-y divide-stone-light">
            {suggestions.map((product) => (
              <li key={product.id} className="hover:bg-stone-light hover:bg-opacity-30 transition-colors">
                <button
                  onClick={() => handleSuggestionClick(product.id)}
                  className="w-full text-left p-3 flex items-center"
                >
                  <div className="w-12 h-12 flex-shrink-0 mr-3 overflow-hidden rounded-sm border border-stone-light">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="text-wood-dark font-medium line-clamp-1">
                      {highlightText(product.name, searchTerm)}
                    </p>
                    <p className="text-stone text-sm line-clamp-1">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(product.price)}
                    </p>
                  </div>
                </button>
              </li>
            ))}
            
            {/* Xem tất cả kết quả */}
            <li className="hover:bg-stone-light hover:bg-opacity-30 transition-colors">
              <button
                onClick={handleSubmit}
                className="w-full text-center p-2 text-matcha font-medium"
              >
                Xem tất cả kết quả
              </button>
            </li>
          </ul>
        </div>
      )}
      
      {/* Hiển thị khi không có kết quả */}
      {showSuggestions && searchTerm.length > 1 && suggestions.length === 0 && (
        <div className="absolute w-full mt-1 bg-white border border-stone-light rounded-sm shadow-wabi z-20 p-4 text-center scale-in">
          <p className="text-stone">Không tìm thấy sản phẩm nào phù hợp</p>
          <button
            onClick={handleSubmit}
            className="mt-2 text-matcha hover:underline"
          >
            Tìm kiếm "{searchTerm}"
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar; 
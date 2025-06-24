import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import axios from 'axios';
import { fetchProducts } from '../redux/slices/productSlice';
import { products as mockProducts } from '../services/mockData';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Debounce function
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
    
    return debouncedValue;
  };
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  // Fetch suggestions when search term changes
  useEffect(() => {
    const fetchSuggestions = () => {
      if (!debouncedSearchTerm || debouncedSearchTerm.length < 2) {
        setSuggestions([]);
        return;
      }
      
      setIsLoading(true);
      
      // Simulate API call with mock data
      setTimeout(() => {
        try {
          const filteredProducts = mockProducts.filter(product => 
            product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          );
          setSuggestions(filteredProducts.slice(0, 5)); // Limit to 5 suggestions
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      }, 300); // Simulate network delay
    };
    
    fetchSuggestions();
  }, [debouncedSearchTerm]);
  
  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      // Dispatch action to fetch products with search term
      dispatch(fetchProducts({ search: searchTerm.trim() }));
      
      // Navigate to search results page
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      
      // Clear suggestions
      setShowSuggestions(false);
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setShowSuggestions(false);
    navigate(`/product/${suggestion.id}`);
  };
  
  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="flex w-full wabi-search">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full px-4 py-2 focus:outline-none bg-rice text-wood-dark placeholder-stone"
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="wabi-spinner w-4 h-4"></div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-matcha text-white px-4 py-2 hover:bg-matcha-dark transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </form>
      
      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-rice rounded-sm shadow-wabi max-h-60 overflow-auto border border-stone-light animate-fade-in">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="px-4 py-2 hover:bg-stone-light cursor-pointer flex items-center border-b border-stone-light last:border-b-0"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.image && (
                <img src={suggestion.image} alt={suggestion.name} className="w-10 h-10 object-cover mr-3 rounded-sm" />
              )}
              <div>
                <div className="text-sm font-medium text-wood-dark">{suggestion.name}</div>
                <div className="text-xs text-stone-dark">{suggestion.category}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 
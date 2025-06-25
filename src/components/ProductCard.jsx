import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { useCart } from '../context/CartContext';
import Toast from './Toast';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { addItem } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Format price with Vietnamese currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };
  
  // Calculate discount percentage
  const calculateDiscount = (originalPrice, salePrice) => {
    if (!originalPrice || !salePrice || originalPrice <= salePrice) return null;
    const discount = ((originalPrice - salePrice) / originalPrice) * 100;
    return Math.round(discount);
  };
  
  const discount = calculateDiscount(product.originalPrice, product.price);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    }));
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    
    setShowToast(true);
    
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };
  
  return (
    <>
      <div 
        className="group relative hover-3d"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative overflow-hidden rounded-xl shadow-wabi transition-all duration-500 hover:shadow-wabi-3d bg-white">
            {/* Product Image */}
            <div className="relative aspect-product overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isHovered ? 'scale-110' : 'scale-100'
                }`}
              />
              
              {/* Overlay with quick actions */}
              <div className={`absolute inset-0 bg-gradient-to-t from-wood-dark/70 via-transparent to-transparent flex flex-col justify-end p-4 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="flex justify-between items-end">
                  <button
                    onClick={handleAddToCart}
                    className="bg-gradient-wabi from-matcha to-moss-light text-white py-2 px-4 rounded-full transform transition-all duration-300 hover:shadow-wabi-3d hover:-translate-y-1"
                  >
                    Thêm vào giỏ
                  </button>
                  
                  <div className="flex space-x-2">
                    <button
                      className="bg-rice/80 backdrop-blur-sm text-wood-dark p-2 rounded-full hover:bg-rice transition-all"
                      aria-label="Yêu thích"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                    </button>
                    <button
                      className="bg-rice/80 backdrop-blur-sm text-wood-dark p-2 rounded-full hover:bg-rice transition-all"
                      aria-label="Xem nhanh"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {discount && (
                  <span className="bg-gradient-clay shadow-wabi text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    -{discount}%
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-gradient-wabi from-matcha to-moss-light shadow-wabi text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    Mới
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-gradient-to-r from-amber-500 to-yellow-400 shadow-wabi text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    Bán chạy
                  </span>
                )}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-4">
              {/* Category */}
              <div className="text-xs text-stone-dark mb-1 uppercase tracking-wider font-medium">
                {product.category}
              </div>
              
              {/* Product Name */}
              <h3 className="font-serif text-lg text-wood-dark mb-2 line-clamp-2 group-hover:text-matcha transition-colors">
                {product.name}
              </h3>
              
              {/* Price */}
              <div className="flex items-baseline">
                <span className="text-lg font-medium text-matcha-dark">
                  {formatPrice(product.price)}
                </span>
                
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="ml-2 text-sm text-stone line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : i < product.rating
                            ? 'text-yellow-400'
                            : 'text-stone-light'
                        }`}
                        fill={i < product.rating ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        ></path>
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-xs text-stone-dark">
                    ({product.reviewCount || 0})
                  </span>
                </div>
              )}
              
              {/* Color Options */}
              {product.colors && product.colors.length > 0 && (
                <div className="flex mt-3 space-x-1">
                  {product.colors.map((color) => (
                    <div
                      key={color}
                      className="w-4 h-4 rounded-full border border-stone-light"
                      style={{ backgroundColor: color }}
                      title={color}
                    ></div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Link>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-rice rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500 z-[-1]"></div>
        <div className="absolute -top-2 -left-2 w-8 h-8 bg-matcha/10 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500 z-[-1]"></div>
      </div>
      
      {/* Toast notification */}
      {showToast && (
        <Toast
          message="Sản phẩm đã được thêm vào giỏ hàng"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
};

export default ProductCard; 
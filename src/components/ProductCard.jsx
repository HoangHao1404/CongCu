import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem(product, 1, product.sizes?.[0], product.colors?.[0]);
  };
  
  // Format price with commas
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };
  
  return (
    <div 
      className="group fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-white border border-stone-light rounded-sm shadow-wabi transition-all duration-300 hover:shadow-wabi-hover transform hover:-translate-y-1">
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative overflow-hidden">
            {/* Product image */}
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={product.image || product.images?.[0] || 'https://via.placeholder.com/300x400?text=Wabi+Shop'}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
              />
            </div>
            
            {/* Overlay with product details on hover */}
            <div className={`absolute inset-0 bg-wood-dark bg-opacity-0 flex flex-col justify-end p-4 transition-all duration-300 ${isHovered ? 'bg-opacity-40' : ''}`}>
              {/* Product badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-matcha text-white text-xs font-medium px-2 py-1 rounded-sm">
                    Mới
                  </span>
                )}
                
                {product.discount > 0 && (
                  <span className="bg-clay text-white text-xs font-medium px-2 py-1 rounded-sm">
                    -{product.discount}%
                  </span>
                )}
              </div>
              
              {/* Quick add to cart button */}
              <button
                onClick={handleAddToCart}
                className={`absolute bottom-4 right-4 bg-matcha text-white p-2 rounded-full shadow-md transform transition-transform duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                aria-label="Thêm vào giỏ hàng"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-4">
            {/* Product category */}
            <p className="text-xs text-stone-dark mb-1 uppercase tracking-wider">{product.category}</p>
            
            {/* Product name */}
            <h3 className="text-base font-serif text-wood-dark mb-2 line-clamp-2">{product.name}</h3>
            
            {/* Product price */}
            <div className="flex items-center">
              <span className="text-lg font-medium text-matcha-dark">
                {formatPrice(product.price)}
              </span>
              
              {/* Original price if discounted */}
              {product.discount > 0 && product.originalPrice && (
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
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? 'text-clay'
                          : 'text-stone-light'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <span className="ml-1 text-xs text-stone-dark">
                  ({product.numReviews || product.reviewCount || 0})
                </span>
              </div>
            )}
            
            {/* Product features/tags */}
            {product.features && product.features.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {product.features.slice(0, 2).map((feature, index) => (
                  <span key={index} className="inline-block bg-stone-light bg-opacity-30 text-stone-dark text-xs px-2 py-0.5 rounded-sm">
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard; 
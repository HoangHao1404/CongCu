import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  
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
    <div className="card group fade-in">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          {/* Product image */}
          <img
            src={product.image || product.images?.[0] || 'https://via.placeholder.com/300x300'}
            alt={product.name}
            className="w-full h-64 object-cover product-image-hover"
          />
          
          {/* Discount badge if applicable */}
          {product.discount > 0 && (
            <div className="absolute top-2 right-2 bg-clay text-white text-xs font-medium px-2 py-1">
              -{product.discount}%
            </div>
          )}
          
          {/* Quick add to cart button */}
          <div className="absolute bottom-0 left-0 right-0 bg-wood-dark bg-opacity-70 text-white py-2 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full text-center font-medium btn-ripple"
            >
              Thêm vào giỏ
            </button>
          </div>
        </div>
        
        <div className="p-4">
          {/* Product name */}
          <h3 className="text-lg font-medium text-wood-dark truncate">{product.name}</h3>
          
          {/* Product category */}
          <p className="text-sm text-stone-dark mb-2 capitalize">{product.category}</p>
          
          {/* Product price */}
          <div className="flex items-center">
            <span className="text-lg font-bold text-matcha-dark">
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
            <div className="flex items-center mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
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
              <span className="ml-1 text-xs text-gray-500">
                ({product.numReviews || product.reviewCount || 0})
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard; 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  // Giả lập có nhiều ảnh cho sản phẩm
  const productImages = [
    product.image,
    product.image.replace('.jpg', '-2.jpg'),
  ];
  
  // Xử lý khi thêm vào giỏ hàng
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  // Format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };
  
  // Tính giá khuyến mãi nếu có
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : null;
  
  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="card overflow-hidden h-full flex flex-col">
          {/* Ảnh sản phẩm */}
          <div className="relative overflow-hidden aspect-[3/4]">
            <div className="img-hover-zoom h-full">
              <img
                src={isHovered && productImages.length > 1 ? productImages[1] : productImages[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700"
              />
            </div>
            
            {/* Overlay và nút CTA */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-end justify-center">
              <div className="w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-matcha text-white font-medium hover:bg-matcha-dark transition-colors flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                  Thêm vào giỏ
                </button>
              </div>
            </div>
            
            {/* Badge giảm giá */}
            {product.discount && (
              <div className="absolute top-0 left-0 bg-clay text-white px-2 py-1 text-sm font-medium">
                -{product.discount}%
              </div>
            )}
            
            {/* Badge sản phẩm mới */}
            {product.isNew && (
              <div className="absolute top-0 right-0 bg-matcha text-white px-2 py-1 text-sm font-medium">
                Mới
              </div>
            )}
          </div>
          
          {/* Thông tin sản phẩm */}
          <div className="p-4 flex-grow flex flex-col">
            {/* Tên sản phẩm */}
            <h3 className="font-serif text-lg mb-1 line-clamp-2 group-hover:text-matcha transition-colors">
              {product.name}
            </h3>
            
            {/* Mô tả ngắn */}
            <p className="text-stone text-sm mb-2 line-clamp-2">
              {product.description}
            </p>
            
            {/* Giá */}
            <div className="mt-auto">
              <div className="flex items-center">
                {discountedPrice ? (
                  <>
                    <span className="text-clay font-medium">{formatPrice(discountedPrice)}</span>
                    <span className="text-stone line-through text-sm ml-2">{formatPrice(product.price)}</span>
                  </>
                ) : (
                  <span className="text-wood-dark font-medium">{formatPrice(product.price)}</span>
                )}
              </div>
            </div>
            
            {/* Thêm thông tin sản phẩm */}
            <div className="flex items-center mt-3 text-xs text-stone-dark">
              {/* Đánh giá */}
              {product.rating && (
                <div className="flex items-center mr-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-matcha' : 'text-stone-light'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1">({product.ratingCount || 0})</span>
                </div>
              )}
              
              {/* Số lượng đã bán */}
              {product.soldCount && (
                <div className="flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                  <span>Đã bán {product.soldCount}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Hiệu ứng nút bấm xem chi tiết */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="bg-white bg-opacity-80 px-4 py-2 rounded-sm text-matcha-dark font-medium shadow-md transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Xem chi tiết
          </span>
        </div>
      </Link>
      
      {/* Nút yêu thích */}
      <button 
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 flex items-center justify-center transition-all duration-300 z-10 opacity-0 group-hover:opacity-100"
        onClick={(e) => e.stopPropagation()}
        aria-label="Yêu thích"
      >
        <svg className="w-5 h-5 text-clay" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </button>
    </div>
  );
};

export default ProductCard; 
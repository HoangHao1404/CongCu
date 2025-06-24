import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';

const CartPage = () => {
  const { items, totalQuantity, totalAmount, updateItemQuantity, removeItem, isEmpty } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Format price with commas
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };
  
  const handleQuantityChange = (id, quantity, selectedSize, selectedColor) => {
    updateItemQuantity(id, quantity, selectedSize, selectedColor);
  };
  
  const handleRemoveItem = (id, selectedSize, selectedColor) => {
    removeItem(id, selectedSize, selectedColor);
    Toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
  };
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      Toast.info('Vui lòng đăng nhập để tiếp tục thanh toán');
      navigate('/login', { state: { from: '/cart' } });
    } else {
      navigate('/checkout');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>
      
      {isEmpty ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-medium mb-4">Giỏ hàng của bạn đang trống</h2>
          <p className="text-gray-600 mb-8">
            Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm.
          </p>
          <Link
            to="/"
            className="btn btn-primary px-8 py-3"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50 p-4 text-gray-600 font-medium">
                <div className="col-span-6">Sản phẩm</div>
                <div className="col-span-2 text-center">Đơn giá</div>
                <div className="col-span-2 text-center">Số lượng</div>
                <div className="col-span-2 text-center">Thành tiền</div>
              </div>
              
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-t border-gray-200"
                >
                  {/* Product Info */}
                  <div className="col-span-1 md:col-span-6">
                    <div className="flex">
                      <div className="flex-shrink-0 w-24 h-24">
                        <img
                          src={item.image || 'https://via.placeholder.com/100x100'}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="ml-4 flex flex-col">
                        <Link to={`/product/${item.id}`} className="text-lg font-medium hover:text-blue-600">
                          {item.name}
                        </Link>
                        
                        <div className="mt-1 text-sm text-gray-500">
                          {item.selectedSize && (
                            <span className="mr-4">Kích thước: {item.selectedSize}</span>
                          )}
                          {item.selectedColor && (
                            <span>Màu: {item.selectedColor}</span>
                          )}
                        </div>
                        
                        <button
                          onClick={() => handleRemoveItem(item.id, item.selectedSize, item.selectedColor)}
                          className="mt-auto text-sm text-red-500 hover:text-red-700 flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                          Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="col-span-1 md:col-span-2 flex md:block items-center">
                    <span className="md:hidden font-medium mr-2">Đơn giá:</span>
                    <span className="text-gray-900 md:text-center block">{formatPrice(item.price)}</span>
                  </div>
                  
                  {/* Quantity */}
                  <div className="col-span-1 md:col-span-2 flex md:justify-center items-center">
                    <span className="md:hidden font-medium mr-2">Số lượng:</span>
                    <div className="flex items-center">
                      <button
                        className="w-8 h-8 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100"
                        onClick={() => handleQuantityChange(
                          item.id,
                          Math.max(1, item.quantity - 1),
                          item.selectedSize,
                          item.selectedColor
                        )}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                        </svg>
                      </button>
                      <span className="w-10 h-8 border-t border-b border-gray-300 flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <button
                        className="w-8 h-8 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100"
                        onClick={() => handleQuantityChange(
                          item.id,
                          item.quantity + 1,
                          item.selectedSize,
                          item.selectedColor
                        )}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Subtotal */}
                  <div className="col-span-1 md:col-span-2 flex md:block items-center">
                    <span className="md:hidden font-medium mr-2">Thành tiền:</span>
                    <span className="text-gray-900 font-medium md:text-center block">{formatPrice(item.totalPrice)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-6">Tổng giỏ hàng</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tổng số lượng:</span>
                  <span className="font-medium">{totalQuantity} sản phẩm</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">{formatPrice(totalAmount)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium">
                    {totalAmount >= 500000 ? 'Miễn phí' : formatPrice(30000)}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Tổng cộng:</span>
                    <span className="text-lg font-bold text-blue-600">
                      {formatPrice(totalAmount >= 500000 ? totalAmount : totalAmount + 30000)}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="btn btn-primary w-full py-3 mt-4"
                >
                  Tiến hành thanh toán
                </button>
                
                <Link
                  to="/"
                  className="block text-center text-blue-600 hover:text-blue-800 mt-4"
                >
                  Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 
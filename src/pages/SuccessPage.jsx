import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const orderData = location.state?.orderData || {
    orderId: 'ORD' + Math.floor(100000 + Math.random() * 900000),
    total: 0,
    items: []
  };

  useEffect(() => {
    // Xóa giỏ hàng sau khi đặt hàng thành công
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Đặt hàng thành công!</h1>
          <p className="text-gray-600">Cảm ơn bạn đã mua sắm tại Shop AI</p>
        </div>

        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Mã đơn hàng:</span>
            <span className="text-blue-600 font-bold">{orderData.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Tổng thanh toán:</span>
            <span className="font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderData.total)}</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Thông tin đơn hàng</h2>
          {orderData.items && orderData.items.length > 0 ? (
            <ul className="space-y-3">
              {orderData.items.map((item, index) => (
                <li key={index} className="flex items-center gap-4 border-b pb-3">
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                    <img 
                      src={item.image || "https://via.placeholder.com/150"} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                      {item.quantity} x {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">Chi tiết đơn hàng không có sẵn</p>
          )}
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Chúng tôi đã gửi email xác nhận đơn hàng đến địa chỉ email của bạn.
            Bạn sẽ nhận được thông báo khi đơn hàng được giao.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage; 
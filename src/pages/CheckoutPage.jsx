import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import Spinner from '../components/Spinner';
import Toast from '../components/Toast';

const CheckoutPage = () => {
  const { items, totalAmount, clearItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    note: '',
    paymentMethod: 'cod',
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Format price with commas
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'Vui lòng chọn tỉnh/thành phố';
    }
    
    if (!formData.district.trim()) {
      newErrors.district = 'Vui lòng chọn quận/huyện';
    }
    
    if (!formData.ward.trim()) {
      newErrors.ward = 'Vui lòng chọn phường/xã';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      Toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare order data
      const orderData = {
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.ward}, ${formData.district}, ${formData.city}`,
        },
        items: items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
        })),
        totalAmount: totalAmount,
        shippingFee: totalAmount >= 500000 ? 0 : 30000,
        paymentMethod: formData.paymentMethod,
        note: formData.note,
      };
      
      // Call API to create order
      const response = await orderAPI.createOrder(orderData);
      
      // Clear cart
      clearItems();
      
      // Redirect to success page with order ID
      navigate('/order-success', { state: { orderId: response.data.id } });
      
      Toast.success('Đặt hàng thành công');
    } catch (error) {
      console.error('Error creating order:', error);
      Toast.error(error.response?.data?.message || 'Đã có lỗi xảy ra khi đặt hàng');
    } finally {
      setLoading(false);
    }
  };
  
  // Calculate shipping fee and total
  const shippingFee = totalAmount >= 500000 ? 0 : 30000;
  const finalTotal = totalAmount + shippingFee;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-6">Thông tin giao hàng</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Họ tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`input ${errors.fullName ? 'border-red-500' : ''}`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`input ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`input ${errors.address ? 'border-red-500' : ''}`}
                    placeholder="Số nhà, tên đường"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    Tỉnh/Thành phố <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`input ${errors.city ? 'border-red-500' : ''}`}
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                  </select>
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                    Quận/Huyện <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="district"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    className={`input ${errors.district ? 'border-red-500' : ''}`}
                  >
                    <option value="">Chọn quận/huyện</option>
                    <option value="Quận 1">Quận 1</option>
                    <option value="Quận 2">Quận 2</option>
                    <option value="Quận 3">Quận 3</option>
                    <option value="Quận 4">Quận 4</option>
                    <option value="Quận 5">Quận 5</option>
                  </select>
                  {errors.district && (
                    <p className="mt-1 text-sm text-red-500">{errors.district}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-1">
                    Phường/Xã <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="ward"
                    name="ward"
                    value={formData.ward}
                    onChange={handleChange}
                    className={`input ${errors.ward ? 'border-red-500' : ''}`}
                  >
                    <option value="">Chọn phường/xã</option>
                    <option value="Phường 1">Phường 1</option>
                    <option value="Phường 2">Phường 2</option>
                    <option value="Phường 3">Phường 3</option>
                    <option value="Phường 4">Phường 4</option>
                    <option value="Phường 5">Phường 5</option>
                  </select>
                  {errors.ward && (
                    <p className="mt-1 text-sm text-red-500">{errors.ward}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                  Ghi chú
                </label>
                <textarea
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  rows="3"
                  className="input"
                  placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                ></textarea>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Phương thức thanh toán</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="cod"
                      name="paymentMethod"
                      type="radio"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                      Thanh toán khi nhận hàng (COD)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="bank-transfer"
                      name="paymentMethod"
                      type="radio"
                      value="bank-transfer"
                      checked={formData.paymentMethod === 'bank-transfer'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="bank-transfer" className="ml-3 block text-sm font-medium text-gray-700">
                      Chuyển khoản ngân hàng
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="momo"
                      name="paymentMethod"
                      type="radio"
                      value="momo"
                      checked={formData.paymentMethod === 'momo'}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label htmlFor="momo" className="ml-3 block text-sm font-medium text-gray-700">
                      Ví điện tử MoMo
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-6">Tóm tắt đơn hàng</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex">
                  <div className="flex-shrink-0 w-16 h-16 border rounded-md overflow-hidden">
                    <img
                      src={item.image || 'https://via.placeholder.com/64x64'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.selectedSize && `Size: ${item.selectedSize}`}
                      {item.selectedSize && item.selectedColor && ', '}
                      {item.selectedColor && `Màu: ${item.selectedColor}`}
                    </p>
                    <div className="flex justify-between mt-1">
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                      <p className="text-sm font-medium text-gray-900">{formatPrice(item.totalPrice)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính:</span>
                <span className="font-medium">{formatPrice(totalAmount)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển:</span>
                <span className="font-medium">
                  {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                </span>
              </div>
              
              <div className="flex justify-between border-t border-gray-200 pt-4">
                <span className="text-lg font-bold">Tổng cộng:</span>
                <span className="text-lg font-bold text-blue-600">{formatPrice(finalTotal)}</span>
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full btn btn-primary py-3 mt-6 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Spinner size="small" />
                  <span className="ml-2">Đang xử lý...</span>
                </>
              ) : (
                'Xác nhận đặt hàng'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 
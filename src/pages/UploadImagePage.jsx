import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchByImage, clearAiSuggestions } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import Toast from '../components/Toast';

const UploadImagePage = () => {
  const dispatch = useDispatch();
  const { aiSuggestedProducts, loading, error } = useSelector((state) => state.product);
  
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef(null);
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      return;
    }
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      Toast.error('Vui lòng chọn file hình ảnh');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      Toast.error('Kích thước file không được vượt quá 5MB');
      return;
    }
    
    setImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    
    // Clear previous results
    dispatch(clearAiSuggestions());
  };
  
  const handleSearch = () => {
    if (!image) {
      Toast.error('Vui lòng chọn hình ảnh');
      return;
    }
    
    dispatch(searchByImage(image));
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    
    const file = e.dataTransfer.files[0];
    
    if (!file) {
      return;
    }
    
    // Check if file is an image
    if (!file.type.match('image.*')) {
      Toast.error('Vui lòng chọn file hình ảnh');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      Toast.error('Kích thước file không được vượt quá 5MB');
      return;
    }
    
    setImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    
    // Clear previous results
    dispatch(clearAiSuggestions());
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tìm kiếm sản phẩm bằng hình ảnh</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Tải lên hình ảnh</h2>
            
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                preview ? 'border-blue-300' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {preview ? (
                <div className="mb-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-lg"
                  />
                </div>
              ) : (
                <div className="mb-4">
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              )}
              
              <p className="text-gray-600 mb-4">
                Kéo và thả hình ảnh vào đây, hoặc{' '}
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  chọn từ thiết bị
                </button>
              </p>
              
              <p className="text-sm text-gray-500">
                Hỗ trợ định dạng: JPEG, PNG, GIF. Kích thước tối đa: 5MB
              </p>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleSearch}
                disabled={!image || loading}
                className={`btn btn-primary w-full py-3 flex items-center justify-center ${
                  !image || loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Đang tìm kiếm...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    Tìm sản phẩm tương tự
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Hướng dẫn sử dụng</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                  1
                </div>
                <p>Tải lên hình ảnh sản phẩm bạn muốn tìm (quần áo, giày dép, phụ kiện...)</p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                  2
                </div>
                <p>Nhấn nút "Tìm sản phẩm tương tự" để bắt đầu tìm kiếm</p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                  3
                </div>
                <p>Hệ thống AI sẽ phân tích hình ảnh và hiển thị các sản phẩm tương tự</p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                  4
                </div>
                <p>Chọn sản phẩm bạn thích và thêm vào giỏ hàng</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Kết quả tìm kiếm</h2>
            
            {loading ? (
              <div className="py-12 flex justify-center">
                <Spinner size="large" />
              </div>
            ) : error ? (
              <div className="bg-red-50 p-4 rounded-md">
                <p className="text-red-800">{error}</p>
              </div>
            ) : aiSuggestedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aiSuggestedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : preview ? (
              <div className="py-8 text-center">
                <p className="text-gray-500">Nhấn "Tìm sản phẩm tương tự" để bắt đầu tìm kiếm.</p>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">Tải lên hình ảnh để tìm kiếm sản phẩm tương tự.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImagePage; 
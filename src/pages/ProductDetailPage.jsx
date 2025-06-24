import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, fetchSimilarProducts } from '../redux/slices/productSlice';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import Toast from '../components/Toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, similarProducts, loading, error } = useSelector((state) => state.product);
  const { addItem } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  
  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
      dispatch(fetchSimilarProducts({ productId: id, limit: 4 }));
    }
    
    // Reset state when product changes
    setSelectedImage(0);
    setQuantity(1);
    setSelectedSize('');
    setSelectedColor('');
  }, [dispatch, id]);
  
  // Set default selections when product loads
  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
    }
  }, [product]);
  
  // Format price with commas
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };
  
  const handleAddToCart = () => {
    if (!selectedSize && product?.sizes?.length > 0) {
      Toast.error('Vui lòng chọn kích thước');
      return;
    }
    
    if (!selectedColor && product?.colors?.length > 0) {
      Toast.error('Vui lòng chọn màu sắc');
      return;
    }
    
    addItem(product, quantity, selectedSize, selectedColor);
    Toast.success('Đã thêm vào giỏ hàng');
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  if (loading && !product) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <Spinner size="large" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-800">{error}</p>
          <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Trang chủ
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link to={`/category/${product.category}`} className="text-gray-700 hover:text-blue-600 ml-1 md:ml-2">
                  {product.category}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-500 ml-1 md:ml-2 truncate max-w-xs">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <div className="bg-white p-2 rounded-lg shadow-sm mb-4">
            <img
              src={product.images?.[selectedImage] || 'https://via.placeholder.com/600x600'}
              alt={product.name}
              className="w-full h-96 object-contain"
            />
          </div>
          
          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border-2 rounded-md overflow-hidden ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          
          {/* Product Rating */}
          {product.rating && (
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating.toFixed(1)} ({product.reviewCount || 0} đánh giá)
              </span>
            </div>
          )}
          
          {/* Product Price */}
          <div className="mb-6">
            <span className="text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            
            {product.discount > 0 && product.originalPrice && (
              <div className="mt-1">
                <span className="text-lg text-gray-500 line-through mr-2">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-red-500 font-medium">
                  Giảm {product.discount}%
                </span>
              </div>
            )}
          </div>
          
          {/* Product Description */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Mô tả sản phẩm</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Kích thước</h2>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-700 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Màu sắc</h2>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`px-4 py-2 border rounded-md ${
                      selectedColor === color
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-700 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity Selection */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Số lượng</h2>
            <div className="flex items-center">
              <button
                className="w-10 h-10 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                </svg>
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 h-10 border-t border-b border-gray-300 text-center focus:outline-none"
              />
              <button
                className="w-10 h-10 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100"
                onClick={() => setQuantity(quantity + 1)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="btn btn-primary flex-1 py-3 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              Thêm vào giỏ hàng
            </button>
            
            <Link
              to="/upload-search"
              className="btn btn-secondary flex-1 py-3 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Tìm sản phẩm tương tự
            </Link>
          </div>
          
          {/* Additional Info */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center mb-4">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Giao hàng miễn phí cho đơn hàng từ 500.000đ</span>
            </div>
            <div className="flex items-center mb-4">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Đổi trả trong vòng 30 ngày</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Bảo hành 12 tháng</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Sản phẩm tương tự</h2>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : similarProducts && similarProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Không có sản phẩm tương tự.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage; 
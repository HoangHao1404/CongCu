import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import CategoryMenu from '../components/CategoryMenu';
import Spinner from '../components/Spinner';

const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  
  useEffect(() => {
    // Fetch featured products
    dispatch(fetchProducts({ limit: 8 }));
    
    // In a real app, you'd fetch different product categories
    // For now, we'll simulate by setting them after the main fetch
    setTimeout(() => {
      if (products.length > 0) {
        setFeaturedProducts(products.slice(0, 4));
        setNewArrivals(products.slice(0, 8));
      }
    }, 100);
  }, [dispatch, products.length]);
  
  // Banner data
  const banners = [
    {
      id: 1,
      title: 'Bộ sưu tập mới nhất',
      description: 'Khám phá các xu hướng thời trang mới nhất',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      link: '/category/ao',
    },
    {
      id: 2,
      title: 'Giảm giá lên đến 50%',
      description: 'Ưu đãi đặc biệt cho thành viên mới',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      link: '/category/giay',
    },
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <div className="mb-10">
        <div className="relative rounded-lg overflow-hidden h-96">
          <img
            src={banners[0].image}
            alt={banners[0].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent flex items-center">
            <div className="px-10 max-w-lg">
              <h1 className="text-4xl font-bold text-white mb-4">{banners[0].title}</h1>
              <p className="text-white mb-6">{banners[0].description}</p>
              <Link
                to={banners[0].link}
                className="bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Mua ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Categories and Featured Products */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Categories Sidebar */}
        <div className="md:col-span-1">
          <CategoryMenu />
          
          {/* Secondary Banner */}
          <div className="mt-8 rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src={banners[1].image}
                alt={banners[1].title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-4">
                <h3 className="text-xl font-bold text-white text-center mb-2">{banners[1].title}</h3>
                <p className="text-white text-center text-sm mb-4">{banners[1].description}</p>
                <Link
                  to={banners[1].link}
                  className="bg-white text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  Xem ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Products */}
        <div className="md:col-span-3">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Sản phẩm nổi bật</h2>
              <Link to="/category/featured" className="text-blue-600 hover:underline">
                Xem tất cả
              </Link>
            </div>
            
            {loading && products.length === 0 ? (
              <div className="flex justify-center py-12">
                <Spinner size="large" />
              </div>
            ) : error ? (
              <div className="bg-red-50 p-4 rounded-md">
                <p className="text-red-800">{error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(featuredProducts.length > 0 ? featuredProducts : products.slice(0, 3)).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
          
          {/* AI Recommendation Banner */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 mb-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0 md:mr-8">
                <h3 className="text-xl font-bold mb-2">Tìm kiếm bằng hình ảnh</h3>
                <p className="mb-4">
                  Tải lên hình ảnh sản phẩm bạn thích, AI của chúng tôi sẽ tìm những sản phẩm tương tự!
                </p>
                <Link
                  to="/upload-search"
                  className="inline-block bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Thử ngay
                </Link>
              </div>
              <div className="flex-shrink-0">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* New Arrivals */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Sản phẩm mới</h2>
          <Link to="/category/new" className="text-blue-600 hover:underline">
            Xem tất cả
          </Link>
        </div>
        
        {loading && newArrivals.length === 0 ? (
          <div className="flex justify-center py-12">
            <Spinner size="large" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {(newArrivals.length > 0 ? newArrivals : products).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
      
      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Giao hàng nhanh</h3>
          <p className="text-gray-600">Giao hàng trong vòng 24h đối với nội thành</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Đảm bảo chất lượng</h3>
          <p className="text-gray-600">Đổi trả miễn phí trong vòng 30 ngày</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Thanh toán an toàn</h3>
          <p className="text-gray-600">Hỗ trợ nhiều phương thức thanh toán</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 
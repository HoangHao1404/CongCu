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
      title: 'Thời trang bền vững',
      description: 'Khám phá bộ sưu tập theo tinh thần Wabi-sabi, vẻ đẹp từ sự không hoàn hảo',
      image: 'https://images.unsplash.com/photo-1583001810204-15f5e2e744b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      link: '/category/ao',
    },
    {
      id: 2,
      title: 'Bộ sưu tập mùa thu',
      description: 'Vẻ đẹp tự nhiên từ chất liệu hữu cơ',
      image: 'https://images.unsplash.com/photo-1550047510-40e88d132d41?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      link: '/category/giay',
    },
  ];
  
  return (
    <div className="bg-rice">
      {/* Hero Banner - Full width, impactful */}
      <div className="relative h-[70vh] overflow-hidden mb-16">
        <img
          src={banners[0].image}
          alt={banners[0].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-wood-dark bg-opacity-40 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-serif text-rice mb-6 leading-tight">
                {banners[0].title}
              </h1>
              <p className="text-xl text-rice mb-8 max-w-lg">
                {banners[0].description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={banners[0].link}
                  className="btn btn-primary btn-ripple px-8 py-3 text-lg"
                >
                  Khám phá ngay
                </Link>
                <Link
                  to="/upload-search"
                  className="btn bg-rice text-wood-dark hover:bg-stone-light px-8 py-3 text-lg flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Tìm bằng ảnh
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pb-16">
        {/* USP Section - Why choose us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-sm shadow-wabi border border-stone-light text-center transform transition-transform hover:-translate-y-1 hover:shadow-wabi-hover">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-matcha-light bg-opacity-20 mb-4">
              <svg className="w-8 h-8 text-matcha-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-serif text-wood-dark mb-3">Tự nhiên & Bền vững</h3>
            <p className="text-stone-dark">Sản phẩm từ chất liệu hữu cơ, thân thiện với môi trường</p>
          </div>
          
          <div className="bg-white p-8 rounded-sm shadow-wabi border border-stone-light text-center transform transition-transform hover:-translate-y-1 hover:shadow-wabi-hover">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-matcha-light bg-opacity-20 mb-4">
              <svg className="w-8 h-8 text-matcha-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-serif text-wood-dark mb-3">Thủ công tinh tế</h3>
            <p className="text-stone-dark">Mỗi sản phẩm là một tác phẩm nghệ thuật với nét đẹp riêng biệt</p>
          </div>
          
          <div className="bg-white p-8 rounded-sm shadow-wabi border border-stone-light text-center transform transition-transform hover:-translate-y-1 hover:shadow-wabi-hover">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-matcha-light bg-opacity-20 mb-4">
              <svg className="w-8 h-8 text-matcha-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-serif text-wood-dark mb-3">Giao hàng nhanh</h3>
            <p className="text-stone-dark">Miễn phí giao hàng cho đơn từ 500.000đ</p>
          </div>
        </div>
        
        {/* Categories and Featured Products */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {/* Categories Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-2xl font-serif text-wood-dark mb-6 wabi-title">Danh mục</h2>
              <CategoryMenu />
              
              {/* Secondary Banner */}
              <div className="mt-10 rounded-sm overflow-hidden border border-stone-light">
                <div className="relative">
                  <img
                    src={banners[1].image}
                    alt={banners[1].title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-wood-dark bg-opacity-40 flex flex-col justify-center items-center p-6">
                    <h3 className="text-2xl font-serif text-rice text-center mb-3">{banners[1].title}</h3>
                    <p className="text-rice text-center mb-5">{banners[1].description}</p>
                    <Link
                      to={banners[1].link}
                      className="bg-rice text-wood-dark px-6 py-2 rounded-sm hover:bg-stone-light transition-colors"
                    >
                      Xem ngay
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Featured Products */}
          <div className="md:col-span-3">
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-wood-dark wabi-title">Sản phẩm nổi bật</h2>
                <Link to="/category/featured" className="text-matcha-dark hover:text-matcha border-b border-transparent hover:border-matcha transition-colors">
                  Xem tất cả
                </Link>
              </div>
              
              {loading && products.length === 0 ? (
                <div className="flex justify-center py-16">
                  <Spinner size="large" />
                </div>
              ) : error ? (
                <div className="bg-red-50 p-4 rounded-sm border-l-4 border-red-500">
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
            <div className="bg-matcha bg-opacity-10 border border-matcha-light rounded-sm p-8 mb-12">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h3 className="text-2xl font-serif text-wood-dark mb-3">Tìm kiếm bằng hình ảnh</h3>
                  <p className="text-stone-dark mb-5">
                    Tải lên hình ảnh sản phẩm bạn thích, AI của chúng tôi sẽ tìm những sản phẩm tương tự trong phong cách Wabi-sabi!
                  </p>
                  <Link
                    to="/upload-search"
                    className="btn btn-primary inline-flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Thử ngay
                  </Link>
                </div>
                <div className="flex-shrink-0 bg-white p-4 rounded-full shadow-wabi">
                  <svg className="w-24 h-24 text-matcha" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* New Arrivals */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif text-wood-dark wabi-title">Sản phẩm mới</h2>
            <Link to="/category/new" className="text-matcha-dark hover:text-matcha border-b border-transparent hover:border-matcha transition-colors">
              Xem tất cả
            </Link>
          </div>
          
          {loading && newArrivals.length === 0 ? (
            <div className="flex justify-center py-16">
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
        
        {/* Philosophy Section */}
        <div className="bg-white rounded-sm shadow-wabi border border-stone-light p-8 md:p-12 mb-16">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-serif text-wood-dark mb-6">Triết lý Wabi-sabi</h2>
              <p className="text-stone-dark mb-4">
                Wabi-sabi là triết lý thẩm mỹ Nhật Bản về vẻ đẹp của sự không hoàn hảo, không vĩnh cửu và không trọn vẹn.
              </p>
              <p className="text-stone-dark mb-6">
                Mỗi sản phẩm của chúng tôi đều mang đặc tính độc đáo, thể hiện sự trân trọng đối với vẻ đẹp tự nhiên và tính chất thủ công.
              </p>
              <Link to="/about" className="btn btn-secondary">
                Tìm hiểu thêm
              </Link>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Wabi-sabi philosophy" 
                className="w-full h-64 md:h-80 object-cover rounded-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 
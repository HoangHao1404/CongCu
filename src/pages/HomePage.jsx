import React, { useEffect, useState, useRef } from 'react';
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
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Refs cho các phần tử để kích hoạt hiệu ứng khi scroll
  const featuredRef = useRef(null);
  const newArrivalsRef = useRef(null);
  const philosophyRef = useRef(null);
  
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
    
    // Scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });
    
    // Slider interval
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => {
      clearInterval(slideInterval);
      observer.disconnect();
    };
  }, [dispatch, products.length]);
  
  // Banner data
  const banners = [
    {
      id: 1,
      title: 'Thời trang bền vững',
      subtitle: 'Bộ sưu tập Thu - Đông 2023',
      description: 'Khám phá vẻ đẹp từ sự không hoàn hảo theo triết lý Wabi-sabi',
      image: 'https://images.unsplash.com/photo-1583001810204-15f5e2e744b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      link: '/category/ao',
    },
    {
      id: 2,
      title: 'Nghệ thuật thủ công',
      subtitle: 'Mỗi sản phẩm là một tác phẩm',
      description: 'Chất liệu tự nhiên, kỹ thuật truyền thống, tôn vinh vẻ đẹp mộc mạc',
      image: 'https://images.unsplash.com/photo-1550047510-40e88d132d41?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      link: '/category/giay',
    },
    {
      id: 3,
      title: 'Sống chậm lại',
      subtitle: 'Thời trang bền vững',
      description: 'Trang phục thiết kế để tồn tại với thời gian, không chạy theo xu hướng',
      image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      link: '/category/quan',
    },
  ];
  
  // Tính năng nổi bật
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
        </svg>
      ),
      title: 'Tự nhiên & Bền vững',
      description: 'Sản phẩm từ chất liệu hữu cơ, thân thiện với môi trường',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
        </svg>
      ),
      title: 'Thủ công tinh tế',
      description: 'Mỗi sản phẩm là một tác phẩm nghệ thuật với nét đẹp riêng biệt',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      title: 'Giao hàng nhanh',
      description: 'Miễn phí giao hàng cho đơn từ 500.000đ',
    },
  ];
  
  return (
    <div className="bg-rice bg-wabi-texture">
      {/* Hero Banner - Full width, impactful */}
      <div className="relative h-[85vh] overflow-hidden">
        <div className="absolute inset-0 flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          {banners.map((banner, index) => (
            <div key={banner.id} className="relative w-full h-full flex-shrink-0">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-wood-dark bg-opacity-30 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl slide-in-left">
                    <p className="text-rice text-lg md:text-xl tracking-widest uppercase mb-3 font-light">{banner.subtitle}</p>
                    <h1 className="text-5xl md:text-7xl font-serif text-rice mb-6 leading-tight text-shadow">
                      {banner.title}
                    </h1>
                    <p className="text-xl text-rice mb-8 max-w-lg">
                      {banner.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        to={banner.link}
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
          ))}
        </div>
        
        {/* Slider controls */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSlide === index ? 'bg-rice w-6' : 'bg-rice bg-opacity-50'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Scroll down indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float hidden md:block">
          <svg className="w-8 h-8 text-rice" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
      
      {/* USP Section - Why choose us */}
      <section className="py-16 bg-stone-light bg-opacity-30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <h2 className="text-3xl md:text-4xl font-serif text-wood-dark mb-4 wabi-title">Triết lý Wabi-sabi</h2>
            <p className="text-lg text-stone-dark max-w-2xl mx-auto">
              Tôn vinh vẻ đẹp của sự không hoàn hảo, không vĩnh cửu và không trọn vẹn
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-sm shadow-wabi border border-stone-light text-center transform transition-all duration-500 hover:-translate-y-1 hover:shadow-wabi-hover stagger-item"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-matcha-light bg-opacity-20 mb-4 text-matcha-dark">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif text-wood-dark mb-3">{feature.title}</h3>
                <p className="text-stone-dark">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-16">
        {/* Categories and Featured Products */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {/* Categories Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-2xl font-serif text-wood-dark mb-6 wabi-title">Danh mục</h2>
              <CategoryMenu />
              
              {/* Secondary Banner */}
              <div className="mt-10 rounded-sm overflow-hidden border border-stone-light reveal">
                <div className="relative img-hover-zoom">
                  <img
                    src={banners[1].image}
                    alt={banners[1].title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-wood-dark bg-opacity-40 flex flex-col justify-center items-center p-6">
                    <h3 className="text-2xl font-serif text-rice text-center mb-3 text-shadow-sm">{banners[1].title}</h3>
                    <p className="text-rice text-center mb-5">{banners[1].description}</p>
                    <Link
                      to={banners[1].link}
                      className="bg-rice text-wood-dark px-6 py-2 rounded-sm hover:bg-stone-light transition-colors btn-hover-float"
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
            <div className="mb-12 reveal" ref={featuredRef}>
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
                  {(featuredProducts.length > 0 ? featuredProducts : products.slice(0, 3)).map((product, index) => (
                    <div key={product.id} className={`stagger-item delay-${index * 100}`}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* AI Recommendation Banner */}
            <div className="bg-matcha bg-opacity-10 border border-matcha-light rounded-sm p-8 mb-12 reveal">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h3 className="text-2xl font-serif text-wood-dark mb-3">Tìm kiếm bằng hình ảnh</h3>
                  <p className="text-stone-dark mb-5">
                    Tải lên hình ảnh sản phẩm bạn thích, AI của chúng tôi sẽ tìm những sản phẩm tương tự trong phong cách Wabi-sabi!
                  </p>
                  <Link
                    to="/upload-search"
                    className="btn btn-primary inline-flex items-center btn-hover-float"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Thử ngay
                  </Link>
                </div>
                <div className="flex-shrink-0 bg-white p-6 rounded-full shadow-wabi transform transition-transform hover:rotate-3 hover:scale-105">
                  <svg className="w-24 h-24 text-matcha" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* New Arrivals with horizontal scroll on mobile */}
        <div className="mb-16 reveal" ref={newArrivalsRef}>
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
            <div className="overflow-x-auto pb-4 md:overflow-visible">
              <div className="flex md:grid md:grid-cols-4 gap-6 w-max md:w-auto">
                {(newArrivals.length > 0 ? newArrivals : products).map((product, index) => (
                  <div key={product.id} className="w-64 md:w-auto stagger-item" style={{animationDelay: `${index * 100}ms`}}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Philosophy Section */}
        <div className="bg-white rounded-sm shadow-wabi border border-stone-light p-8 md:p-12 mb-16 reveal" ref={philosophyRef}>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-serif text-wood-dark mb-6">Triết lý Wabi-sabi</h2>
              <p className="text-stone-dark mb-4 text-lg">
                Wabi-sabi là triết lý thẩm mỹ Nhật Bản về vẻ đẹp của sự không hoàn hảo, không vĩnh cửu và không trọn vẹn.
              </p>
              <p className="text-stone-dark mb-6">
                Mỗi sản phẩm của chúng tôi đều mang đặc tính độc đáo, thể hiện sự trân trọng đối với vẻ đẹp tự nhiên và tính chất thủ công.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/about" className="btn btn-secondary btn-hover-float">
                  Tìm hiểu thêm
                </Link>
                <Link to="/category/featured" className="btn btn-outline btn-hover-float">
                  Khám phá bộ sưu tập
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Wabi-sabi philosophy" 
                  className="w-full h-64 md:h-80 object-cover rounded-sm"
                />
                <div className="absolute -bottom-4 -right-4 hidden md:block">
                  <img 
                    src="https://images.unsplash.com/photo-1563911892437-1feda0179e1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
                    alt="Pottery" 
                    className="w-32 h-32 object-cover rounded-sm border-4 border-rice shadow-wabi"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter Subscription */}
        <div className="bg-wood bg-opacity-10 rounded-sm p-8 md:p-12 text-center mb-16 reveal">
          <h2 className="text-2xl md:text-3xl font-serif text-wood-dark mb-4">Đăng ký nhận thông tin</h2>
          <p className="text-stone-dark mb-8 max-w-2xl mx-auto">
            Nhận thông tin về bộ sưu tập mới, sự kiện đặc biệt và những câu chuyện thú vị về triết lý Wabi-sabi
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Email của bạn" 
              className="input flex-grow py-3"
              required
            />
            <button type="submit" className="btn btn-primary whitespace-nowrap">
              Đăng ký
            </button>
          </form>
        </div>
      </div>
      
      {/* Instagram Feed Section */}
      <section className="py-16 bg-stone-light bg-opacity-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 reveal">
            <h2 className="text-2xl font-serif text-wood-dark mb-3 wabi-title">@wabi_shop</h2>
            <p className="text-stone-dark">Theo dõi chúng tôi trên Instagram</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 reveal">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="block overflow-hidden aspect-square img-hover-zoom"
                aria-label="Instagram post"
              >
                <img 
                  src={`https://source.unsplash.com/random/300x300?wabi-sabi,pottery,fashion&sig=${item}`} 
                  alt="Instagram post" 
                  className="w-full h-full object-cover"
                />
                <div className="overlay-fade flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 
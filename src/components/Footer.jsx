import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = 2025;
  
  const categories = [
    { name: 'Áo', path: '/category/ao' },
    { name: 'Quần', path: '/category/quan' },
    { name: 'Giày', path: '/category/giay' },
    { name: 'Phụ kiện', path: '/category/phu-kien' },
    { name: 'Bộ sưu tập', path: '/category/bo-suu-tap' },
  ];
  
  const customerService = [
    { name: 'Chính sách đổi trả', path: '/policy/return' },
    { name: 'Chính sách vận chuyển', path: '/policy/shipping' },
    { name: 'Chính sách bảo mật', path: '/policy/privacy' },
    { name: 'Câu hỏi thường gặp', path: '/faq' },
    { name: 'Liên hệ', path: '/contact' },
  ];
  
  const aboutUs = [
    { name: 'Về chúng tôi', path: '/about' },
    { name: 'Triết lý Wabi-sabi', path: '/wabi-sabi' },
    { name: 'Blog', path: '/blog' },
    { name: 'Tuyển dụng', path: '/careers' },
    { name: 'Cửa hàng', path: '/stores' },
  ];
  
  const socialMedia = [
    { name: 'Facebook', path: 'https://facebook.com', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ) },
    { name: 'Instagram', path: 'https://instagram.com', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    ) },
    { name: 'Twitter', path: 'https://twitter.com', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ) },
    { name: 'Pinterest', path: 'https://pinterest.com', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
      </svg>
    ) },
    { name: 'YouTube', path: 'https://youtube.com', icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ) },
  ];
  
  const paymentMethods = [
    { name: 'Visa', icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#F9F6F0"/>
        <path d="M9.5 14.5L11 9.5L12.5 14.5M17.5 9.5L16.5 12.5L18.5 12.5M7 12.5H8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) },
    { name: 'Mastercard', icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#F9F6F0"/>
        <circle cx="9" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="15" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ) },
    { name: 'PayPal', icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#F9F6F0"/>
        <path d="M7 14.5L8 9.5H11.5C12.5 9.5 13.5 10 13.5 11.5C13.5 13 12.5 13.5 11.5 13.5H9.5L9 14.5H7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 13.5L10.5 9.5H14C15 9.5 16 10 16 11.5C16 13 15 13.5 14 13.5H12L11.5 14.5H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) },
    { name: 'Apple Pay', icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#F9F6F0"/>
        <path d="M13 9.5C13 8.5 13.5 7.5 14.5 7C15 7.5 15.5 8.5 15.5 9.5C15.5 10.5 15 11.5 14 12C13.5 11 13 10.5 13 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 12C10 14.5 11.5 17 13.5 17C14.5 17 15 16.5 16 16.5C17 16.5 17.5 17 18.5 17C19.5 17 20.5 15.5 21 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) },
  ];

  return (
    <footer className="bg-gradient-to-b from-wood-dark to-ink text-rice">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo & Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6 group">
              <div className="relative w-12 h-12 mr-3 overflow-hidden transition-all duration-500 group-hover:rotate-12">
                <div className="absolute inset-0 bg-gradient-wabi from-matcha to-moss-light rounded-xl transform rotate-45 shadow-wabi-3d"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-rice font-serif text-2xl text-shadow">W</span>
                </div>
              </div>
              <div>
                <span className="text-2xl font-serif text-rice tracking-wide">
                  Wabi Shop
                </span>
                <span className="block text-xs text-stone-light font-sans tracking-widest uppercase">
                  VẺ ĐẸP TỪ SỰ KHÔNG HOÀN HẢO • 2025
                </span>
              </div>
            </Link>
            
            <p className="mb-6 text-stone-light">
              Wabi Shop là thương hiệu thời trang theo triết lý Wabi-sabi, tôn vinh vẻ đẹp của sự không hoàn hảo và giá trị của thời gian.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-matcha-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>123 Đường Wabi-sabi, Quận 1, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-matcha-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>contact@wabishop.com</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-matcha-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span>+84 123 456 789</span>
              </div>
            </div>
            
            {/* Social Media */}
            <div>
              <h3 className="text-lg font-serif mb-4 text-rice">Kết nối với chúng tôi</h3>
              <div className="flex space-x-4">
                {socialMedia.map((social) => (
                  <a
                    key={social.name}
                    href={social.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-wood-dark/30 hover:bg-matcha/20 p-2 rounded-full transition-all transform hover:-translate-y-1 hover:shadow-wabi"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-serif mb-4 text-rice">Danh mục</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to={category.path} 
                    className="text-stone-light hover:text-matcha-light transition-colors hover:translate-x-1 inline-block transform"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-serif mb-4 text-rice">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2">
              {customerService.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.path} 
                    className="text-stone-light hover:text-matcha-light transition-colors hover:translate-x-1 inline-block transform"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* About Us */}
          <div>
            <h3 className="text-lg font-serif mb-4 text-rice">Về chúng tôi</h3>
            <ul className="space-y-2">
              {aboutUs.map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    className="text-stone-light hover:text-matcha-light transition-colors hover:translate-x-1 inline-block transform"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Payment Methods */}
            <div className="mt-8">
              <h3 className="text-lg font-serif mb-4 text-rice">Thanh toán</h3>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((method) => (
                  <div 
                    key={method.name}
                    className="text-wood-dark"
                    title={method.name}
                  >
                    {method.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-wood/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-stone-light text-sm mb-4 md:mb-0">
              &copy; {currentYear} Wabi Shop. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link to="/policy/terms" className="text-stone-light hover:text-matcha-light transition-colors">
                Điều khoản sử dụng
              </Link>
              <Link to="/policy/privacy" className="text-stone-light hover:text-matcha-light transition-colors">
                Chính sách bảo mật
              </Link>
              <Link to="/sitemap" className="text-stone-light hover:text-matcha-light transition-colors">
                Sơ đồ trang
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Về Shop AI</h1>
        
        <div className="mb-12">
          <img 
            src="/images/about-banner.jpg" 
            alt="Shop AI Banner" 
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md mb-6"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/1200x400?text=Shop+AI";
            }}
          />
        </div>
        
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Câu chuyện của chúng tôi</h2>
          <p className="mb-6">
            Shop AI được thành lập vào năm 2023 với mục tiêu mang đến trải nghiệm mua sắm thông minh và cá nhân hóa cho người dùng. 
            Chúng tôi kết hợp công nghệ trí tuệ nhân tạo tiên tiến với sự hiểu biết sâu sắc về thời trang để mang đến những gợi ý sản phẩm chính xác và phù hợp với từng khách hàng.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Sứ mệnh của chúng tôi</h2>
          <p className="mb-6">
            Sứ mệnh của Shop AI là đơn giản hóa trải nghiệm mua sắm bằng cách sử dụng công nghệ AI để hiểu rõ nhu cầu và sở thích của khách hàng. 
            Chúng tôi tin rằng mỗi người đều xứng đáng có được trải nghiệm mua sắm được cá nhân hóa, giúp họ dễ dàng tìm thấy những sản phẩm phù hợp nhất với phong cách và nhu cầu của mình.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Công nghệ AI của chúng tôi</h2>
          <p className="mb-6">
            Hệ thống AI của Shop AI được xây dựng dựa trên các thuật toán học máy tiên tiến, có khả năng phân tích hình ảnh và hiểu được các đặc điểm của sản phẩm. 
            Điều này cho phép chúng tôi cung cấp tính năng "Tìm sản phẩm tương tự" dựa trên hình ảnh, giúp khách hàng dễ dàng tìm thấy những sản phẩm có thiết kế, màu sắc hoặc phong cách tương tự với những gì họ đang tìm kiếm.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Cam kết của chúng tôi</h2>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Cung cấp sản phẩm chất lượng cao với giá cả hợp lý</li>
            <li className="mb-2">Không ngừng cải tiến công nghệ AI để mang đến trải nghiệm mua sắm tốt nhất</li>
            <li className="mb-2">Bảo mật thông tin cá nhân của khách hàng</li>
            <li className="mb-2">Hỗ trợ khách hàng nhanh chóng và hiệu quả</li>
            <li>Đảm bảo sự hài lòng của khách hàng với mọi đơn hàng</li>
          </ul>
        </div>
        
        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">Liên hệ với chúng tôi</h2>
          <div className="text-center">
            <p className="mb-2"><strong>Email:</strong> contact@shopai.com</p>
            <p className="mb-2"><strong>Điện thoại:</strong> 0123 456 789</p>
            <p><strong>Địa chỉ:</strong> 123 Đường AI, Quận Innovation, TP HCM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 
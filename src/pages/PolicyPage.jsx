import React from 'react';

const PolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Chính sách của Shop AI</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">1. Chính sách bảo mật</h2>
            <p className="mb-4">
              Shop AI cam kết bảo vệ thông tin cá nhân của khách hàng. Chúng tôi thu thập, lưu trữ và xử lý thông tin của bạn theo quy định của pháp luật hiện hành và chỉ sử dụng thông tin đó cho các mục đích sau:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Xử lý đơn hàng và cung cấp dịch vụ</li>
              <li className="mb-2">Cải thiện trải nghiệm mua sắm của bạn</li>
              <li className="mb-2">Liên lạc với bạn về đơn hàng, sản phẩm hoặc dịch vụ</li>
              <li className="mb-2">Phát triển và cải tiến thuật toán AI gợi ý sản phẩm</li>
              <li>Tuân thủ các nghĩa vụ pháp lý</li>
            </ul>
            <p>
              Chúng tôi không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn cho bên thứ ba ngoại trừ khi được yêu cầu bởi pháp luật hoặc khi có sự đồng ý rõ ràng từ bạn.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">2. Chính sách đổi trả</h2>
            <p className="mb-4">
              Chúng tôi muốn bạn hoàn toàn hài lòng với mọi sản phẩm mua từ Shop AI. Nếu vì bất kỳ lý do gì bạn không hài lòng với sản phẩm, bạn có thể trả lại sản phẩm trong vòng 30 ngày kể từ ngày nhận hàng với các điều kiện sau:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Sản phẩm phải còn nguyên trạng, chưa qua sử dụng và còn nguyên tem mác</li>
              <li className="mb-2">Phải có hóa đơn hoặc bằng chứng mua hàng</li>
              <li>Sản phẩm phải được trả lại trong bao bì gốc</li>
            </ul>
            <p>
              Đối với sản phẩm bị lỗi hoặc hư hỏng khi nhận hàng, chúng tôi sẽ đổi sản phẩm mới hoặc hoàn tiền đầy đủ theo yêu cầu của bạn.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">3. Chính sách vận chuyển</h2>
            <p className="mb-4">
              Shop AI cung cấp dịch vụ vận chuyển đến tất cả các tỉnh thành trên toàn quốc. Thời gian giao hàng dự kiến như sau:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Nội thành Hà Nội và TP.HCM: 1-2 ngày làm việc</li>
              <li className="mb-2">Các tỉnh thành khác: 3-5 ngày làm việc</li>
              <li>Vùng sâu vùng xa: 5-7 ngày làm việc</li>
            </ul>
            <p>
              Phí vận chuyển sẽ được tính dựa trên khoảng cách và trọng lượng của đơn hàng. Đơn hàng trên 500.000đ sẽ được miễn phí vận chuyển.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">4. Chính sách thanh toán</h2>
            <p className="mb-4">
              Shop AI chấp nhận các phương thức thanh toán sau:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">Thanh toán khi nhận hàng (COD)</li>
              <li className="mb-2">Chuyển khoản ngân hàng</li>
              <li className="mb-2">Thẻ tín dụng/ghi nợ (Visa, Mastercard, JCB)</li>
              <li>Ví điện tử (Momo, ZaloPay, VNPay)</li>
            </ul>
            <p>
              Tất cả các giao dịch trực tuyến đều được bảo mật bằng công nghệ mã hóa SSL để đảm bảo thông tin thanh toán của bạn luôn được an toàn.
            </p>
          </section>
        </div>
        
        <div className="mt-12 p-6 bg-blue-50 rounded-lg text-center">
          <p className="mb-4">
            Nếu bạn có bất kỳ câu hỏi nào về các chính sách của chúng tôi, vui lòng liên hệ với chúng tôi qua:
          </p>
          <p><strong>Email:</strong> policy@shopai.com</p>
          <p><strong>Điện thoại:</strong> 0123 456 789</p>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage; 
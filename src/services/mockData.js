// Mock data cho ứng dụng
export const products = [
  {
    id: 1,
    name: 'Áo thun nam basic',
    price: 199000,
    description: 'Áo thun nam chất liệu cotton 100%, thoáng mát, thiết kế đơn giản, dễ phối đồ.',
    category: 'ao',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    rating: 4.5,
    numReviews: 10,
    countInStock: 20,
  },
  {
    id: 2,
    name: 'Quần jean nam slim fit',
    price: 450000,
    description: 'Quần jean nam dáng slim fit, màu xanh đậm, chất liệu denim co giãn thoải mái.',
    category: 'quan',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    rating: 4.2,
    numReviews: 8,
    countInStock: 15,
  },
  {
    id: 3,
    name: 'Giày thể thao nữ',
    price: 850000,
    description: 'Giày thể thao nữ thiết kế hiện đại, êm ái, phù hợp cho các hoạt động thể thao và đi chơi.',
    category: 'giay',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    rating: 4.7,
    numReviews: 12,
    countInStock: 10,
  },
  {
    id: 4,
    name: 'Áo khoác denim nữ',
    price: 650000,
    description: 'Áo khoác denim nữ phong cách retro, chất liệu denim dày dặn, form rộng thời trang.',
    category: 'ao',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    rating: 4.3,
    numReviews: 7,
    countInStock: 12,
  },
  {
    id: 5,
    name: 'Túi xách nữ công sở',
    price: 750000,
    description: 'Túi xách nữ thiết kế thanh lịch, chất liệu da PU cao cấp, phù hợp đi làm và đi chơi.',
    category: 'tui',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    rating: 4.6,
    numReviews: 9,
    countInStock: 8,
  },
  {
    id: 6,
    name: 'Đồng hồ nam dây da',
    price: 1250000,
    description: 'Đồng hồ nam dây da thật, mặt kính sapphire chống xước, thiết kế sang trọng, lịch lãm.',
    category: 'phukien',
    image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    rating: 4.8,
    numReviews: 15,
    countInStock: 5,
  },
  {
    id: 7,
    name: 'Áo sơ mi nam dài tay',
    price: 350000,
    description: 'Áo sơ mi nam dài tay chất liệu cotton pha, ít nhăn, dễ ủi, phù hợp đi làm và các sự kiện trang trọng.',
    category: 'ao',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    rating: 4.4,
    numReviews: 11,
    countInStock: 18,
  },
  {
    id: 8,
    name: 'Váy liền nữ công sở',
    price: 550000,
    description: 'Váy liền nữ thiết kế thanh lịch, chất liệu thoáng mát, phù hợp cho môi trường công sở.',
    category: 'vay',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    rating: 4.5,
    numReviews: 10,
    countInStock: 14,
  }
];

export const categories = [
  { id: 1, name: 'Áo', slug: 'ao', icon: 'shirt' },
  { id: 2, name: 'Quần', slug: 'quan', icon: 'pants' },
  { id: 3, name: 'Giày', slug: 'giay', icon: 'shoe' },
  { id: 4, name: 'Túi xách', slug: 'tui', icon: 'bag' },
  { id: 5, name: 'Phụ kiện', slug: 'phukien', icon: 'watch' },
  { id: 6, name: 'Váy', slug: 'vay', icon: 'dress' }
];

export const users = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    password: '123456', // Trong thực tế, mật khẩu nên được mã hóa
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    password: '123456',
  }
];

// Hàm giả lập API
export const mockAPI = {
  getProducts: (params = {}) => {
    let filteredProducts = [...products];
    
    // Lọc theo danh mục nếu có
    if (params.category) {
      filteredProducts = filteredProducts.filter(p => p.category === params.category);
    }
    
    // Lọc theo từ khóa tìm kiếm nếu có
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Phân trang
    const limit = params.limit || 10;
    const page = params.page || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    return {
      products: paginatedProducts,
      totalPages: Math.ceil(filteredProducts.length / limit),
      currentPage: page,
      total: filteredProducts.length
    };
  },
  
  getProductById: (id) => {
    const product = products.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Không tìm thấy sản phẩm');
    }
    return product;
  },
  
  getSimilarProducts: (id, limit = 4) => {
    const product = products.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Không tìm thấy sản phẩm');
    }
    
    // Lấy các sản phẩm cùng danh mục, ngoại trừ sản phẩm hiện tại
    return products
      .filter(p => p.category === product.category && p.id !== parseInt(id))
      .slice(0, limit);
  },
  
  searchByImage: () => {
    // Giả lập kết quả tìm kiếm bằng hình ảnh
    return products.slice(0, 4);
  },
  
  login: (credentials) => {
    const user = users.find(
      u => u.email === credentials.email && u.password === credentials.password
    );
    
    if (!user) {
      throw new Error('Email hoặc mật khẩu không đúng');
    }
    
    // Giả lập token JWT
    const token = 'mock-jwt-token';
    
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      token
    };
  },
  
  register: (userData) => {
    // Kiểm tra email đã tồn tại
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email đã được sử dụng');
    }
    
    // Giả lập tạo user mới
    const newUser = {
      id: users.length + 1,
      ...userData
    };
    
    // Trong thực tế sẽ lưu vào database
    users.push(newUser);
    
    // Giả lập token JWT
    const token = 'mock-jwt-token';
    
    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      },
      token
    };
  },
  
  getProfile: () => {
    // Giả định user đã đăng nhập là user đầu tiên
    const user = users[0];
    
    return {
      id: user.id,
      name: user.name,
      email: user.email
    };
  },
  
  createOrder: (orderData) => {
    // Giả lập tạo đơn hàng
    return {
      id: Math.floor(Math.random() * 1000) + 1,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
  }
}; 
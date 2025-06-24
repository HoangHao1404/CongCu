import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Trong môi trường thực tế, bạn sẽ gọi API thực từ backend
        // const response = await axios.get(`/api/products?search=${query}`);
        
        // Dữ liệu mẫu cho demo
        const demoProducts = [
          {
            id: 1,
            name: 'Áo thun basic',
            price: 250000,
            images: ['/images/products/ao-thun-1.jpg'],
            category: 'ao',
            description: 'Áo thun chất liệu cotton 100%, thoáng mát'
          },
          {
            id: 2,
            name: 'Áo polo nam',
            price: 350000,
            images: ['/images/products/ao-polo-1.jpg'],
            category: 'ao',
            description: 'Áo polo nam phong cách thể thao'
          },
          {
            id: 3,
            name: 'Quần jean nam',
            price: 450000,
            images: ['/images/products/quan-jean-1.jpg'],
            category: 'quan',
            description: 'Quần jean nam form regular fit'
          },
          {
            id: 4,
            name: 'Giày thể thao',
            price: 850000,
            images: ['/images/products/giay-1.jpg'],
            category: 'giay',
            description: 'Giày thể thao nam nữ'
          }
        ];
        
        // Lọc sản phẩm theo từ khóa tìm kiếm
        const searchResults = demoProducts.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) || 
          product.description.toLowerCase().includes(query.toLowerCase())
        );
        
        setProducts(searchResults);
        setLoading(false);
      } catch (error) {
        setError('Không thể tải kết quả tìm kiếm. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Kết quả tìm kiếm: "{query}"
      </h1>
      
      {products.length === 0 ? (
        <div className="text-center py-10">
          <img 
            src="/images/no-results.svg" 
            alt="Không tìm thấy kết quả" 
            className="mx-auto w-64 h-64 mb-4"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/200?text=No+Results";
            }}
          />
          <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào phù hợp với từ khóa "{query}".</p>
          <p className="text-gray-500">Vui lòng thử lại với từ khóa khác.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage; 
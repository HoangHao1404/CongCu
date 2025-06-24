import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const CategoryPage = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        // Trong môi trường thực tế, bạn sẽ gọi API thực từ backend
        // const response = await axios.get(`/api/products?category=${name}`);
        
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
        
        // Lọc sản phẩm theo danh mục
        const filteredProducts = demoProducts.filter(
          product => product.category.toLowerCase() === name.toLowerCase()
        );
        
        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        setError('Không thể tải sản phẩm. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [name]);

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
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {name === 'ao' ? 'Áo' : 
         name === 'quan' ? 'Quần' : 
         name === 'giay' ? 'Giày' : name}
      </h1>
      
      {products.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào trong danh mục này.</p>
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

export default CategoryPage; 
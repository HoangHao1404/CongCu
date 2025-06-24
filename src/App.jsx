import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

// Lazy loading các trang
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const UploadImagePage = lazy(() => import('./pages/UploadImagePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const SuccessPage = lazy(() => import('./pages/SuccessPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PolicyPage = lazy(() => import('./pages/PolicyPage'));

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-rice">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<div className="flex justify-center items-center h-screen"><Spinner size="large" /></div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/category/:name" element={<CategoryPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                } />
                <Route path="/upload-search" element={<UploadImagePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/order-success" element={
                  <ProtectedRoute>
                    <SuccessPage />
                  </ProtectedRoute>
                } />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/policy" element={<PolicyPage />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
          </main>
          <footer className="wabi-footer py-8 mt-auto">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-serif wabi-title mb-4 text-rice">Wabi Shop</h3>
                  <p className="text-stone-light">Website bán hàng tích hợp AI gợi ý sản phẩm tương tự theo tinh thần Wabi-sabi.</p>
                </div>
                <div>
                  <h3 className="text-xl font-serif wabi-title mb-4 text-rice">Liên kết</h3>
                  <ul className="space-y-2">
                    <li><a href="/about" className="text-stone-light hover:text-rice transition-colors">Về chúng tôi</a></li>
                    <li><a href="/policy" className="text-stone-light hover:text-rice transition-colors">Chính sách</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-serif wabi-title mb-4 text-rice">Liên hệ</h3>
                  <p className="text-stone-light">Email: contact@wabishop.com</p>
                  <p className="text-stone-light">Điện thoại: 0123 456 789</p>
                </div>
              </div>
              <div className="border-t border-wood mt-8 pt-6 text-center text-stone-light">
                <p>© {new Date().getFullYear()} Wabi Shop. Tất cả quyền được bảo lưu.</p>
              </div>
            </div>
          </footer>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'var(--color-wood-dark)',
                color: 'var(--color-rice)',
                borderRadius: '2px',
              },
            }}
          />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App; 
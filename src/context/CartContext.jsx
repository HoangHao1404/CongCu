import React, { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../redux/slices/cartSlice';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

  // Thêm sản phẩm vào giỏ hàng
  const addItem = (product, quantity = 1, selectedSize, selectedColor) => {
    dispatch(addToCart({ product, quantity, selectedSize, selectedColor }));
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id, selectedSize, selectedColor) => {
    dispatch(removeFromCart({ id, selectedSize, selectedColor }));
  };

  // Cập nhật số lượng sản phẩm
  const updateItemQuantity = (id, quantity, selectedSize, selectedColor) => {
    if (quantity <= 0) {
      removeItem(id, selectedSize, selectedColor);
    } else {
      dispatch(updateQuantity({ id, quantity, selectedSize, selectedColor }));
    }
  };

  // Xóa toàn bộ giỏ hàng
  const clearItems = () => {
    dispatch(clearCart());
  };

  // Kiểm tra giỏ hàng có trống không
  const isEmpty = items.length === 0;

  const value = {
    items,
    totalQuantity,
    totalAmount,
    isEmpty,
    addItem,
    removeItem,
    updateItemQuantity,
    clearItems,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext; 
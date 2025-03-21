import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: null,
  cart: [],
  totalAmount: 0,
};

// Slice oluşturma
export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Kategori seçimi
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    // Sepete ürün ekleme
    addToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      
      state.totalAmount = state.cart.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
    },
    // Sepetten ürün çıkarma
    removeFromCart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload);
      
      if (existingItem && existingItem.quantity === 1) {
        state.cart = state.cart.filter(item => item.id !== action.payload);
      } else if (existingItem) {
        existingItem.quantity -= 1;
      }
      
      state.totalAmount = state.cart.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
    },
    // Sepeti temizleme
    clearCart: (state) => {
      state.cart = [];
      state.totalAmount = 0;
    },
  },
});

export const { 
  setSelectedCategory, 
  addToCart, 
  removeFromCart, 
  clearCart 
} = productSlice.actions;

export const selectSelectedCategory = (state) => state.products.selectedCategory;
export const selectCart = (state) => state.products.cart;
export const selectTotalAmount = (state) => state.products.totalAmount;
export const selectCartItemsCount = (state) => 
  state.products.cart.reduce((total, item) => total + item.quantity, 0);

export default productSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import productReducer from './productSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    // Diğer reducer'lar buraya eklenebilir
    products: productReducer,
  },
  // API middleware'ini ekle
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});


// RootState ve AppDispatch tiplerini dışa aktar
export const RootState = store.getState;
export const AppDispatch = store.dispatch;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK Query API tanımı
export const api = createApi({
  // Redux store'da bu API için kullanılacak reducer path
  reducerPath: 'api',
  // Tüm istekler için temel sorgu ayarları
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  // API uç noktalarının tanımlanması
  endpoints: (builder) => ({
    // Tüm ürünleri getiren endpoint
    getProducts: builder.query({
      query: () => '/products',
    }),
    // Tek bir ürünü ID'ye göre getiren endpoint
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
    // Ürün kategorilerini getiren endpoint
    getCategories: builder.query({
      query: () => '/products/categories',
    }),
    // Belirli bir kategorideki ürünleri getiren endpoint
    getProductsByCategory: builder.query({
      query: (category) => `/products/category/${category}`,
    }),
  }),
});

// API hook'larını dışa aktarma
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} = api;

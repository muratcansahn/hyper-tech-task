'use client';

import { useGetProductsQuery, useGetProductsByCategoryQuery } from '../store/api';
import { useSelector } from 'react-redux';
import { selectSelectedCategory } from '../store/productSlice';
import ProductCard from './ProductCard';

export default function ProductList() {
  const selectedCategory = useSelector(selectSelectedCategory);
  
  const { 
    data: products, 
    isLoading: isLoadingProducts, 
    error: productsError 
  } = useGetProductsQuery(undefined, { skip: !!selectedCategory });
  
  const { 
    data: categoryProducts, 
    isLoading: isLoadingCategoryProducts, 
    error: categoryProductsError 
  } = useGetProductsByCategoryQuery(selectedCategory, { skip: !selectedCategory });

  const isLoading = isLoadingProducts || isLoadingCategoryProducts;
  const error = productsError || categoryProductsError;
  const displayProducts = selectedCategory ? categoryProducts : products;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Hata!</strong>
        <span className="block sm:inline"> Ürünler yüklenirken bir sorun oluştu.</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {displayProducts?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

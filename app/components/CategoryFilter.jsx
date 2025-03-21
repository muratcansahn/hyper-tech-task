'use client';

import { useGetCategoriesQuery } from '../store/api';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedCategory, setSelectedCategory } from '../store/productSlice';

export default function CategoryFilter() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(selectSelectedCategory);
  
  const { 
    data: categories, 
    isLoading, 
    error 
  } = useGetCategoriesQuery();

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category === selectedCategory ? null : category));
  };

  if (isLoading) {
    return (
      <div className="flex space-x-2 overflow-x-auto py-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-sm">Kategoriler yüklenemedi.</div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => dispatch(setSelectedCategory(null))}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedCategory === null
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
        }`}
      >
        Tümü
      </button>
      
      {categories?.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

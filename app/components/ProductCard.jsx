'use client';

import Image from 'next/image';
import {useDispatch} from "react-redux";
import { addToCart } from '../store/productSlice';
import { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.title.substring(0, 20)}... sepete eklendi!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // API'den gelen indirim bilgisini kullan
  // Eğer ürün fiyatı 50'den büyükse indirim uygula
  const hasDiscount = product.price > 50;
  const discountPercentage = hasDiscount ? 15 : 0; // Sabit %15 indirim
  const originalPrice = hasDiscount ? (product.price * 100) / (100 - discountPercentage) : product.price;
  
  // API'den gelen stok bilgisini kullan
  const inStock = product.rating.count > 0;
  const stockCount = product.rating.count;
  
  // API'den gelen yıldız puanını kullan
  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    return stars;
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)', 
        boxShadow: isHovered ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : ''
      }}
    >
      {/* Badge for discount */}
      {hasDiscount && (
        <div className="absolute top-0 left-0 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
          %{discountPercentage} İNDİRİM
        </div>
      )}
      
      <div className="relative h-52  flex items-center justify-center p-4">
        <Image
          src={product.image}
          alt={product.title}
          width={150}
          height={150}
          style={{ objectFit: 'contain' }}
          className={`max-h-full transition-transform duration-300 ${isHovered ? 'scale-95' : 'scale-100'}`}
        />
        
        {/* Quick action button that appears on hover */}
        {isHovered && (
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`absolute bottom-2 right-2 bg-white text-blue-600 p-2 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors ${
              !inStock ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title="Sepete Ekle"
          >
            <FaShoppingCart size={18} />
          </button>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-1">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold line-clamp-1 mb-1
        text-gray-400
        hover:text-gray-800 transition-colors">
          {product.title}
        </h3>
        
        {/* Rating stars */}
        <div className="flex items-center mb-2">
          <div className="flex mr-1">
            {renderRatingStars(product.rating.rate)}
          </div>
          <span className="text-xs text-gray-500">
            ({product.rating.count})
          </span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3 flex-grow">{product.description}</p>
        
        {/* Stock information */}
        <div className="mb-2">
          {inStock ? (
            <div className="flex items-center text-sm text-green-600">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              <span>Stokta ({stockCount} adet)</span>
            </div>
          ) : (
            <div className="text-sm text-red-500">Stokta Yok</div>
          )}
        </div>
        
        {/* Free shipping badge */}
        {product.price > 100 && (
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <MdLocalShipping className="mr-1" />
            <span>Ücretsiz Kargo</span>
          </div>
        )}
        
        <div className="mt-auto pt-2 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-lg font-bold text-blue-700">{product.price.toFixed(2)} ₺</span>
              {hasDiscount && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  {originalPrice.toFixed(2)} ₺
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`${
                inStock 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } py-1.5 px-4 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center`}
            >
              <FaShoppingCart className="mr-1" size={14} />
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

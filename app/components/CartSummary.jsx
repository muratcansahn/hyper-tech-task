'use client';

import { useDispatch, useSelector } from 'react-redux';
import { selectCart, selectTotalAmount, selectCartItemsCount, removeFromCart, clearCart } from '../store/productSlice';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function CartSummary() {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector(selectCart);
  const totalAmount = useSelector(selectTotalAmount);
  const itemCount = useSelector(selectCartItemsCount);
  const dispatch = useDispatch();

  const handleRemoveItem = (productId, productTitle) => {
    dispatch(removeFromCart(productId));
    toast.error(`${productTitle.substring(0, 20)}... sepetten çıkarıldı!`, {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info('Sepetiniz temizlendi!', {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const handleCompleteOrder = () => {
    dispatch(clearCart());
    setIsOpen(false);
    toast.success('Siparişiniz başarıyla tamamlandı!', {
      position: "top-center",
      autoClose: 3000,
    });
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 z-[1000]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-sm flex justify-end z-[1001] touch-auto transition-all duration-300"
          onClick={(e) => {
            // Sadece arka plan tıklamalarında kapat
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className="bg-white w-full max-w-md h-full overflow-auto p-6 flex flex-col shadow-xl animate-slide-in">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-xl font-bold text-gray-800">Sepetim ({itemCount} ürün)</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-all duration-200"
                aria-label="Sepeti kapat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-gray-500">Sepetiniz boş</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto -mx-6 px-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b py-4 hover:bg-gray-50 transition-colors rounded-lg px-2">
                      <div className="relative h-20 w-20 bg-gray-50 rounded-lg flex-shrink-0 border overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          style={{ objectFit: 'contain' }}
                          className="p-2"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">{item.title}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center">
                            <span className="text-blue-600 font-medium mr-2">{item.price} ₺</span>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">x {item.quantity}</span>
                          </div>
                          <button 
                            onClick={() => handleRemoveItem(item.id, item.title)}
                            className="text-red-500 hover:text-red-700 bg-red-50 p-1.5 rounded-full transition-colors"
                            aria-label="Ürünü sepetten çıkar"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mt-4 sticky bottom-0 bg-white">
                  <div className="flex justify-between mb-4 bg-gray-50 p-3 rounded-lg">
                    <span className="font-medium text-gray-700">Toplam Tutar:</span>
                    <span className="font-bold text-blue-600">{totalAmount.toFixed(2)} ₺</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleClearCart}
                      className="flex-1 py-2.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 hover:shadow-sm transition-all duration-200 font-medium flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Sepeti Temizle
                    </button>
                    <button
                      onClick={handleCompleteOrder}
                      className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:shadow-md transition-all duration-200 font-medium shadow-sm flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Siparişi Tamamla
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useData } from '@/context/DataContext';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const router = useRouter();
  const { artworksData, isLoading, error } = useData();

  useEffect(() => {
    if (!artworksData.artworks) return;

    try {
      const cartData = JSON.parse(localStorage.getItem('artGalleryCart') || '[]');
      const cartArtworks = cartData.map(cartItem => 
        artworksData.artworks.find(artwork => artwork.id === cartItem.id)
      ).filter(Boolean);

      setCartItems(cartArtworks);
      const total = cartArtworks.reduce((sum, item) => sum + parseFloat(item.price), 0);
      setTotalSum(total);
    } catch (err) {
      console.error('Error loading cart:', err);
      localStorage.removeItem('artGalleryCart');
      setCartItems([]);
      setTotalSum(0);
    }
  }, [artworksData]);

  const handleRemoveItem = (itemId) => {
    try {
      setCartItems(cartItems.filter(item => item.id !== itemId));
      const cartData = JSON.parse(localStorage.getItem('artGalleryCart') || '[]');
      const updatedCart = cartData.filter(item => item.id !== itemId);
      localStorage.setItem('artGalleryCart', JSON.stringify(updatedCart));

      const newTotal = cartItems
        .filter(item => item.id !== itemId)
        .reduce((sum, item) => sum + parseFloat(item.price), 0);
      setTotalSum(newTotal);

      window.dispatchEvent(new Event('cartUpdate'));
    } catch (err) {
      console.error('Error removing item from cart:', err);
    }
  };

  const handleCheckout = () => {
    router.push(`/Payment?total=${totalSum.toFixed(2)}`);
  };

  return {
    cartItems,
    totalSum,
    isLoading,
    error,
    handleRemoveItem,
    handleCheckout
  };
}; 
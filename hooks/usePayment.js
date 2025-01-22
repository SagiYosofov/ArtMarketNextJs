'use client';

import { useData } from '@/context/DataContext';

export function usePayment() {
  const { setDbUpdate } = useData();

  const deletePurchasedArtworks = async () => {
    try {
      const cartData = JSON.parse(localStorage.getItem('artGalleryCart') || '[]');
      const artworkIds = cartData.map(item => item.id);

      if (artworkIds.length > 0) {
        const response = await fetch('/api/artworks/deletePurchased', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ artworkIds }),
        });

        if (!response.ok) {
          throw new Error('Failed to delete purchased artworks');
        }

        setDbUpdate(true);
      }
    } catch (error) {
      console.error('Error deleting purchased artworks:', error);
      throw error;
    }
  };

  const handleSuccessfulPurchase = async () => {
    await deletePurchasedArtworks();
    localStorage.removeItem('artGalleryCart');
    window.dispatchEvent(new Event('cartUpdate'));
  };

  return {
    handleSuccessfulPurchase,
  };
} 
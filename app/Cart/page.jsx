"use client";
import React, { useState, useEffect } from "react";
import ItemComponent from "../Artworks/ItemComponent";
import data from "../Artworks/dbArtworks.json";
import { useRouter } from "next/navigation";

const CartPage = () => { 
  const router = useRouter();
  const [artworkData, setArtworkData] = useState([]);

  useEffect(() => {
    // Get cart IDs from localStorage

    const cartData = JSON.parse(localStorage.getItem('artGalleryCart') || '[]');

    const artworkData = [];
    for (let i = 0; i < cartData.length; i++) {
      const artId = cartData[i].id;
      for (let j = 0; j < data.artworks.length; j++) {
        if (data.artworks[j].id === artId) {
          artworkData.push(data.artworks[j]);
          break;
        }
      }
    }
    setArtworkData(artworkData);
  }, []);

  const handleRemoveItem = (itemId) => {
    // Remove from state
    // Remove from localStorage
    const cartIds = JSON.parse(localStorage.getItem('artGalleryCart') || '[]');
    // const updatedCart = cartIds.filter(id => id !== itemId);
    for (let i = 0; i < cartIds.length; i++) {
      if (cartIds[i].id === itemId) {
        cartIds.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('artGalleryCart', JSON.stringify(cartIds));
  };


  const handleArtworkClick = (artworkId) => {
    router.push(`/Artworks/${artworkId}`);
  };

  const deleteItem = (itemId) => {
    handleRemoveItem(itemId);
    setArtworkData(artworkData.filter(item => item.id !== itemId));
  };

  return (
    <div className="mt-20 container mx-auto px-4 relative z-0">
      <h2 className="text-3xl font-bold mb-8">🛒 Your Cart</h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
        Tap an item to remove from cart
      </p>

      {artworkData.length > 0 ? (
        <ItemComponent 
          artworksData={artworkData}
          handleArtworkClick={deleteItem}
        />
      ) : (
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Your cart is empty.
        </p>
      )}
    </div>
  );
};

export default CartPage;
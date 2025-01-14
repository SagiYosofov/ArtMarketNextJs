"use client";
import React, { useState, useEffect } from "react";
import ItemComponent from "../Artworks/ItemComponent";
import data from "../Artworks/dbArtworks.json";

const CartPage = () => { 
  const [artworkData, setArtworkData] = useState([]);

  useEffect(() => {
    // Get saved art from localStorage
    const cartData = JSON.parse(localStorage.getItem('artGalleryCart') || '[]');

    // javascript AI hacks dont work, use for i loop.
    // create an array of dictionary, to forward it to ItemComponent.
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
    // set state, to proc the useEffect.
    setArtworkData(artworkData);
  }, []);

  const handleRemoveItem = (itemId) => {
    // remove locally first to give visual feedback.
    setArtworkData(artworkData.filter(item => item.id !== itemId));

    // Remove from localStorage
    // get the current local storage cart array
    const cartIds = JSON.parse(localStorage.getItem('artGalleryCart') || '[]');
    // find the item to remove
    for (let i = 0; i < cartIds.length; i++) {
      if (cartIds[i].id === itemId) {
        cartIds.splice(i, 1);
        break;
      }
    }
    // update local storage with the new array
    localStorage.setItem('artGalleryCart', JSON.stringify(cartIds));
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
          handleArtworkClick={handleRemoveItem}
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
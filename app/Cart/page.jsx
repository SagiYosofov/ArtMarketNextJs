"use client";
import React, { useState, useEffect } from "react";
import ItemComponent from "../Artworks/ItemComponent";
import data from "../Artworks/dbArtworks.json";
import { useRouter } from 'next/navigation';

const CartPage = () => { 
  const [artworkData, setArtworkData] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const router = useRouter();

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

    // Calculate total sum
    const total = artworkData.reduce((sum, item) => sum + parseFloat(item.price), 0);
    setTotalSum(total);
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

  const handleCheckout = () => {
    router.push('/Payment');
  };

  return (
    <div className="mt-20 container mx-auto px-4 relative z-0">
      <h2 className="text-3xl font-bold mb-8">🛒 Your Cart</h2>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
        Tap an item to remove from cart
      </p>

      {artworkData.length > 0 ? (
        <>
          <ItemComponent 
            artworksData={artworkData}
            handleArtworkClick={handleRemoveItem}
          />
          <div className="flex flex-col items-center mt-8 mb-12">
            <p className="text-xl font-semibold mb-4">
              Total to pay: ${totalSum.toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 text-center">
          Your cart is empty.
        </p>
      )}
    </div>
  );
};

export default CartPage;
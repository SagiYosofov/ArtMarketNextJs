'use client';

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useSearchParams } from 'next/navigation';
import { useData } from '@/context/DataContext';

const initialOptions = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
};

function App() {
  const searchParams = useSearchParams();
  const total = searchParams.get('total') || '0.00';
  const { setDbUpdate } = useData();

  const deletePurchasedArtworks = async () => {
    try {
      // Get the cart data before clearing it
      const cartData = JSON.parse(localStorage.getItem('artGalleryCart') || '[]');
      const artworkIds = cartData.map(item => item.id);

      if (artworkIds.length > 0) {
        // Delete the purchased artworks from the database
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

        // Trigger data refresh after successful deletion
        setDbUpdate(true);
      }
    } catch (error) {
      console.error('Error deleting purchased artworks:', error);
      throw error; // Re-throw to handle in the calling function
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '100vh',
      paddingTop: '120px',
      position: 'relative',
      zIndex: 0
    }}>
      <PayPalScriptProvider options={initialOptions}>
        <div style={{ 
          maxWidth: "750px", 
          minHeight: "200px",
          width: "100%",
          padding: "20px"
        }}>
          <PayPalButtons
            style={{
              zIndex: 1
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: total,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(async (details) => {
                try {
                  // Delete purchased artworks from database
                  await deletePurchasedArtworks();
                  
                  // Clear cart data from localStorage
                  localStorage.removeItem('artGalleryCart');
                  
                  // Notify other components about cart update
                  window.dispatchEvent(new Event('cartUpdate'));
                  
                  alert("Transaction completed by " + details.payer.name.given_name);
                } catch (error) {
                  console.error('Error processing purchase:', error);
                  alert("Transaction completed, but there was an error updating the inventory.");
                }
              });
            }}
          />
        </div>
      </PayPalScriptProvider>
    </div>
  );
}

export default App;






'use client';

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { usePayment } from '@/components/hooks/usePayment';

const initialOptions = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
};

// Component that uses useSearchParams
function PaymentContent() {
  const searchParams = useSearchParams();
  const { handleSuccessfulPurchase } = usePayment();
  const total = searchParams.get('total') || '0.00';

  const handleDemoPayment = async () => {
    try {
      await handleSuccessfulPurchase();
      alert("Demo purchase successful! Total amount: $" + total);
    } catch (error) {
      console.error('Error processing demo purchase:', error);
      alert("Demo purchase failed. Please try again.");
    }
  };

  return (
    <div style={{ 
      maxWidth: "750px", 
      minHeight: "200px",
      width: "100%",
      padding: "20px",
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      {/* Demo Purchase Button */}
      <button
        onClick={handleDemoPayment}
        style={{
          padding: '15px 25px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
      >
        Demo Purchase (Test Only)
      </button>

      <PayPalScriptProvider options={initialOptions}>
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
                await handleSuccessfulPurchase();
                alert("Transaction completed by " + details.payer.name.given_name);
              } catch (error) {
                console.error('Error processing purchase:', error);
                alert("Transaction completed, but there was an error updating the inventory.");
              }
            });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

// Loading component
function LoadingPayment() {
  return <div>Loading payment details...</div>;
}

// Main component
export default function Payment() {
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
      <Suspense fallback={<LoadingPayment />}>
        <PaymentContent />
      </Suspense>
    </div>
  );
}






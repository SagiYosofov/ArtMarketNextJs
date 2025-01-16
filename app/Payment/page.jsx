'use client';

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
};

function App() {
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
                      value: "100.00",
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                alert("Transaction completed by " + details.payer.name.given_name);
              });
            }}
          />
        </div>
      </PayPalScriptProvider>
    </div>
  );
}

export default App;






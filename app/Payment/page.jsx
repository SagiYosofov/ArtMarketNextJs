"use client"

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { usePayment } from "@/hooks/usePayment"

// PaymentContent component handles the payment logic and UI
function PaymentContent() {
    // Get total amount from URL parameters
    const searchParams = useSearchParams()
    const total = searchParams.get("total") || "0.00"
    const { handleSuccessfulPurchase, handleDemoPayment, initialOptions } = usePayment({ total })

    return (
        <div
            style={{
                maxWidth: "750px",
                minHeight: "200px",
                width: "100%",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            {/* Demo Purchase Button for testing */}
            <button
                onClick={handleDemoPayment}
                style={{
                    padding: "15px 25px",
                    fontSize: "16px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
            >
                Demo Purchase (Test Only)
            </button>

            {/* PayPal payment integration */}
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    style={{
                        zIndex: 1,
                    }}
                    // Create PayPal order with the total amount
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: total,
                                    },
                                },
                            ],
                        })
                    }}
                    // Handle successful payment approval
                    onApprove={(data, actions) => {
                        return actions.order.capture().then(async (details) => {
                            try {
                                await handleSuccessfulPurchase()
                                alert("Transaction completed by " + details.payer.name.given_name)
                            } catch (error) {
                                console.error("Error processing purchase:", error)
                                alert("Transaction completed, but there was an error updating the inventory.")
                            }
                        })
                    }}
                />
            </PayPalScriptProvider>
        </div>
    )
}

// Loading component displayed while payment content is loading
function LoadingPayment() {
    return <div>Loading payment details...</div>
}

// Main Payment page component with layout wrapper
export default function Payment() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                paddingTop: "120px",
                position: "relative",
                zIndex: 0,
            }}
        >
            {/* Wrap PaymentContent with Suspense for loading state */}
            <Suspense fallback={<LoadingPayment />}>
                <PaymentContent />
            </Suspense>
        </div>
    )
}

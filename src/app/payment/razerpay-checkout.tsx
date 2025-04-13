"use client"

import { useEffect } from "react"
import { verifyRazorpayPayment } from "./action"

interface RazorpayCheckoutProps {
  paymentData: {
    orderId: string
    amount: number
    currency: string
    name: string
    description: string
    keyId: string
  }
  onSuccess: () => void
  onCancel: () => void
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function RazorpayCheckout({ paymentData, onSuccess, onCancel }: RazorpayCheckoutProps) {
  useEffect(() => {
    // Load the Razorpay script
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = initializeRazorpay

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const initializeRazorpay = () => {
    const options = {
      key: paymentData.keyId,
      amount: paymentData.amount,
      currency: paymentData.currency,
      name: "NEURAGALLERY",
      description: paymentData.description,
      order_id: paymentData.orderId,
      handler: async (response: any) => {
        try {
          // Verify the payment on the server
          await verifyRazorpayPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          })

          onSuccess()
        } catch (error) {
          console.error("Payment verification failed:", error)
          // Show error message to user
        }
      },
      prefill: {
        name: "", // You can prefill user details if available
        email: "",
        contact: "",
      },
      notes: {
        plan: paymentData.name,
      },
      theme: {
        color: "#6366F1", // Match your primary color
      },
      modal: {
        ondismiss: onCancel,
      },
    }

    const razorpay = new window.Razorpay(options)
    razorpay.open()
  }

  return null // This component doesn't render anything
}


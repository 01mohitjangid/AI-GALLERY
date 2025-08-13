"use client"

import { useEffect, useCallback } from "react"
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
  const initializeRazorpay = useCallback(() => {
    const options = {
      key: paymentData.keyId,
      amount: paymentData.amount,
      currency: paymentData.currency,
      name: "NEURAGALLERY",
      description: paymentData.description,
      order_id: paymentData.orderId,
      handler: async (response: any) => {
        try {
          await verifyRazorpayPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          })

          onSuccess()
        } catch (error) {
          console.error("Payment verification failed:", error)
        }
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: {
        plan: paymentData.name,
      },
      theme: {
        color: "#6366F1",
      },
      modal: {
        ondismiss: onCancel,
      },
    }

    const razorpay = new window.Razorpay(options)
    razorpay.open()
  }, [paymentData, onSuccess, onCancel]) // Add dependencies here

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = initializeRazorpay

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [initializeRazorpay]) // Add initializeRazorpay to dependencies

  return null
}


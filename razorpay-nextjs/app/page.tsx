"use client";

import React, { useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentPage = () => {
  const AMOUNT = 100; // constamt amount in INR
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);
    try {
      // Create an order
      const response = await fetch("/api/create-order", { method: "POST" });
      const data = await response.json();

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: AMOUNT * 100, // amount in paise
        currency: "INR",
        name: "Next.js Store",
        description: "Payment for order",
        order_id: data.orderId,
        handler: function (response: any) {
          console.log("Payment successful", response);
          // handle successfull payment (e.g. update UI, send to server)
        },
        prefill: {
          name: "Next.js Store",
          email: "test@gmail.com",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error while creating order", error);
      alert("Error while creating order");
    } finally {
      setProcessing(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
        <p className="mb-4">
          Amount to pay: <strong>₹{AMOUNT}</strong>
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handlePayment}
          disabled={processing}
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

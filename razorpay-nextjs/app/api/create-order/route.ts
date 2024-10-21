import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error(
        "RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be provided"
      );
    }
    const order = await razorpay.orders.create({
      amount: 100 * 100, // amount in paise
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    });
    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.log("Error while creating order", error);
    return NextResponse.json(
      { error: "Error while creating order" },
      { status: 500 }
    );
  }
}

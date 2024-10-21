import Payment from "../models/paymentModel.js";
import { razorpay } from "../server.js";
import crypto from "crypto";

export const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await razorpay.orders.create(options);

    res.status(200).json({
      order,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Database operation
      //   await Payment.create({
      //     razorpay_order_id,
      //     razorpay_payment_id,
      //     razorpay_signature,
      //   });

      return res.redirect(
        `http://localhost:3000/payment-success?reference=${razorpay_payment_id}`
      );
    } else {
      return res.redirect(
        `http://localhost:3000/payment-failed?reference=${razorpay_payment_id}`
      );
    }
  } catch (error) {
    res.status(500).json({
      message: "Error verifying payment",
      error: error.message,
    });
  }
};

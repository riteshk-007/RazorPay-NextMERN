"use client";
import { Box, Stack } from "@chakra-ui/react";
import Card from "./_components/Card";
import axios from "axios";
import Script from "next/script";

export default function Home() {
  const checkouthandler = async (amount) => {
    try {
      const {
        data: { key },
      } = await axios.get("http://localhost:4000/api/getkey");
      const {
        data: { order },
      } = await axios.post("http://localhost:4000/api/checkout", { amount });

      const options = {
        key: key,
        amount: order.amount,
        name: "Ritesh",
        description: "some description",
        image: "https://avatars.githubusercontent.com/u/135107962?v=4",
        order_id: order.id,
        callback_url: "http://localhost:4000/api/payment-verification",
        prefill: {
          name: "Badmos",
          email: "test@gmail.com",
          contact: "9999999999",
        },
        notes: {
          address: "some address",
        },
        theme: {
          color: "#121212",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <Box>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => console.log("Razorpay SDK Loaded")}
      />
      <Stack direction={["column", "row"]}>
        <Card
          amount={300000}
          img={"/laptop.jpg"}
          checkouthandler={checkouthandler}
        />
        <Card
          amount={80000}
          img={"/iphone.jpg"}
          checkouthandler={checkouthandler}
        />
        <Card
          amount={50000}
          img={"/ps5.jpg"}
          checkouthandler={checkouthandler}
        />
      </Stack>
    </Box>
  );
}

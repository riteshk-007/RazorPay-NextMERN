"use client";
import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import "tailwindcss/tailwind.css";
import { useSearchParams } from "next/navigation";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <Heading as="h1" size="2xl" className="text-green-700 mb-4">
        Payment Successful!
      </Heading>
      <Text fontSize="xl" className="text-green-600 mb-8">
        Thank you for your purchase. Your payment has been processed
        successfully.
      </Text>
      <Text fontSize="xl" className="text-green-600 mb-8">
        Payment Reference: {reference}
      </Text>
      <Button colorScheme="green" size="lg">
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default PaymentSuccessPage;

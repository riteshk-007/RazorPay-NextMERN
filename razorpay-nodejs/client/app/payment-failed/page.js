"use client";
import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import "tailwindcss/tailwind.css";
import { useSearchParams } from "next/navigation";

const PaymentFailedPage = () => {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <Heading as="h1" size="2xl" className="text-red-700 mb-4">
        Payment Failed!
      </Heading>
      <Text fontSize="xl" className="text-red-600 mb-8">
        Unfortunately, your payment could not be processed.
      </Text>
      <Text fontSize="xl" className="text-red-600 mb-8">
        Payment Reference: {reference}
      </Text>
      <Button colorScheme="red" size="lg">
        Try Again
      </Button>
    </Box>
  );
};

export default PaymentFailedPage;

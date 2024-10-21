import { Button, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const Card = ({ amount, img, checkouthandler }) => {
  return (
    <VStack>
      <Image src={img} htmlWidth={300} />
      <Text>₹{amount}</Text>
      <Button onClick={() => checkouthandler(amount)}>Pay</Button>
    </VStack>
  );
};

export default Card;

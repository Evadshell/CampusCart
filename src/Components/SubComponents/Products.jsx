/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack,Text } from '@chakra-ui/react';
import React from 'react'

const Products = (props) => {
    const { Product_image,Name,Quantity,Category,Price,Id,CartAddition } = props;

  return (
    <div>
        <Card key={Id} maxW="sm">
                <CardBody>
                  <Image
                    src={Product_image}
                    alt={Name}
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{Name}</Heading>
                    <Text fontSize="sm" as="i" color="gray.500">
                      Size : {Quantity}
                    </Text>
                    <Text fontSize="sm" as="i" color="gray.500">
                      {Category}
                    </Text>
                    <Text color="blue.600" fontSize="2xl">
                      ₹ {Price}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button
                      onClick={() => CartAddition(Id)}
                      variant="solid"
                      colorScheme="blue"
                    >
                      Add to cart
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
    </div>
  )
}

export default Products
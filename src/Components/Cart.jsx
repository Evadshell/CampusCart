/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Card,
  CardBody,
  CardFooter,
  Input,

  Button,

  Image,
  Text,
  Heading,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Grid,
  HStack,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
const Cart = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const navigate = useNavigate();
  const { Items,Id } = props;
let stores;
  const CartUpdate = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cart`, {
        withCredentials: true,
        
      });
      stores=response.data.user;
    } catch (error) {
      navigate("/login");
    }
  };
  useEffect(() => {
    CartUpdate();
  }, []);
  console.log(Items);
  const [itemQuantities, setItemQuantities] = useState({}); 
  const handleIncrement = (itemId, increment) => {
    const currentQuantity = itemQuantities[itemId] || 1;
    const newQuantity = currentQuantity + increment;
    const minQuantity = 1;
    const maxQuantity = 10;
    const updatedQuantity = Math.min(
      Math.max(newQuantity, minQuantity),
      maxQuantity
    );
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: updatedQuantity,
    }));
    console.log(typeof parseInt(Items[0].product_price));
  };

  const totalOrderPrice = Items.reduce((total, item) => {
    const quantity = itemQuantities[item.id] || 1;
    const totalPrice = quantity * parseFloat(item.product_price);
    return total + totalPrice;
  }, 0);
  const handleOrder = async () => {
    let totalPrice = 0;
    Items.forEach(item => {
        console.log("Item ID:", item.id);
        console.log("Quantity:", itemQuantities[item.id] || 1);
        totalPrice += parseFloat(item.product_price) * (itemQuantities[item.id] || 1);
    });

    const orderItems = Items.map(item => ({
        ...item,
        quantity: itemQuantities[item.id] || 1,
        subtotal: (parseFloat(item.product_price) * (itemQuantities[item.id] || 1)).toFixed(2)
    }));

    console.log(orderItems);
    console.log("Total Price:", totalPrice);
    const orderString = orderItems.map(item => {
        return `${item.quantity} * ${item.product_name} (${item.product_price}, ${item.product_quantity})`;
    }).join(', ');
    console.log(orderString);
    
    console.log(orderString);
    try {
        
        const orderItemsString = encodeURIComponent(JSON.stringify(orderItems));
        const response = await axios.get(`http://localhost:5000/getorder?orderItems=${orderItemsString}&totalPrice=${totalPrice}&store_id=${Id}`, {
          withCredentials: true,
          
        });
      } catch (error) {
        navigate("/");
      }
};
  return (
    <div>
      <IconButton
        colorScheme="blue"
        size="lg"
        ref={btnRef}
        onClick={onOpen}
        variant="ghost"
        icon={<AiOutlineShoppingCart />}
        color="white"
        fontSize="5xl"
        mr={4}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="lg"
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Cart</DrawerHeader>
          <DrawerBody>
            <Grid templateColumns="1fr" gap={4}>
              {Items.map((item, index) => (
                <div key={index}>
                  <Card
                    direction={{ base: "column", sm: "row" }}
                    overflow="hidden"
                    variant="outline"
                  >
                    <Image
                      objectFit="cover"
                      maxW={{ base: "100%", sm: "200px" }}
                      src={item.product_image}
                    />

                    <Stack>
                      <CardBody>
                        <Heading size="md">{item.product_name}</Heading>

                        <Text py="2">Quantity : {item.product_quantity}</Text>

                        <Text py="2" color="blue.600" fontSize="2xl">
                          Total Price: ₹
                          {itemQuantities[item.id]
                            ? parseInt(item.product_price) *
                              itemQuantities[item.id]
                            : parseInt(item.product_price)}
                        </Text>
                      </CardBody>

                      <CardFooter>
                        <HStack maxW="320px">
                          <Button onClick={() => handleIncrement(item.id, 1)}>
                            +
                          </Button>
                          <Input
                            name="quantity"
                            value={itemQuantities[item.id] || 1}
                          />
                          <Button onClick={() => handleIncrement(item.id, -1)}>
                            -
                          </Button>
                        </HStack>
                        <Text py="2"></Text>
                      </CardFooter>
                    </Stack>
                  </Card>
                </div>
              ))}
            </Grid>
          </DrawerBody>
          <DrawerFooter>
            <Text py="2" mr={100} color="blue.600" fontSize="2xl">
              Total Price: ₹{totalOrderPrice}
            </Text>
            <Button onClick={handleOrder} colorScheme="blue">Order</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Cart;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Input,
  SimpleGrid,
  Center,
  Box,
  Select,
  Heading,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from "./Cart";
import Products from "./SubComponents/Products";
import { useNavigate } from "react-router-dom";
const Store = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [products, setProducts] = useState([]);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/productdetail?id=${id}`,
        { withCredentials: true }
      );
      console.log(response);
      setProducts(response.data.user);
    } catch (error) {
      navigate("/login");
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const [cart, addToCart] = useState([]);

  const CartAddition = (id) => {
    const itemToAdd = products.find((product) => product.id === id);
    const isItemInCart = cart.some((item) => item.id === id);

    if (!isItemInCart) {
      addToCart((prevCart) => [...prevCart, itemToAdd]);
    }
    console.log(cart);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStores = products.filter((store) => {
    if (selectedCategory && store.product_category !== selectedCategory) {
      return false;
    }
    if (
      searchTerm &&
      !store.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });
  filteredStores.sort((a, b) => {
    if (selectedSort === "latest added") {
      return b.id - a.id;
    } else if (selectedSort === "high") {
      return b.product_price - a.product_price;
    } else if (selectedSort === "low") {
      return a.product_price - b.product_price;
    }
    return 0; 
  });


  return (
    <div>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
        top="0"
        bg="blue.500"
        zIndex="sticky"
        p={4}
      >
        <Flex justifyContent="flex-end" alignItems="flex-start" pr={4} pt={4}>
          <Badge
            borderRadius="full"
            colorScheme="red"
            fontSize="sm"
            position="absolute"
            top={6}
            mr={1}
          >
            {cart.length}
          </Badge>
        
          <Cart Items={cart} Id={id} />
        </Flex>

        <Center>
          <Select
            placeholder="Category"
            size="sm"
            variant="outline"
            bg="white"
            color="black"
            maxWidth="150px"
            borderWidth="2px"
            borderColor="gray.300"
            borderRadius="md"
            _hover={{ borderColor: "gray.400" }}
            _focus={{ outline: "none", boxShadow: "outline" }}
            fontFamily="inherit"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {Array.from(
              new Set(products.map((store) => store.product_category))
            ).map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Select>
          <Input
            placeholder="Search stores"
            size="sm"
            variant="outline"
            bg="white"
            color="black"
            maxWidth="150px"
            borderWidth="2px"
            borderColor="gray.300"
            borderRadius="md"
            _hover={{ borderColor: "gray.400" }}
            _focus={{ outline: "none", boxShadow: "outline" }}
            fontFamily="inherit"
            value={searchTerm}
            onChange={handleSearch}
            ml={10}
          />
          <Select
            ml={10}
            placeholder="Sort"
            size="sm"
            variant="outline"
            bg="white"
            color="black"
            maxWidth="150px"
            borderWidth="2px"
            borderColor="gray.300"
            borderRadius="md"
            _hover={{ borderColor: "gray.400" }}
            _focus={{ outline: "none", boxShadow: "outline" }}
            fontFamily="inherit"
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            <option value="latest added">latest added</option>
            <option value="high">Price high to low</option>
            <option value="low">Price low to high</option>
          </Select>
        </Center>
      </Flex>
      <Box p={12} ml={10}>
        <Heading as="h1" size="xl" mb={6} color="white" textAlign="center">
          Products
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {filteredStores.map((store, index) => (
            <>
              <Products 
              Product_image={store.product_image}
              Name={store.product_name}
              Quantity={store.product_quantity}
              Category={store.product_category}
              Price={store.product_price}
              Id={store.id}
              CartAddition={CartAddition}
               />
            </>
          ))}
        </SimpleGrid>
      </Box>
    </div>
  );
};

export default Store;

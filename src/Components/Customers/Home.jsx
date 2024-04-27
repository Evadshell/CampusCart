/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Spacer,
  SimpleGrid,
  Center,
  Button,
  Box,
  Select,
  Image,
  Text,
  Heading,
  VStack,
} from "@chakra-ui/react";
import Stores from "./NavComponents/SubComponents/Stores";
import Header from "./Header";

const Home = () => {
  const navigate = useNavigate();
  const [stores, setStore] = useState([]);

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/storedetail", {
        withCredentials: true,
      });
      console.log(response);
      setStore(response.data.user);
    } catch (error) {
      navigate("/login");
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStores = stores.filter((store) => {
    if (selectedCategory && store.category !== selectedCategory) {
      return false;
    }
    if (
      searchTerm &&
      !store.store_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const visitStore = (id) => {
    navigate(`/store/${id}`);
  };
  return (
    <div>
            <Header />

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
          {Array.from(new Set(stores.map((store) => store.category))).map(
            (category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            )
          )}
        </Select>{" "}
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
          ml={5}
        />
      </Center>

      <Box p={8}>
        <Heading as="h1" size="xl" mb={6} color="white" textAlign="center">
          Stores
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredStores.map((store) => (
            <Stores
              Id={store.id}
              Store_image={store.shop_image}
              Name={store.store_name}
              Category={store.category}
              Contact={store.owner_contact}
              Owner_name={store.owner_name}
              VisitStore={visitStore}
            />
          ))}
        </SimpleGrid>
      </Box>
    </div>
  );
};

export default Home;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MerchantNav from "./MerchantNav";
import { Box, Button, Center, Heading, useDisclosure } from "@chakra-ui/react";
import ProductGrid from "./Components/ProductGrid";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Textarea, FormControl, FormLabel, Image } from "@chakra-ui/react";

const ProductsEdit = () => {
  const navigate = useNavigate();
  const [products,Setproducts] = useState([]);
  const [store, setStore] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        return null;
    }
});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    if (storedUser) {
      setStore(JSON.parse(storedUser));

        setIsLoggedIn(true);
    } else {
        navigate("/login");
    }
}, []);
function logout() {
  localStorage.removeItem("token");

  setIsLoggedIn(false);
}
// console.log(store)
    const getProducts= async () => {
        try {
          if (store && store.owner_shop) { // Check if store and store.owner_shop are not null
            const response = await axios.get(`http://localhost:5000/products?store_name=${store.owner_shop}`);
            // console.log(response);
            console.log(store);
            Setproducts(response.data.products);
          }
        } catch (error) {
        console.log(error);
        }
      };
      useEffect(() => {
        getProducts();
      }, [store]);
      // console.log(products);
      const { isOpen, onOpen, onClose } = useDisclosure();

      const [productName, setProductName] = useState("");
      const [productPrice, setProductPrice] = useState("");
      const [productQuantity, setProductQuantity] = useState("");
      const [productCategory, setProductCategory] = useState("");
      const [productImage, setProductImage] = useState(null);
// var store_name;
//       if(store && store.owner_shop){
//        store_name = store.owner_shop;
//       }
//       console.log(store_name);
const[StoreName,setStoreName]= useState("");
const[StoreId,setStoreId]= useState("");

console.log(store);
useEffect(() => {
  if (store && store.owner_shop) {
    // This code will run whenever store.owner_shop changes
    // It ensures that store_name is updated after store.owner_shop changes
    setStoreName(store.owner_shop);
    setStoreId(store.id);
  }
}, [store]); // Listen for changes in the store object
console.log(StoreName);
      
      // const store_id = 
      // console.log(store.owner_shop);
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log("Selected file:", file);
        setProductImage(file);
      };
      const handleSubmit = async () => {
        console.log("Submitting form...");
        console.log("productName:", productName);
        console.log("productPrice:", productPrice);
        console.log("productQuantity:", productQuantity);
        console.log("productCategory:", productCategory);
        console.log("productImage:", productImage);
        console.log("Submitting form...");
       
  const formData = new FormData();
  formData.append('productName', productName);
  formData.append('productPrice', productPrice);
  formData.append('productQuantity', productQuantity);
  formData.append('productCategory', productCategory);
  formData.append('productImage', productImage); // Append the actual file data

  // Append StoreName and StoreId to formData if needed
  formData.append('StoreName', StoreName);
  formData.append('StoreId', StoreId);
        console.log("FormData:", formData);
      
        try {
          const response = await axios.post('http://localhost:5000/addproduct', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }});
          console.log(response.data); // Assuming the server responds with some data
        } catch (error) {
          console.error('Error adding product:', error);
        }
      };
  return (
    <div>
           {isLoggedIn ? (
         <Box>
         <MerchantNav // Render MerchantNav component here
           Logout={logout}
           Name={store.owner_name}
           OwnerImage={store.owner_image}
         />
         <Button
            position="absolute"
            top="28"
            right="4"
            colorScheme="blue"
            onClick={onOpen}
            
          >
            Add New Product
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Product Name</FormLabel>
            <Input value={productName} onChange={(e) => setProductName(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Product Price</FormLabel>
            <Input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Product Quantity</FormLabel>
            <Input type="number" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Product Category</FormLabel>
            <Input value={productCategory} onChange={(e) => setProductCategory(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Product Image</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
          <Button colorScheme="green" onClick={handleSubmit}>Add Product</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
         <Center>
           <Heading color="white" mt={4} mb="4">Product Catalog</Heading>
         </Center>
        
         <ProductGrid products={products} />
       </Box>
      ): <div></div>}
    </div>
    )}

export default ProductsEdit
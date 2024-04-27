import React from "react";
import {
  Box,
  Button,
  Card,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Image, 
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
const ProductGrid = ({ products }) => {
  const [showModal, setShowModal] = React.useState(false); 
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [updatedProductName, setUpdatedProductName] = React.useState("");
  const [updatedProductPrice, setUpdatedProductPrice] = React.useState("");
  const [updatedStock, setUpdatedStock] = React.useState("");
  const [updatedProductCategory, setUpdatedProductCategory] = React.useState("");
  const [updatedProductQuantity, setUpdatedProductQuantity] = React.useState("");


  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setUpdatedProductName(product.product_name);
    setUpdatedProductPrice(product.product_price);
    setUpdatedStock(product.stock);
    setUpdatedProductCategory(product.product_category);
    setUpdatedProductQuantity(product.product_quantity)
    setShowModal(true);
  };
  const handleSaveChanges = async () => {
    try {
      const response = await axios.get("http://localhost:5000/updateproducts", {
        params: {
          id: selectedProduct.id,
          store_id: selectedProduct.store_id,
          product_name: updatedProductName,
          product_price: updatedProductPrice,
          product_quantity: updatedProductQuantity,
          product_image: selectedProduct.product_image,
          stock: updatedStock,
          product_category: updatedProductCategory,
          store_name: selectedProduct.store_name,
        },
      });
      console.log(response.data);
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  return (
    <>
    <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={4}>
        
      {products.map((product) => (
        <Box key={product.id} p="4" borderWidth="1px" borderRadius="md" boxShadow="md" overflow="hidden" bg="white" flexBasis="calc(16.666% - 16px)" maxWidth="calc(16.666% - 16px)">
        <Image src={product.product_image} alt={product.product_name} h="200px" objectFit="cover" mb="4" />
        <Text fontSize="xl" fontWeight="semibold" mb="2">{product.product_name}</Text>
        <Text fontSize="lg" fontWeight="bold" color="blue.500" mb="2">${product.product_price}</Text>
        <Text fontSize="sm" mb="4">{product.product_category}</Text>
        <Text fontSize="sm" mb="4">{product.product_quantity}</Text>

            <Button mt="4" onClick={() => handleShowModal(product)}>Update</Button>
          </Box>
        
      ))}</Box>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {selectedProduct && (
              <Box>
                <FormControl mb="4">
                  <FormLabel>Product Name</FormLabel>
                  <Input
                    defaultValue={selectedProduct.product_name}
                    onChange={(e) => setUpdatedProductName(e.target.value)}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Price</FormLabel>
                  <Input
                    defaultValue={selectedProduct.product_price}
                    onChange={(e) => setUpdatedProductPrice(e.target.value)}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Stock</FormLabel>
                  <Input
                    defaultValue={selectedProduct.stock}
                    onChange={(e) => setUpdatedStock(e.target.value)}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    defaultValue={selectedProduct.product_quantity}
                    onChange={(e) => setUpdatedProductQuantity(e.target.value)}
                  />
                </FormControl>
                <FormControl mb="4">
                  <FormLabel>Category</FormLabel>
                  <Input
                    defaultValue={selectedProduct.product_category}
                    onChange={(e) => setUpdatedProductCategory(e.target.value)}
                  />
                </FormControl>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>Close</Button>
            <Button colorScheme="green" onClick={handleSaveChanges}>Save Changes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductGrid;

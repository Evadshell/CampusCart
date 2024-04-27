/* eslint-disable no-unused-vars */
import React from 'react'
import {
    Box,
    Flex,
    Spacer,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Select,
    useDisclosure,
    Image,
    Heading,
  } from "@chakra-ui/react";
const MerchantNav = (props) => {
    const {Name , OwnerImage ,Logout} = props;

  return (
    <div>
        <Box bg="gray.800" p={4}>
        <Flex alignItems="center">
        <Box>
                <Image
                  borderRadius="full"
                  boxSize="60px"
                  src={OwnerImage}
                  mr={8}
                />
              </Box>
        <Box ml={2}>
                <Heading color="white" >
                {Name}
              </Heading>
              </Box>
              <Spacer />
              <Box mr={8} >
                 <Button colorScheme='red'
                onClick={Logout}
              >
                Logout
              </Button>
              </Box>
            <Box display={{ base: "none", md: "block" }}>
         
            <Flex alignItems="center">
              <Link href="/merchantlogin" mr={4} color="white">
                Home
              </Link>
              <Link href="/products" mr={4} color="white">
                Products
              </Link>
              <Link href="/contact" mr={4} color="white">
                Contact
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </div>
  )
}

export default MerchantNav
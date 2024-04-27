/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import {
    Box,
    Flex,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Image,
    Button,
    Stack,
    Text,
    useDisclosure,Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react";
  import UpdateModal from "./UpdateModal";
const AccountDrawer = (props) => {
    const {AccountName, AccountImage,AccountContact,AccountAddress,LogOut} = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const btnRef = React.useRef();

  return (
    <div>
        <Flex alignItems="center">
        <Box>
                <Image
                  borderRadius="full"
                  boxSize="40px"
                  src={AccountImage}
                />
              </Box>
        <Box ml={2}>
                <Button ref={btnRef} colorScheme="gray.800" onClick={onOpen}>
                  {AccountName}
                </Button>
              </Box>
              <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Account Details</DrawerHeader>

                  <DrawerBody>
  <Stack spacing={4}>
    <Box>
      <Text fontWeight="bold">Name:</Text>
      <Text>{AccountName}</Text>
    </Box>
    <Box>
      <Text fontWeight="bold">Contact:</Text>
      <Text>{AccountContact}</Text>
    </Box>
    <Box>
      <Text fontWeight="bold">Address:</Text>
      <Text>{AccountAddress}</Text>
    </Box>
  </Stack>
</DrawerBody>

                  <DrawerFooter>
                  <UpdateModal />
                    <Button colorScheme="red" onClick={LogOut}>Logout</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer></Flex>
              
    </div>
  )
}

export default AccountDrawer
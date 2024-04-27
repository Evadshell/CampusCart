/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import {
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
const UpdateModal = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const UpdateAccount = async (e) => {
    e.preventDefault();

    try {
      console.log(name,contact,address);

      const response = await axios.get(` http://localhost:5000/userData?name=${name}&contact=${contact}&address=${address}`, {
        withCredentials: true,
      })
      setName("");
      setContact("");
      setAddress("");

      onClose();
    } catch (error) {
      console.error();
    }
  };

  return (
    <div>
      <Button colorScheme="blue" onClick={onOpen} marginRight={4}>
        Update Details
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton /><form onSubmit={UpdateAccount} >
          <ModalBody>
            
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Contact</FormLabel>
                <Input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter your contact number"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Address</FormLabel>
                <Textarea name="address" value={address}
                  onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" />
              </FormControl>
            
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              {/* after update we will close the modal */}
              Update
            </Button>
          </ModalFooter></form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UpdateModal;

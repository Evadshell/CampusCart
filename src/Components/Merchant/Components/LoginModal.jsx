import React from "react";
import {
  Flex,
  Box,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  FormControl,
  FormLabel,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

const LoginModal = (props) => {
    const {IsOpen,Onclose,Error,HandleSubmit,ValueUsername,OnchangeUsername,ValuePassword,OnchangePassword} = props;


  return (
    <div>
        <Modal isOpen={IsOpen} onClose={Onclose}>
          <ModalOverlay />
          <ModalContent>
          
            <ModalCloseButton />
            <ModalBody>
              <Flex align="center" justify="center" minHeight="100vh">
                <Box width="400px" p="6" boxShadow="lg" rounded="md" bg="white">
                  <Text fontSize="xl" fontWeight="semibold" mb="4">
                    Login
                  </Text>
                  {Error && (
                    <Alert status="error" mb="4">
                      <AlertIcon />
                      <AlertDescription>{Error}</AlertDescription>
                    </Alert>
                  )}
                  <form onSubmit={HandleSubmit}>
                    <FormControl mb="4">
                      <FormLabel>Username</FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter your username"
                        value={ValueUsername}
                        onChange={OnchangeUsername}
                      />
                    </FormControl>
                    <FormControl mb="4">
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={ValuePassword}
                        onChange={OnchangePassword}
                      />
                    </FormControl>
                    <Button type="submit" colorScheme="teal" width="full">
                      Login
                    </Button>
                  </form>
                </Box>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
    </div>
  )
}

export default LoginModal
import React from "react";
import {
  Card,
  Button,
  CardHeader,
  Center,
  CardBody,
} from "@chakra-ui/react";

const Login = () => {
  const loginwithgoogle = () => {
    window.open("http://localhost:5000/auth/google/callback", "_self");
  };
  return (
    <div>
      <Center h="100vh">
        <Card bg="gray.700" borderRadius="xl">
          <CardHeader textAlign="center" color="white" py={4} fontWeight="bold">
            Login
          </CardHeader>
          <CardBody>
            <form>
              <Center mb={4}>
                <Button colorScheme="red" onClick={loginwithgoogle}>
                  Sign in with Google
                </Button>
              </Center>
            </form>
          </CardBody>
        </Card>
      </Center>
    </div>
  );
};

export default Login;

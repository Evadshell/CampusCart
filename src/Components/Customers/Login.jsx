import React from "react";
import {
  Card,
  Button,
  CardHeader,
  Center,
  CardBody,
  Text,
} from "@chakra-ui/react";
import Header from "./Header";

const Login = () => {
  const loginwithgoogle = () => {
    window.open("http://localhost:5000/auth/google/callback", "_self");
  };
  return (
    <div>
            <Header />

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
              <Text
                style={{
                  margin: "15px 0 0",
                  color: "#b3b3b3",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                <a href="/merchantlogin" style={{ color: "#4CAF50", textDecoration: "none" }}>
  Merchant Login
</a>
              </Text>
            </form>
          </CardBody>
        </Card>
      </Center>
    </div>
  );
};

export default Login;

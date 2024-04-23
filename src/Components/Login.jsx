import React from "react";
import "./login.css";
import { Card,Button,Image, CardHeader,Center, CardBody, CardFooter, Text } from "@chakra-ui/react";

const Login = () => {
    const loginwithgoogle =()=>{
        window.open("http://localhost:5000/auth/google/callback","_self")
    }
  return (
    <div>
       <Center h="100vh">
      <Card bg="gray.700" borderRadius="xl">
      <CardHeader textAlign="center"  color="white" py={4} fontWeight="bold">
          Login
        </CardHeader>
        <CardBody>
          <form>
          <Center mb={4}>
              <Button colorScheme="red" onClick={loginwithgoogle} >
                Sign in with Google
              </Button>
            </Center>
            <Text style={{ margin: '15px 0 0', color: '#b3b3b3', fontSize: '16px', textAlign: 'center' }}>
              Not Registered? <a href="#" style={{ color: '#4CAF50', textDecoration: 'none' }}>Create Account</a>
            </Text>
          </form>
        </CardBody>
      </Card>
    </Center>
    </div>
  );
};

export default Login;

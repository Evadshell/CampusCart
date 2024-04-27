import React, { useState, useEffect } from "react";
import { Flex, Heading, Center } from "@chakra-ui/react";
import axios from "axios";
import MerchantNav from "./MerchantNav";
import LoginModal from "./Components/LoginModal";
import Orders from "./Components/Orders";

const MerchantLogin = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [store, setStore] = useState(() => {
    const storedToken = localStorage.getItem("token");
    try {
      return storedToken ? JSON.parse(storedToken) : null;
    } catch (error) {
      console.error("Error parsing token:", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      console.log("Stored Token:", storedToken);
      if (storedToken) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error parsing token:", error);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/merchantlogin?username=${username}`,
        { username, password }
      );
      console.log(response);
      const user = response.data.user;
      localStorage.setItem("token",  JSON.stringify(user));
      console.log(user);
      setStore(user);

      setIsLoggedIn(true);
      setIsOpen(false);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };
  function logout() {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
  }
  // console.log(store.owner_name);
  //  console.log(localStorage.getItem("token"))
  // console.log(order);
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <MerchantNav
            Logout={logout}
            Name={store.owner_name}
            OwnerImage={store.owner_image}
          />
          <Center>
            <Heading color="white" mt={4} mb={8} >Past Orders </Heading>
          </Center>
<Orders Name={store.owner_name} />
          <Flex align="center" justify="center" minHeight="100vh"></Flex>
          
        </div>
      ) : (
        <LoginModal
          IsOpen={isOpen}
          Onclose={() => setIsOpen(false)}
          Error={error}
          HandleSubmit={handleSubmit}
          ValueUsername={username}
          OnchangeUsername={(e) => setUsername(e.target.value)}
          ValuePassword={password}
          OnchangePassword={(e) => setPassword(e.target.value)}
        />
      )}
    </div>
  );
};

export default MerchantLogin;

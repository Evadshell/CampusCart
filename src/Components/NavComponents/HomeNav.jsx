/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "@chakra-ui/react";
import AccountDrawer from "./AccountDrawer";
const HomeNav = () => {
  const [userdata, setUserdata] = useState({});
  const getUser = async () => {
    try {
      //isse sara milega ki kya conatct number ye wo
      const response = await axios.get("http://localhost:5000/login/success", {
        withCredentials: true,
      });
      console.log(response);
      setUserdata(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  const logoutgoogle = () => {
    window.open("http://localhost:5000/logout", "_self");
  };
  return (
    <div>
      <Box bg="gray.800" p={4}>
        <Flex alignItems="center">
          {Object?.keys(userdata)?.length > 0 ? (
            <>
              <AccountDrawer
                AccountName={userdata?.email}
                AccountImage={userdata?.image}
                AccountContact={userdata?.contact}
                AccountAddress={userdata?.address}
                LogOut={logoutgoogle}
              />
              <Spacer />
            </>
          ) : (
            <></>
          )}

          <Spacer />
          <Box display={{ base: "none", md: "block" }}>
            <Flex alignItems="center">
              <Link href="/" mr={4} color="white">
                Home
              </Link>
              <Link href="/about" mr={4} color="white">
                About
              </Link>
              <Link href="/contact" mr={4} color="white">
                Contact
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default HomeNav;

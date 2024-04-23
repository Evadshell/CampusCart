/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import "./header.css";
import axios from 'axios';
import { Box, Flex, Spacer, Link, Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Image,
  Button, } from '@chakra-ui/react';

const Header = () => {
  const [userdata,setUserdata] = useState({});
  const getUser = async()=>{
    try {
      //isse sara milega ki kya conatct number ye wo
      const response = await axios.get("http://localhost:5000/login/success",{withCredentials:true});
      console.log(response);
      setUserdata(response.data.user);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getUser()
  },[]); 
  const logoutgoogle =()=>{
    window.open("http://localhost:5000/logout","_self")
}
  return (
    <div>
       <Box bg="gray.800" p={4}>
      <Flex alignItems="center">
        {
          Object?.keys(userdata)?.length >0 ? (
            <>
            <Box>
          <Image borderRadius='full' boxSize='40px' src={userdata?.image} />
        </Box>
        <Box ml={2}>
          <Link href="/Account" fontSize="xl" color="white">
           {userdata?.email}
          </Link>
        </Box></>
          ): <></>
        }
      
        <Spacer />
        <Button onClick={logoutgoogle} >Logout</Button>
        <Menu>
          <MenuButton as={Button} fontSize="xl" color="black">
            Category
          </MenuButton>
          <MenuList>
            <MenuItem>General Store</MenuItem>
            <MenuItem>Stationary</MenuItem>
            <MenuItem>Electrical Store</MenuItem>
          </MenuList>
        </Menu>
        <Spacer />
        <Box display={{ base: 'none', md: 'block' }}>
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
  )
}

export default Header
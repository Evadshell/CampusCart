import React, { useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Center,
  Grid, GridItem, Box,Text
} from "@chakra-ui/react";
import axios from "axios";
const Orders = (props) => {
    const {Name} = props;

    const [order,SetOrders] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        async function call() {
          try {console.log("Username:", Name);
          const response = await axios.get(`http://localhost:5000/merchantorders?username=${Name}`);
          
            console.log(response);
            const { data } = response;
            if (data && data.order) {
              SetOrders(data.order); 
            }
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
        }
        call();
      }, [Name]);
      console.log(order);
      const OrderCard = ({ order }) => {
        const orderedItems = order.ordered_items.split(", ");
        
        return (
            <Box
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              ml={6}
              backgroundColor="white"
              maxW="300px" // Fixed width for each order card
              maxH="400px" // Fixed height for each order card
              overflowY="auto" // Enable vertical scrolling if content exceeds height
            >
              <Text fontWeight="bold">{order.ordered_by_name}</Text>
              <Text fontSize="sm">{order.ordered_by_contact}</Text>
              <Text fontSize="sm" fontStyle="italic">{order.ordered_by_address}</Text>
              
              <Text fontWeight="bold" mt={2}>Items:</Text>
              <Box mt={1} maxH="150px" overflowY="auto"> 
                {orderedItems.map((item, index) => (
                  <Text key={index} fontSize="xs">{item}</Text> 
                ))}
              </Box>
              <Text fontWeight="bold" color="blue" mt={2}>Price:</Text>
  <Text fontSize="sm">
    ₹{order.total_price} 
  </Text>
              <Text fontSize="xs" fontStyle="italic" mt={2}>Time Ordered: {new Date(order.date_time).toLocaleString()}</Text>
            </Box>
          );
        };
  return (
    <div>
     <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
     {Array.isArray(order) && order.map((order, index) => (
        <GridItem key={index}>
          <OrderCard order={order} />
        </GridItem>
      ))}
    </Grid>
    </div>
  )
}

export default Orders
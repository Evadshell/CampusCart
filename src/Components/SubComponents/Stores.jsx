/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Box, Button, Heading, Image, Spacer, Text, VStack } from '@chakra-ui/react';
import React from 'react'

const Stores = (props) => {
    const {Contact,VisitStore, Store_image,Owner_name,Name,Category,Id } = props;

  return (
    <div>
                <Box key={Id} bg="white" borderRadius="md" boxShadow="md" display="flex" overflow="hidden">
                      <Box flex="1">
                        <Image src={Store_image} alt={Name} w="100%" h="auto" objectFit="cover" />
                      </Box>
                      <Box p={4} flex="1">
                        <VStack align="start" spacing={2}>
                          <Heading as='h2' size='lg'>
              {Name}
            </Heading>
                          <Text fontSize="sm" as='i' color="gray.500">{Category}</Text>
                          <Text fontSize="sm" as='i' color="gray.500">{Owner_name}</Text>
                          <Text fontSize="sm" as='i' color="gray.500">{Contact}</Text>
                          <Spacer />
                          <Button onClick={() => VisitStore(Id)} colorScheme="blue" mt={10}>
                        Visit
                      </Button>
                        </VStack>
                      </Box>
                    </Box>
    </div>
  )
}

export default Stores
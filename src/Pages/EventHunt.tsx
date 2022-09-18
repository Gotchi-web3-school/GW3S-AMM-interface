import { Box, Center, VStack, Text } from "@chakra-ui/react"
import Chest from "../Components/Chests/Chest"

const EventHunt: React.FC = () => {


  return (
  <Box h="100vh">
      <Center>
        <VStack maxW="50%" mt="15%">
          <Text mb="3rem">Chest found !</Text>
          <Chest/> 
        </VStack>
      </Center>
  </Box>
  )
}

export default EventHunt
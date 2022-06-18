import { Box, useColorModeValue, HStack } from "@chakra-ui/react"
import Navbar from "./components/Navbar/Navbar"
import AMM from "./components/AMM/AMM"

const App: React.FC = () => {
  
   return (
    <Box
      h='calc(100vh)'
      bgGradient={useColorModeValue(
        "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
        "linear(gray.800, purple.900, purple.800, purple.900, gray.800)"
      )}>
      <Navbar />
      <HStack justifyContent={"center"} spacing={5}>
        <AMM />
      </HStack>
    </Box>
   )
}

export default App
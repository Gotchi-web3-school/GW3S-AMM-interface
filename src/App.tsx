import { Box, useColorModeValue, Grid, GridItem } from "@chakra-ui/react"
import Navbar from "./components/Navbar/Navbar"
import AMM from "./components/AMM"
import Erc20Generator from "./components/Erc20Generator"

const App: React.FC = () => {
  
   return (
    <Box
      h='calc(100vh)'
      bgGradient={useColorModeValue(
        "linear-gradient(25deg, #c3b6b2, #d59fac, #c3b6b2)",
        "linear(gray.800, purple.900, purple.800, purple.900, gray.800)"
      )}>
      <Navbar />
      <Grid 
      mt="6rem"
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(6, 1fr)'
      gap={4}
      >
        <GridItem rowSpan={2} colSpan={1}>
          <Erc20Generator />
        </GridItem>
        <GridItem colStart={3}>
          <AMM />
        </GridItem>
      </Grid>
    </Box>
   )
}

export default App
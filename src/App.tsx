import { Box, useColorModeValue, Grid, GridItem } from "@chakra-ui/react"
import Navbar from "./Components/Navbar/Navbar"
import AMM from "./Components/AMM"
import Erc20Generator from "./Components/Erc20Generator"

const App: React.FC = () => {
  
   return (
    <Box
      bgGradient={useColorModeValue(
        "linear-gradient(to-br, rgba(235,235,235,1) 0%, rgba(179,200,255,1) 100%)",
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
import { Grid, GridItem } from "@chakra-ui/react"
import Erc20Generator from "../Components/Erc20Generator"
import AMM from "../Components/AMM"

const Playground: React.FC = () => {
    return (
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
          <AMM id={0} />
        </GridItem>
      </Grid>
    )
}

export default Playground
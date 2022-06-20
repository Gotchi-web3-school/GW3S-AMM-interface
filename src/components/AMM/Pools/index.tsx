import { useState, useContext} from "react";
import { Box, Accordion, Divider, Button, Text, Stack, HStack, Spacer} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { PoolContext } from "../../../Provider/PoolsProvider";
import PoolCard from "./PoolCard"
import ImportPool from "./ImportPool"
import AddLiquidity from "./AddLiquidity/raw/AddLiquidity";

const Pools: React.FC = () => {
    const { pools } = useContext(PoolContext)
    const [state, setState] = useState("pool")

    return (
    <Box overflow={"scroll"} maxH="lg">
        {state === "add" && <AddLiquidity setState={setState} />}
        {state === "remove" ? "" : ""}
        {state === "pool" && 
        <Stack justifyContent={"center"} textAlign="center">
            <HStack mb="5">
                <Button 
                    w="45%" 
                    pl="0" 
                    bgGradient='linear(to-r, green.500, transparent)' 
                    _hover={{bg: 'green.500'}} 
                    justifyContent={"left"} 
                    onClick={() => setState("add")}
                    disabled={true}
                >
                    <ChevronLeftIcon />
                    <Text fontSize={"sm"}>Add liquidity</Text>
                </Button>
                <Spacer />
                <Button 
                    w="45%" 
                    pr="0" 
                    bgGradient='linear(to-l, red.500, transparent)' 
                    _hover={{bg: 'red.500'}} 
                    justifyContent={"right"} 
                    onClick={() => setState("remove")}
                    disabled={true}
                >
                    <Text fontSize={"sm"}>Remove liquidity</Text><ChevronRightIcon />
                </Button>
            </HStack>
            <ImportPool />            
            <Divider />
            <Accordion allowMultiple>
                {pools.map((pool) => <PoolCard pool={pool} key={pool.id} />)}
            </Accordion>
        </Stack>
        }
    </Box>
    )
} 

export default Pools
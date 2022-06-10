import { useState, useContext } from "react";
import { Box, Accordion, Divider, Button, Text, Stack, HStack, Spacer} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { PoolContext } from "../../../Provider/PoolsProvider";
import Pool from "./Pool"
import ImportPool from "./ImportPool"
import AddLiquidity from "../AddLiquidity/AddLiquidity";


const Pools: React.FC = () => {
    const { pools } = useContext(PoolContext)
    // const { active, activate } = useWeb3React();
    // const { pair, isApproved } = useContext(AddLiquidityContext);
    // const { ERC20 } = useContext(ContractContext);
    const [state, setState] = useState("pools")
  
    return (
    <Box overflow={"scroll"} maxH="lg">
        {state === "add" ? <AddLiquidity /> : ""}
        {state === "remove" ? "" : ""}
        {state === "pools" ? 
        <Stack justifyContent={"center"} textAlign="center">
            <HStack mb="5">
                <Button w="45%" pl="0" bgGradient='linear(to-r, green.500, transparent)'  _hover={{bgGradient: 'linear(to-l, green.500, transparent)'}} justifyContent={"left"} onClick={() => setState("add")}><ChevronLeftIcon /><Text fontSize={"sm"}>Add liquidity</Text></Button>
                <Spacer />
                <Button w="45%" pr="0" bgGradient='linear(to-l, red.500, transparent)' _hover={{bgGradient: 'linear(to-r, red.500, transparent)'}} justifyContent={"right"} onClick={() => setState("remove")}><Text fontSize={"sm"}>Remove liquidity</Text><ChevronRightIcon /></Button>
            </HStack>
            <ImportPool />            
            <Divider />
            <Accordion allowMultiple>
                {pools.map((pool, key) => <Pool pool={pool} key={key}/>)}
            </Accordion>
        </Stack> : ""
        }
    </Box>
    )
} 

export default Pools
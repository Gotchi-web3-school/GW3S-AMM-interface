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
            <HStack>
                <Button w="45%" bg="green.500" onClick={() => setState("add")}><ChevronLeftIcon /><Spacer /><Text w="100%">Add liquidity</Text></Button>
                <Spacer />
                <Button w="45%" bg="red.500" onClick={() => setState("remove")}><Text w="100%">Remove liquidity</Text><Spacer /><ChevronRightIcon /></Button>
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
import { useEffect, useState } from "react";
import { 
    Text, 
    Image,
    Box,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    useColorModeValue,
   } from "@chakra-ui/react"
import { QuestionOutlineIcon } from "@chakra-ui/icons"
import { IPool } from "../../../Models";
import PoolData from "./PoolData"
import AddLiquidityPool from "../AddLiquidity/AddLiquidityPool";
import { fetchBalances } from "../../../lib/utils/pools";
import { useWeb3React } from "@web3-react/core";

const PoolCard: React.FC<{pool: IPool}> = ({pool}) => {
    const {account, library} = useWeb3React()
    const [expanded, setExpanded] = useState(false)
    const [state, setState] = useState("pool")

    console.log(pool)
    useEffect(() => {
        if (expanded && account) {
            fetchBalances(pool.pair.token0, pool.pair.token1, account, library)
            .then(resutl => {
                console.log(resutl)
                pool.tokenA.balance = resutl.tokenA
                pool.tokenB.balance = resutl.tokenB
            })
       }
    }, [expanded, pool, account, library])

    return (
    <AccordionItem  m="3" border={"none"} borderTopRadius={expanded ? "xl" : "none"} bgGradient={expanded ? "linear(to-b, purple.900, purple.800, purple.900, gray.800)" : ""}>
        <Box>
            <AccordionButton
            _expanded={{
                bgGradient: "none",
            }}
            _hover={{
                bgGradient :useColorModeValue(
                "linear(whiteAlpha.100, pink.200, pink.300, pink.200, pink.100)",
                "linear(gray.800, purple.900, purple.800, purple.900, gray.800)"),
            }}
            bgGradient={useColorModeValue(
            "radial(whiteAlpha.100, pink.200, pink.300, pink.200, whiteAlpha.100)",
            "radial(gray.800, purple.900, purple.800, purple.900, gray.800)")}
            h="5rem"
            borderRadius={"full"}
            _focus={{border: "none"}}
            alignContent="center"
            onClick={() => setExpanded(!expanded)}
            >
                <Box display={"flex"} justifyContent="center" alignContent={"center"} pl="4" w="100%">
                    {pool?.logoURI?.tokenA ? <Image borderRadius='full' boxSize='30px' src={pool.logoURI.tokenA} alt={pool.pair.token0.name}/> : < QuestionOutlineIcon />}
                    <Text mx="5">{pool.name}</Text>
                    {pool?.logoURI?.tokenB ? <Image borderRadius='full' boxSize='30px' src={pool.logoURI.tokenB} alt={pool.pair.token1.name}/> : < QuestionOutlineIcon />}
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
               {state === "pool" && <PoolData pool={pool} setState={setState}/>}
               {state === "add" && <AddLiquidityPool pool={pool} setState={setState} />}
               {state === "remove" && <PoolData pool={pool} setState={setState}/>}
            </AccordionPanel>
        </Box>
    </AccordionItem>
    )
}

export default PoolCard
import { useEffect, useState, useContext, useReducer, memo } from "react";
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
import AddLiquidityPool from "../AddLiquidity/poolCard/AddLiquidityPool";
import { fetchPoolBalances, getLp} from "../../../lib/utils/pools";
import { isPoolCreated } from "../../../lib/utils";
import { useWeb3React } from "@web3-react/core";
import { ContractContext } from "../../../Provider/ContractsProvider";
import { poolCardReducer } from "../../../Reducers/poolCardReducer";


const PoolCard: React.FC<{pool: IPool, key: number}> = memo((props) => {
    const {account, library} = useWeb3React()
    const contract = useContext(ContractContext)
    const [pool, dispatch] = useReducer(poolCardReducer, props.pool)
    const [expanded, setExpanded] = useState(false)
    const [state, setState] = useState("pool")

    useEffect(() => {
        if (account && pool.isPool === undefined) {
            isPoolCreated(props.pool.pair, library).then(isPool => {
                if (isPool.result) {
                    console.log("New pool found! ")
                    getLp(isPool.tokenAddress, contract).then(token => {
                        dispatch({type: "SET_ISPOOL", payload: token})
                    })
                }
            })
        }
    }, [account, props.pool, pool, library, contract])

    useEffect(() => {
        if (pool.isPool && pool.balance === undefined) {
                console.log("Fetch balance")
                fetchPoolBalances(pool, account!, contract)
                .then(result => dispatch({type: "SET_POOL_BALANCE", payload: result}))
        }
    }, [expanded, account, library, contract, pool])

    

   return (
       <AccordionItem m="3" border="none"  borderRadius={"3xl"} >
        <Box 
            border={expanded ? "solid 1px" : ""} 
            boxShadow={expanded && state === "pool" ? "inset 0 0 50px #a200ff" : 
                       expanded && state === "add" ?  "inset 0 0 50px #00ab33" : 
                       expanded && state === "remove" ? "inset 0 0 50px #00ab33" : ""} 
            borderColor={expanded && state === "pool" ? "#a200ff" : 
                         expanded && state === "add" ?  "#00ab33" :
                         expanded && state === "remove" ? "#00ab33" : ""} 
            borderRadius={"3xl"}
        >
            <AccordionButton
            _expanded={{bgGradient: "none"}}
            _hover={{
                bgGradient:useColorModeValue(
                    "linear(whiteAlpha.100, pink.200, pink.300, pink.200, pink.100)",
                    "linear(gray.800, purple.900, purple.800, purple.900, gray.800)")}}
            bgGradient={useColorModeValue(
                "radial(whiteAlpha.100, pink.200, pink.300, pink.200, whiteAlpha.100)",
                "radial(gray.800, purple.900, purple.800, purple.900, gray.800)")}
            h="5rem"
            pb="0"
            borderRadius={"full"}
            _focus={{border: "none"}}
            alignContent="center"
            onClick={() => setExpanded(!expanded)}
                    >
                <Box display={"flex"} justifyContent="center" alignContent={"center"} pl="4" w="100%">
                    {props.pool.tokenA.logo ? <Image borderRadius='full' boxSize='30px' src={props.pool.tokenA.logo} alt={props.pool.pair.token0.name}/> : < QuestionOutlineIcon />}
                    <Text mx="5">{props.pool.name}</Text>
                    {props.pool.tokenB.logo ? <Image borderRadius='full' boxSize='30px' src={props.pool.tokenB.logo} alt={props.pool.pair.token1.name}/> : < QuestionOutlineIcon />}
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
               {state === "pool" && <PoolData pool={pool ?? props.pool} setState={setState} />}
               {state === "add" && <AddLiquidityPool pool={pool ?? props.pool} setState={setState} dispatch={dispatch} />}
               {state === "remove" && <AddLiquidityPool pool={pool ?? props.pool} setState={setState} dispatch={dispatch} />}
            </AccordionPanel>
        </Box>
    </AccordionItem>
    )
})

export default PoolCard
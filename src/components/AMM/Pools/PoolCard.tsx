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
import { fetchPoolBalances, getLp} from "../../../lib/utils/pools";
import { isPoolCreated } from "../../../lib/utils";
import { useWeb3React } from "@web3-react/core";
import { ContractContext } from "../../../Provider/ContractsProvider";
import { poolCardReducer } from "../../../Reducers/poolCardReducer";
import PoolData from "./Pool/PoolData"
import AddLiquidityPool from "./AddLiquidity/poolCard/AddLiquidityPool";
import RemoveLiquidityPool from "./removeLiquidity/RemoveLiquidityPool";
import { AnimatePresence } from "framer-motion";
import { RepeatIcon } from "@chakra-ui/icons"


const PoolCard: React.FC<{pool: IPool, key: number}> = memo((props) => {
    const {account, library} = useWeb3React()
    const contract = useContext(ContractContext)
    const [pool, dispatch] = useReducer(poolCardReducer, props.pool)
    const [expanded, setExpanded] = useState(false)
    const [state, setState] = useState("pool")
    const [refreshHovered, setRefreshHovered] = useState(false)

    useEffect(() => {
        if (account && pool.isPool === undefined) {
            isPoolCreated(props.pool.pair, library).then(isPool => {
                if (isPool.result) {
                    console.log(pool.name + ": Pool found!")
                    getLp(isPool.tokenAddress, contract).then(token => {
                        dispatch({type: "SET_ISPOOL", payload: {lp: token, isPool: true}})
                    })
                } else {
                    dispatch({type: "SET_ISPOOL", payload: {isPool: false}})
                }
            })
        }
    }, [account, props.pool, pool, library, contract])

    useEffect(() => {
        if (pool.isPool && pool.lpToken.balance === undefined) {
            console.log("Fetch balance")
            fetchPoolBalances(pool, account!, contract)
            .then(result => dispatch({type: "SET_POOL_BALANCE", payload: result}))
        }
    }, [expanded, account, library, contract, pool])

   return (
       <AccordionItem mx="3" my="5" border="none" borderRadius={"3xl"} isDisabled={refreshHovered}>
        <Box
            border={expanded ? "solid 1px" : ""} 
            boxShadow={expanded && state === "pool" ? "inset 0 0 50px #a200ff" : 
                       expanded && state === "add" ?  "inset 0 0 50px #00ab33" : 
                       expanded && state === "remove" ? "inset 0 0 50px #ff412e" : ""} 
            borderColor={expanded && state === "pool" ? "#a200ff" : 
                         expanded && state === "add" ?  "#00ab33" :
                         expanded && state === "remove" ? "#ff412e" : ""} 
            borderRadius={"3xl"}
            transition="1s ease-in-out"
        >
            <AccordionButton
            _expanded={{bgGradient: "none"}}
            boxShadow={parseInt(pool?.lpToken.balance?.toExact() ?? '0') > 0 && !expanded ? "1px 1px 10px white" : ""}
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
                    {expanded && <Box
                    _hover={{cursor: "pointer", color:"white"}}
                    position={"relative"}
                    left="3"
                    onMouseEnter={() => setRefreshHovered(true)} 
                    onMouseLeave={() => setRefreshHovered(false)}
                    onClick={() => dispatch({type: "REFRESH"})}
                    >
                        <RepeatIcon boxSize={6} _hover={{ boxSize: "7"}} />
                    </Box>}
                    <Box ml={expanded ? "-4" : ''} display={"flex"} justifyContent="center" alignContent={"center"} pl="4" w="100%">
                    {props.pool.tokenA.logo ? <Image borderRadius='full' boxSize='30px' src={props.pool.tokenA.logo} alt={props.pool.pair.token0.name}/> : < QuestionOutlineIcon />}
                    <Text mx="5" fontWeight={"bold"} textShadow={"1px 1px 10px white"}>{props.pool.name}</Text>
                    {props.pool.tokenB.logo ? <Image borderRadius='full' boxSize='30px' src={props.pool.tokenB.logo} alt={props.pool.pair.token1.name}/> : < QuestionOutlineIcon />}
                    </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
                <AnimatePresence initial={false}>
                {state === "pool" && <PoolData pool={pool ?? props.pool} setState={setState} />}
                {state === "add" && <AddLiquidityPool pool={pool ?? props.pool} setState={setState} dispatch={dispatch} />}
                {state === "remove" && <RemoveLiquidityPool pool={pool ?? props.pool} setState={setState} dispatch={dispatch} />}
                </AnimatePresence>
            </AccordionPanel>
        </Box>
    </AccordionItem>
    )
})

export default PoolCard
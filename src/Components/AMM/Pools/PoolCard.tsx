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
import { QuestionIcon } from "@chakra-ui/icons"
import { fetchPoolBalances, getLp} from "../../../Lib/Utils/pools";
import { isPoolCreated } from "../../../Lib/Utils";
import { useWeb3React } from "@web3-react/core";
import { ContractContext } from "../../../Provider/ContractProvider";
import { poolCardReducer } from "../../../Reducers/poolCardReducer";
import PoolData from "./Pool/PoolData"
import AddLiquidityPool from "./Addliquidity/PoolCard/AddLiquidityPool";
import RemoveLiquidityPool from "./RemoveLiquidity/RemoveLiquidityPool";
import { AnimatePresence } from "framer-motion";
import { RepeatIcon } from "@chakra-ui/icons";
import { PoolCardContextType, IPool } from "../../../Models";


const PoolCard: React.FC<{pool: IPool, key: number}> = memo((props) => {
    const {account, library} = useWeb3React()
    const contract = useContext(ContractContext)
    const [pool, dispatch] = useReducer(poolCardReducer, props.pool)
    const [expanded, setExpanded] = useState(false)
    const [state, setState] = useState("pool")
    const [refreshHovered, setRefreshHovered] = useState(false)
    const bgCard = useColorModeValue("purple.100", "")
    const boxShadowPool = useColorModeValue("1px 1px 20px black","1px 1px 10px white")
    const context: PoolCardContextType = {
        pool: pool,
        setState: setState,
        dispatch: dispatch,
    }

    useEffect(() => {
        if (account && pool.isPool === undefined) {
            isPoolCreated(props.pool.pair, library).then((isPool: any) => {
                if (isPool.result) {
                    console.log(pool.name + ": Pool found!")
                    getLp(isPool.tokenAddress, contract).then((token: any) => {
                        dispatch({type: "SET_ISPOOL", payload: {lp: token, isPool: true}})
                    })
                } else {
                    dispatch({type: "SET_ISPOOL", payload: {isPool: false}})
                }
            })
        }
    }, [account, props.pool, pool, library, contract, expanded])

    useEffect(() => {
        if (pool.isPool && pool.lpToken.balance === undefined) {
            console.log("Fetch balance")

            fetchPoolBalances(pool, account!, contract)
            .then((result: any) => {
                dispatch({type: "SET_POOL_BALANCE", payload: result})
                dispatch({type: "FETCH_POOL_BALANCE", payload: false})
            })
            .catch(result => console.log(result))
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
            background={expanded ? bgCard : ""}
            transition="1s ease-in-out"
        >
            <AccordionButton
            _expanded={{bgGradient: "none"}}
            boxShadow={parseInt(pool?.lpToken.balance?.toExact() ?? '0') > 0 && !expanded ? boxShadowPool : ""}
            _hover={{
                bgGradient:useColorModeValue(
                    "linear(gray.100, purple.100, purple.200, purple.100, gray.100)",
                    "linear(gray.800, purple.900, purple.800, purple.900, gray.800)")
            }}
            bgGradient={useColorModeValue(
                "radial(gray.100, gray.200, gray.300, purple.200, purple.200)",
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
                transition="1s"
                >
                    <RepeatIcon boxSize={6} _hover={{boxSize: "7"}} _active={{transform: "scale(0.9)"}} />
                </Box>}
                <Box ml={expanded ? "-4" : ''} display={"flex"} justifyContent="center" alignContent={"center"} pl="4" w="100%">
                {props.pool.tokenA.logo ? 
                    <Image borderRadius='full' boxSize='30px' src={props.pool.tokenA.logo} alt={props.pool.pair.token0.name}/> :
                    < QuestionIcon />
                }
                <Text mx="5" fontWeight={"bold"} textShadow={"1px 1px 10px white"}>{props.pool.name}</Text>
                {props.pool.tokenB.logo ?
                    <Image borderRadius='full' boxSize='30px' src={props.pool.tokenB.logo} alt={props.pool.pair.token1.name}/> : 
                    < QuestionIcon />
                }
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
                <AnimatePresence initial={false}>
                {state === "pool" && <PoolData context={context} />}
                {state === "add" && <AddLiquidityPool context={context} />}
                {state === "remove" && <RemoveLiquidityPool context={context} />}
                </AnimatePresence>
            </AccordionPanel>
        </Box>
    </AccordionItem>
    )
})

export default PoolCard
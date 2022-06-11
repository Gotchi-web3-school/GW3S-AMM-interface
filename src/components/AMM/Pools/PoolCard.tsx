import { useEffect, useState, useContext, useReducer } from "react";
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
import { fetchPoolBalances } from "../../../lib/utils/pools";
import { useWeb3React } from "@web3-react/core";
import { ContractContext } from "../../../Provider/ContractsProvider";
import { poolReducer } from "../../../Reducers/poolReducer";
import { PoolContext } from "../../../Provider/PoolsProvider";


const PoolCard: React.FC<{pool: IPool}> = (props) => {
    const {account, library} = useWeb3React()
    const contract = useContext(ContractContext)
    const poolProvider = useContext(PoolContext)
    const [provider, dispatch] = useReducer(poolReducer, poolProvider)
    const { pool } = provider
    const [expanded, setExpanded] = useState(false)
    const [state, setState] = useState("pool")

    useEffect(() => {
        if (account) {
            dispatch({type: "SET_CARD_POOL_STATE", payload: props.pool})
        }
    }, [expanded, account, props.pool])

    useEffect(() => {
        if (account && pool) {
            console.log(pool)
            fetchPoolBalances(pool, account!, contract)
            .then(result => dispatch({type: "SET_POOL_BALANCE", payload: result}))
        }
    }, [expanded, account, library, contract, props.pool, pool])

    /* For addLiquidity
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
    */

    return (
    <AccordionItem  m="3" border={"none"} borderRadius={"3xl"} bgGradient={expanded ? "linear(to-b, purple.900, purple.800, purple.900, gray.800)" : ""}>
        <Box>
            <AccordionButton
            _expanded={{
                bgGradient: "none",
            }}
            _hover={{
                bgGradient:useColorModeValue(
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
                    {props.pool.tokenA.logo ? <Image borderRadius='full' boxSize='30px' src={props.pool.tokenA.logo} alt={props.pool.pair.token0.name}/> : < QuestionOutlineIcon />}
                    <Text mx="5">{props.pool.name}</Text>
                    {props.pool.tokenB.logo ? <Image borderRadius='full' boxSize='30px' src={props.pool.tokenB.logo} alt={props.pool.pair.token1.name}/> : < QuestionOutlineIcon />}
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
               {state === "pool" && <PoolData pool={pool} setState={setState}/>}
               {pool && state === "add" && <AddLiquidityPool pool={pool} setState={setState} />}
               {pool && state === "remove" && <PoolData pool={pool} setState={setState}/>}
            </AccordionPanel>
        </Box>
    </AccordionItem>
    )
}

export default PoolCard
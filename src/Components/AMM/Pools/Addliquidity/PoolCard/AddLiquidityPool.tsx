import React, { useContext, useEffect } from "react"
import { useWeb3React } from "@web3-react/core";
import {Button, Box, Text, Stack, HStack, Spacer, Spinner, useToast } from "@chakra-ui/react";
import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { ContractContext } from "../../../../../Provider/ContractProvider";
import { PoolCardContextType } from "../../../../../Models";
import { fetchBalances, fetchApprovedPair } from "../../../../../Lib/Utils/pools";
import { motion } from "framer-motion";
import MaxButton from "./MaxButton";
import InputToken from "./InputToken";
import BabyPoolShare from "./BabyPoolShare";
import MintButton from "./MintButton";
import ConnectorButton from "../../../../Buttons/ConnectorButton";
import { handleApproveTx } from "../../../../../Lib/Handlers/smart_contract";

const AddLiquidityPool:  React.FC<{context: PoolCardContextType}> = ({context}) => {
    const { pool, setState, dispatch} = context
    const { account, library, chainId } = useWeb3React();
    const contract = useContext(ContractContext);
    const toast = useToast()

    useEffect(() => {
        if (account && pool.tokenA.balance === undefined) {
            fetchBalances(pool, account, library)
            .then(result => dispatch({type: "SET_POOL_TOKEN_BALANCE", payload: result}))
       }
    }, [pool, account, library, dispatch])

    // Check for approval
    useEffect(() => {
        if (account && pool.tokenA.balance === undefined)
            fetchApprovedPair(pool, account, library)
            .then(result => dispatch({type: "SEARCH_APPROVED", payload: {id: 0, isApproved: result}}))
    }, [pool, account, library, dispatch])

    return (
        <Box
        as={motion.div}
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -30, opacity: 0 }}
        >
            <Box px="8" display={"flex"} justifyContent="center" alignContent={"center"} alignItems={"center"} w="100%" >
                {pool.tokenA.balance ? 
                    <Text fontSize={"xs"}>{pool.tokenA.balance?.toFixed(2)}</Text> : 
                    <Spinner boxSize={"4"} />
                }
                <MaxButton token={pool.tokenA} dispatch={dispatch}/>
                <Spacer />
                {pool.tokenB.balance ? 
                    <Text fontSize={"xs"}>{pool.tokenB.balance?.toFixed(2)}</Text> : 
                    <Spinner boxSize={"4"} />
                }
                <MaxButton token={pool.tokenB} dispatch={dispatch}/>
            </Box>
            
            <Box px="4" display={"flex"} justifyContent="center" alignContent={"center"} alignItems={"center"} w="100%" >
                <InputToken token={pool.tokenA} dispatch={dispatch} />
                    <AddIcon mx="2" fontSize={"xs"} />
                <InputToken token={pool.tokenB} dispatch={dispatch} />
            </Box>
            {(pool.tokenA.inputAdd || pool.tokenB.inputAdd) && <BabyPoolShare pool={pool} />}
                {chainId !== 80001 ? 
                    <ConnectorButton /> 
                    : 
                    <>
                        <Stack px="5" mt="3" direction="row">
                            {pool.tokenA.isApproved ? "" : 
                                <Button 
                                disabled={pool.tokenA.loading} 
                                key={0} 
                                onClick={() => handleApproveTx(pool.tokenA.token, contract, context, toast)}
                                h="4rem"
                                borderRadius={"3xl"}
                                bg="transparent"
                                boxShadow={"inset 1px 1px 10px 1px #ffa500"}
                                _hover={{bg: "yellow.700"}}
                                transition="0.4s ease-in-out"
                                w="100%">{pool.tokenA.loading ? <Spinner /> : `Approve ${pool.tokenA.token.symbol}`}
                                </Button>
                            }
                            {pool.tokenB.isApproved ? "" : 
                                <Button 
                                disabled={pool.tokenB.loading} 
                                key={1} 
                                onClick={() => handleApproveTx(pool.tokenB.token, contract, context, toast)}
                                h="4rem"
                                borderRadius={"3xl"}
                                bg="transparent"
                                boxShadow={"inset 1px 1px 10px 1px #ffa500"}
                                _hover={{bg: "yellow.700"}} 
                                transition="0.4s ease-in-out"
                                w="100%">{pool.tokenB.loading ? <Spinner /> : `Approve ${pool.tokenB.token.symbol}`}
                                </Button>
                            }
                        </Stack>
                        {pool.tokenA.isApproved && pool.tokenB.isApproved && <MintButton context={context} />}
                    </>
                }
            <HStack  m="5">
                <Button 
                    w="45%" 
                    pl="0" 
                    bgGradient='linear(to-r, red.500, transparent)' 
                    _hover={{bg: 'red.500'}} 
                    justifyContent={"left"} 
                    onClick={() => setState("remove")}>
                    <Text fontSize={"sm"}><ChevronLeftIcon />Remove liquidity</Text>
                </Button>
                <Spacer />
                <Button 
                    w="45%" 
                    pr="0" 
                    bgGradient='linear(to-l, #a200ff, transparent)' 
                    _hover={{bg: '#a200ff'}} 
                    justifyContent={"right"} 
                    onClick={() => setState("pool")}>
                    <Text fontSize={"sm"}>Pool<ChevronRightIcon /></Text>
                </Button>
            </HStack>
        </Box>
    )
}

export default AddLiquidityPool
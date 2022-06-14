import React, { useContext, useEffect } from "react"
import { useWeb3React } from "@web3-react/core";
import { Token } from "quickswap-sdk";
import {Button, Box, Text, HStack, Spacer, Spinner, useToast } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { injected } from '../../../../Connectors/connectors';
import { ContractContext } from "../../../../Provider/ContractsProvider";
import { GlobalConst } from "../../../../Constants";
import { IPool } from "../../../../Models";
import { fetchBalances, fetchApproved } from "../../../../lib/utils/pools";
import RemovePoolShare from "./RemovePoolShare";
import RemoveButton from "./removeButton";
import SliderPool from "../../AddLiquidity/poolCard/SliderPool";


const RemoveLiquidityPool:  React.FC<{pool: IPool, setState: React.Dispatch<string>, dispatch: React.Dispatch<any>}> = ({pool, setState, dispatch}) => {
    const { active, activate, account, library } = useWeb3React();
    const { ERC20 } = useContext(ContractContext);
    const { lpToken } = pool
    const toast = useToast()

    useEffect(() => {
        if (account && pool.tokenA.balance === undefined) {
            fetchBalances(pool, account, library)
            .then(result => dispatch({type: "SET_POOL_TOKEN_BALANCE", payload: result}))
       }
    }, [pool, account, library, dispatch])

    // Check for approval
    useEffect(() => {
        if (account && lpToken.balance === undefined)
        console.log("Search for approved lp")
            fetchApproved(pool, account!, library)
            .then(result => dispatch({type: "SEARCH_APPROVED", payload: result}))
    }, [pool, account, library, dispatch, lpToken.balance])

    const handleClickButton = async (token: Token, idx: number) => {
        try {
            dispatch({type: "LOADING", payload: {id: idx, isLoading: true}})
            const contract = ERC20?.attach(token.address)
            const tx = await contract?.approve(GlobalConst.addresses.ROUTER_ADDRESS, GlobalConst.utils.MAX_INT)
            toast({
                title: `Approve: ${token.symbol}`,
                description: `transaction pending at: ${tx.hash}`,
                position: "top-right",
                status: "warning",
                isClosable: true,
                })
            const receipt = await tx.wait()
            toast({
                title: `Approve: ${token.symbol}`,
                description: `${token.symbol} token approved successfully !`,
                position: "top-right",
                status: "success",
                duration: 6000,
                isClosable: true,
                })
            console.log("Receipt: " + receipt)
            dispatch({type: "LOADING", payload: {id: idx, isLoading: false}})
            dispatch({type: "SET_APPROVED", payload: idx})
            
        } catch (error: any) {
            toast({
                position: "bottom-right",
                title: 'An error occurred.',
                description: `Add Liquidity: ${error.message}`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
            dispatch({type: "LOADING", payload: {id: idx, isLoading: false}})
        }
    }

    return (
        <Box>
            <Button 
                onClick={() => dispatch({type: "HANDLE_REMOVE_INPUTS", payload: {type: "MAX_BUTTON", value: pool.lpToken!.balance}})} 
                size={"xs"} 
                bg="blue.500"
                mx="2"
                mb="4"
                fontSize={"xxs"}
            >Max</Button>
            <SliderPool pool={pool} dispatch={dispatch} />
            <RemovePoolShare pool={pool} dispatch={dispatch} />
            {!active ? 
                <Button mt="3" w="100%" h="4rem" onClick={() =>  activate(injected)}>Connect</Button>
                :
                <Box mx="5">
                    {lpToken.isApproved ? "" : 
                        <Button 
                        key={0} 
                        w="100%"
                        h="4rem"
                        borderRadius={"3xl"}
                        bg="transparent"
                        textColor={"whiteAlpha.800"}
                        boxShadow={"inset 1px 1px 10px 1px #ffa500"}
                        disabled={lpToken.loading} 
                        onClick={() => handleClickButton(lpToken.token!, 2)} 
                        _hover={{bg: "yellow.700"}} 
                        >
                            {lpToken.loading ? <Spinner /> : `Approve LP token`}
                        </Button>
                    }
                    {lpToken.isApproved && <RemoveButton pool={pool} dispatch={dispatch} />}
                </Box> 
            }
            <HStack  m="5">
                <Button w="45%" pl="0" bgGradient='linear(to-r, #a200ff, transparent)' _hover={{bg: '#a200ff'}} justifyContent={"left"} onClick={() => setState("pool")}>
                    <Text fontSize={"sm"}><ChevronLeftIcon />Pool</Text>
                </Button>
                <Spacer />
                <Button w="45%" pr="0" bgGradient='linear(to-l, #00ab33, transparent)' _hover={{bg: '#00ab33'}} justifyContent={"right"} onClick={() => setState("add")}>
                    <Text fontSize={"sm"}>Add Liquidity<ChevronRightIcon /></Text>
                </Button>
            </HStack>
        </Box>
    )
}

export default RemoveLiquidityPool
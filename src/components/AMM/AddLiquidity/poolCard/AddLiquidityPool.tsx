import React, { useContext, useEffect } from "react"
import { useWeb3React } from "@web3-react/core";
import { Token } from "quickswap-sdk";
import {Button, Box, Text, Stack, HStack, Spacer, Spinner, useToast } from "@chakra-ui/react";
import { AddIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { injected } from '../../../../Connectors/connectors';
import { ContractContext } from "../../../../Provider/ContractsProvider";
import { GlobalConst } from "../../../../Constants";
import { IPool } from "../../../../Models";
import { fetchBalances } from "../../../../lib/utils/pools";
import MaxButton from "./MaxButton";
import InputToken from "./InputToken";
import BabyPoolShare from "./BabyPoolShare";
import MintButton from "../raw/MintButton";

const AddLiquidityPool:  React.FC<{pool: IPool, setState: React.Dispatch<string>, dispatch: React.Dispatch<any>}> = ({pool, setState, dispatch}) => {
    const { active, activate, account, library } = useWeb3React();
    const { ERC20 } = useContext(ContractContext);
    const toast = useToast()

    useEffect(() => {
        if (account && pool.tokenA.balance === undefined) {
            fetchBalances(pool.pair.token0, pool.pair.token1, account, library)
            .then(result => dispatch({type: "SET_POOL_TOKEN_BALANCE", payload: result}))
       }
    }, [pool, account, library, dispatch])

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
            console.log(receipt)
            dispatch({type: "LOADING", payload: {id: idx, isLoading: false}})
            dispatch({type: "APPROVED", payload: idx})
            
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
            <Box px="5" display={"flex"} justifyContent="center" alignContent={"center"} alignItems={"center"} w="100%" >
                <Text fontSize={"xs"}>{pool.tokenA.balance?.toFixed(2)}</Text><MaxButton token={pool.tokenA} dispatch={dispatch}/>
                <Spacer />
                <MaxButton token={pool.tokenB} dispatch={dispatch}/><Text fontSize={"xs"}>{pool.tokenB.balance?.toFixed(2)}</Text>
            </Box>
            <Box  display={"flex"} justifyContent="center" alignContent={"center"} alignItems={"center"} w="100%" >
                <InputToken token={pool.tokenA} dispatch={dispatch} />
                    <AddIcon mx="2" fontSize={"xs"} />
                <InputToken token={pool.tokenB} dispatch={dispatch} />
            </Box>
            {(pool.tokenA.input || pool.tokenB.input) && <BabyPoolShare pool={pool} />}
            {!active ? 
                <Button mt="3" w="100%" h="4rem" onClick={() =>  activate(injected)}>Connect</Button>
                :
                <>
                    <Stack mt="6"  direction="row">
                        {pool.tokenA.isApproved ? "" : pool.tokenA.isApproved && <Button disabled={pool.tokenA.loading} key={0} onClick={() => handleClickButton(pool.tokenA.token, 0)} bg="yellow.600" _hover={{bg: "yellow.700"}} w="100%">{pool.tokenA.loading ? <Spinner /> : `Approve ${pool.tokenA.token.symbol}`}</Button>}
                        {pool.tokenB.isApproved ? "" : pool.tokenB.isApproved && <Button disabled={pool.tokenB.loading} key={1} onClick={() => handleClickButton(pool.tokenB.token, 1)} bg="yellow.600" _hover={{bg: "yellow.700"}} w="100%">{pool.tokenB.loading ? <Spinner /> : `Approve ${pool.tokenB.token.symbol}`}</Button>}
                    </Stack>
                    {pool.tokenA.isApproved && pool.tokenB.isApproved && <MintButton />}
                </> 
            }
            <HStack  m="5">
                <Button w="45%" pl="0" bgGradient='linear(to-r, red.500, transparent)' _hover={{bg: 'red.500'}} justifyContent={"left"} onClick={() => setState("remove")}>
                    <Text fontSize={"sm"}><ChevronLeftIcon />Remove liquidity</Text>
                </Button>
                <Spacer />
                <Button w="45%" pr="0" bgGradient='linear(to-l, blue.500, transparent)' _hover={{bg: 'blue.500'}} justifyContent={"right"} onClick={() => setState("pool")}>
                    <Text fontSize={"sm"}>Pools<ChevronRightIcon /></Text>
                </Button>
            </HStack>
        </Box>
    )
}

export default AddLiquidityPool
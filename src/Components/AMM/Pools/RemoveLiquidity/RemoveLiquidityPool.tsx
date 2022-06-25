import React, { useContext, useEffect } from "react"
import { useWeb3React } from "@web3-react/core";
import {Button, Box, Text, HStack, Spacer, Spinner, useToast } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { ContractContext } from "../../../../Provider/ContractProvider";
import { fetchApprovedLp } from "../../../../Lib/Utils/pools";
import { motion } from "framer-motion";
import SliderPool from "./SliderPool";
import RemoveButton from "./RemoveButton";
import RemovePoolShare from "./RemovePoolShare";
import ConnectorButton from "../../../Buttons/ConnectorButton";
import { PoolCardContextType } from "../../../../Models";
import { handleApproveTx } from "../../../../Lib/Handlers/smart_contract";

const RemoveLiquidityPool:  React.FC<{context: PoolCardContextType}> = ({context}) => {
    const { pool, setState, dispatch} = context
    const { lpToken } = pool
    const { account, library } = useWeb3React();
    const contract = useContext(ContractContext);
    const toast = useToast()

    // Check for approval
    useEffect(() => {
        if (account && pool.isPool && lpToken.isApproved === undefined) {
            console.log("Search for approved lp")
            fetchApprovedLp(pool, account!, library)
                .then(result => dispatch({type: "SEARCH_APPROVED", payload: result}))
        }
    }, [pool, account, library, dispatch, lpToken])

    return (
        <Box
        as={motion.div}
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -30, opacity: 0 }} 
        >
            <Button 
                onClick={() => dispatch({type: "HANDLE_REMOVE_INPUTS", payload: {type: "MAX_BUTTON", value: pool.lpToken!.balance}})} 
                size={"sm"}
                rounded={"xl"} 
                bg="blue.500"
                mx="2"
                mb="4"
                fontSize={"xxs"}
            >Max</Button>
            <SliderPool pool={pool} dispatch={dispatch} />
            <RemovePoolShare pool={pool} dispatch={dispatch} />
                <Box mx="5" mt="5">
                    <ConnectorButton>
                        {lpToken.isApproved ? "" : 
                            <Button 
                            key={0} 
                            w="100%"
                            h="4rem"
                            borderRadius={"3xl"}
                            bg="transparent"
                            boxShadow={"inset 1px 1px 10px 1px #ffa500"}
                            disabled={lpToken.loading || !pool.isPool} 
                            onClick={() => handleApproveTx(lpToken.token!, contract, context, toast)} 
                            _hover={pool.isPool ? {bg: "yellow.700"} : {bg: "none"}} 
                            >
                                {lpToken.loading ? <Spinner /> : pool.isPool ? `Approve LP token` : "This pool does not exist"}
                            </Button>
                        }
                            {lpToken.isApproved && <RemoveButton context={context} />}
                    </ConnectorButton>
                </Box> 
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
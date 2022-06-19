import React, { useContext, useState } from "react"
import { Button, Container, Spinner, Text, useToast, Box } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import { isSufficientBalance } from "../../../../../lib/utils"
import { ContractContext } from "../../../../../Provider/ContractsProvider"
import { addLiquidityTx } from "../../../../../lib/smart-contracts/addLiquidity"
import { IPool } from "../../../../../Models"

const MintButton: React.FC<{pool: IPool, dispatch: React.Dispatch<any>}> = ({pool, dispatch}) => {
    const contract = useContext(ContractContext)
    const { tokenA, tokenB, pair, isPool} = pool
    const { library, account } = useWeb3React()
    const toast = useToast()
    const [loading, setLoading] = useState(false)

    const handleAddLiquidityTx = () => {
        setLoading(true)
        addLiquidityTx({
            router2: contract.router2,
            pair: pair,
            amount0: tokenA.inputAdd!,
            amount1: tokenB.inputAdd!,
            userAddress: account!,
            toast: toast,
        }, library)
        .then(() => {
            setLoading(false)
            dispatch({type: "RESET_ADD"})
        })
    }

    return (
        <Box mx="5">
        {tokenA.inputAdd && tokenB.inputAdd ?
            <>
            {tokenA.balance && isSufficientBalance(tokenA.inputAdd.toExact(), tokenA.balance, tokenB.inputAdd.toExact(), tokenB.balance!) ?
                <Button 
                onClick={handleAddLiquidityTx} 
                disabled={!tokenA.isApproved  || !tokenB.isApproved || loading} 
                mt="5" 
                w="100%" 
                h="4rem"
                bg="transparent"
                borderRadius={"3xl"}
                textColor={"whiteAlpha.800"}
                _hover={{bg: "#0065fe"}}
                boxShadow={"inset 1px 1px 10px 1px #54bafe"}
                >
                    {loading ? <Spinner /> : isPool ? "Add Liquidity"  : "Create pool"}
                </Button>
                :
                <Container 
                mt="5"
                w="100%" 
                h="4rem" 
                borderRadius={"3xl"}
                textColor={"whiteAlpha.600"}
                boxShadow={"inset 1px 1px 10px 1px #ff5d4b"}
                >
                    <Text pt='4' textAlign={"center"} fontSize={"xl"}>Insufficient balance</Text>
                </Container>
            }
            </>
            :
            <Container 
            mt="5" 
            w="100%" 
            h="3.5rem"
            borderRadius={"3xl"}
            bg="gray.500"
            color="gray.700"
            >
                <Text pt="2" fontSize={"2xl"}>Enter amount</Text>
            </Container>
        }
        </Box>
    )
}

export default MintButton
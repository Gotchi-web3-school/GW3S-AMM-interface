import React, { useContext } from "react"
import { Button, Container, Spinner, Text, useToast, Box } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import { isSufficientBalances } from "../../../../../Lib/Utils"
import { ContractContext } from "../../../../../Provider/ContractProvider"
import { PoolCardContextType } from "../../../../../Models"
import { handleAddLiquidityTx } from "../../../../../Lib/Handlers/smart_contract"

const MintButton: React.FC<{context: PoolCardContextType}> = ({context}) => {
    const { tokenA, tokenB, isPool, loading} = context.pool
    const contract = useContext(ContractContext)
    const signer = useWeb3React()
    const toast = useToast()

    return (
        <Box mx="5">
        {tokenA.inputAdd.input && tokenB.inputAdd.input ?
            <>
            {tokenA.balance && isSufficientBalances(tokenA.inputAdd.input!, tokenA.balance, tokenB.inputAdd.input!, tokenB.balance!) ?
                <Button 
                onClick={() => handleAddLiquidityTx(signer, contract, context, toast)} 
                disabled={!tokenA.isApproved  || !tokenB.isApproved || loading} 
                mt="5" 
                w="100%" 
                h="4rem"
                bg="transparent"
                borderRadius={"3xl"}
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
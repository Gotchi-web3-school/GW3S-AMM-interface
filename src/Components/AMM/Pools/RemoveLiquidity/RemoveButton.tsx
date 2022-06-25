import React, { useContext } from "react"
import { Button, Container, Spinner, Text, useToast } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import { PoolCardContextType } from "../../../../Models";
import {isSufficientLPBalance } from "../../../../Lib/Utils"
import { handleRemoveLiquidityTx } from "../../../../Lib/Handlers/smart_contract"
import { ContractContext } from "../../../../Provider/ContractProvider";

const RemoveButton: React.FC<{context: PoolCardContextType}> = ({context}) => {
    const { lpToken, loading } = context.pool
    const signer = useWeb3React()
    const toast = useToast()
    const contract = useContext(ContractContext)

    return (
        <>
        {lpToken.lpRemoveInput.amount ?
            <>
            {isSufficientLPBalance(lpToken.lpRemoveInput.amount, lpToken.balance!) ?
                <Button 
                onClick={() => handleRemoveLiquidityTx(signer, contract, context, toast)} 
                disabled={!lpToken.isApproved || !lpToken.balance!.greaterThan("0") || loading} 
                mt="5" 
                w="100%" 
                h="4rem" 
                bg="transparent"
                borderRadius={"3xl"}
                _hover={{bg: "#0065fe"}}
                boxShadow={"inset 1px 1px 10px 1px #54bafe"}
                >
                    {loading ? <Spinner /> : "Remove Liquidity"}
                </Button>
                :
                <Container mt="5" w="100%" h="4rem" borderRadius={"3xl"} boxShadow={"inset 1px 1px 10px 1px #ff5d4b"}>
                    <Text pt="4" fontSize={"xl"}>Insufficient balance</Text>
                </Container>
            }
            </>
            :
            <Container 
            mt="5" 
            w="100%" 
            h="3.5rem" 
            bg="gray.500" 
            textAlign={"center"} 
            verticalAlign="center" 
            rounded={"3xl"} 
            color="gray.700"
            >
                <Text pt="2" fontSize={"2xl"}>Enter amount</Text>
            </Container>
        }
        </>
    )
}

export default RemoveButton 
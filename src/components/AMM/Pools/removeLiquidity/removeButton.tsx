import React, { useContext, useState } from "react"
import { Button, Container, Spinner, Text, useToast } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import { ContractContext } from "../../../../Provider/ContractsProvider"
import { removeLiquidityTx, isSufficientLPBalance } from "../../../../lib/smart-contracts/removeLiquidity"
import { IPool } from "../../../../Models"

const RemoveButton: React.FC<{pool: IPool, dispatch: React.Dispatch<any>}> = ({pool, dispatch}) => {
    const contract = useContext(ContractContext)
    const { library, account } = useWeb3React()
    const { tokenA, tokenB, lpToken, pair} = pool
    const toast = useToast()
    const [loading, setLoading] = useState(false)

    const handleRemoveLiquidityTx = () => {
        setLoading(true)
        removeLiquidityTx({
            router2: contract.router2!,
            pair: pair,
            liquidityAmount: lpToken.lpRemoveInput!,
            amountAOut: tokenA.inputRemove!,
            amountBOut: tokenB.inputRemove!,
            userAddress: account!,
            toast: toast,
        }, library)
        .then(() => {
            setLoading(false)
            dispatch({type: "RESET_REMOVE"})
        })
    }

    return (
        <>
        {lpToken.lpRemoveInput ?
            <>
            {isSufficientLPBalance(lpToken.lpRemoveInput, lpToken.balance!) ?
                <Button 
                onClick={handleRemoveLiquidityTx} 
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
                <Container 
                mt="5" 
                w="100%" 
                h="4rem"  
                borderRadius={"3xl"}
                boxShadow={"inset 1px 1px 10px 1px #ff5d4b"}
                >
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
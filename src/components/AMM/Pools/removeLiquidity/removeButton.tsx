import React, { useContext, useState } from "react"
import { Button, Container, Spinner, Text, useToast } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import { ContractContext } from "../../../../Provider/ContractsProvider"
import { removeLiquidityTx, isSufficientLPBalance } from "../../../../lib/smart-contracts/removeLiquidity"
import { IPool } from "../../../../Models"

const RemoveButton: React.FC<{pool: IPool, dispatch: React.Dispatch<any>}> = ({pool, dispatch}) => {
    const contract = useContext(ContractContext)
    const { library, account } = useWeb3React()
    const { tokenA, tokenB, isPool, lpRemoveInput, balance} = pool
    const toast = useToast()
    const [loading, setLoading] = useState(false)

    const handleRemoveLiquidityTx = () => {
        setLoading(true)
        removeLiquidityTx({
            router2: contract.router2,
            liquidityAmount: lpRemoveInput!,
            amountAOut: tokenA.inputRemove!,
            amountBOut: tokenB.inputRemove!,
            userAddress: account!,
            toast: toast,
        }, library)
        .then(() => {
            setLoading(false)
            dispatch({type: "RESET"})
        })
    }

    return (
        <>
        {lpRemoveInput ?
            <>
            {isSufficientLPBalance(lpRemoveInput, balance!) ?
                <Button 
                onClick={handleRemoveLiquidityTx} 
                disabled={!tokenA.isApproved  || !tokenB.isApproved || loading} 
                mt="5" 
                w="100%" 
                h="3.5rem" 
                bg="blue.500" 
                >
                    {loading ? <Spinner /> : isPool ? "Add Liquidity"  : "Create pool"}
                </Button>
                :
                <Container mt="5" w="100%" h="3.5rem" bg="red.300" textAlign={"center"} verticalAlign="center" rounded={"xl"} color="gray.700"><Text pt="2" fontSize={"2xl"}>Insufficient balance</Text></Container>
            }
            </>
            :
            <Container mt="5" w="100%" h="3.5rem" bg="gray.500" textAlign={"center"} verticalAlign="center" rounded={"xl"} color="gray.700"><Text pt="2" fontSize={"2xl"}>Enter amount</Text></Container>
        }
        </>
    )
}

export default RemoveButton 
import React, { useContext, useState } from "react"
import { Button, Container, Spinner, Text, useToast } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import { isSufficientBalance } from "../../../../lib/utils"
import { ContractContext } from "../../../../Provider/ContractsProvider"
import { addLiquidityTx } from "../../../../lib/smart-contracts/addLiquidity"
import { IPool } from "../../../../Models"

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
            amount0: tokenA.input!,
            amount1: tokenB.input!,
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
        {tokenA.input && tokenB.input ?
            <>
            {tokenA.balance && isSufficientBalance(tokenA.input.toExact(), tokenA.balance, tokenB.input.toExact(), tokenB.balance!) ?
                <Button 
                onClick={handleAddLiquidityTx} 
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

export default MintButton
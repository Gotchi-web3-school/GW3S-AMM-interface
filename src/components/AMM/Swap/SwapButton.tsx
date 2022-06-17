import { useContext } from "react"
import { Button, Container, Spinner, Text, useToast } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import { isSufficientBalance } from "../../../lib/utils"
import { ContractContext } from "../../../Provider/ContractsProvider"
import { swapExactTokensForTokensSupportingFeeOnTransferTokensTx } from "../../../lib/smart-contracts/swap"
import { SwapContext } from "../../../Provider/SwapProvider"
import { getDeadLine } from "../../../lib/utils"
import { Percent } from "quickswap-sdk"

const SwapButton: React.FC = () => {
    const contract = useContext(ContractContext)
    const { library, account } = useWeb3React()
    const toast = useToast()
    const { tokenA, tokenB, input, output, isPool, error, loading, trade, dispatch} = useContext(SwapContext)
    console.log(isPool)

    const handleSwapTx = async() => {
        dispatch({type: "LOADING", payload: false})
        swapExactTokensForTokensSupportingFeeOnTransferTokensTx({
            router2: contract.router2,
            amountIn: trade!.inputAmount!,
            amountOutMin: trade!.minimumAmountOut(new Percent("5", "1000")),
            path: [tokenA.token?.address!, tokenB.token?.address!],
            to: account ?? "",
            deadline: await getDeadLine(library),
            toast: toast,
        })
        .then(() => {
            dispatch({type: "LOADING", payload: false})
        })
    }

    return (
        <>
        {tokenA.token && tokenB.token ?
            <>
            {input.amount && output.amount ?
                <>
                {isPool && !error ? 
                    <>
                    {tokenA.balance.amount && tokenB.balance.amount && isSufficientBalance(input.amount.toExact(), tokenA.balance.amount!, output.amount.toExact(), tokenB.balance.amount!) ?
                        <>
                            <Button 
                            onClick={handleSwapTx} 
                            disabled={!tokenA.approve.isApproved || !tokenA.approve.isApproved || loading} 
                            mt="5" 
                            w="100%" 
                            h="3.5rem" 
                            bg="blue.500" 
                            >
                                {loading ? <Spinner /> : "Swap"}
                            </Button>
                        </>
                        :
                        <Container mt="5" w="100%" h="3.5rem" bg="red.300" textAlign={"center"} verticalAlign="center" rounded={"xl"} color="gray.700">Insufficient balance</Container>
                    }
                    </>
                    :
                    <Container mt="5" w="100%" h="3.5rem" bg="red.300" textAlign={"center"} verticalAlign="center" rounded={"xl"} color="gray.700"><Text pt="2" fontSize={"2xl"}>Insufficient liquidity for this trade.</Text></Container>
                }
                </>
                :
                <Container mt="5" w="100%" h="3.5rem" bg="gray.500" textAlign={"center"} verticalAlign="center" rounded={"xl"} color="gray.700"><Text pt="2" fontSize={"2xl"}>Enter amount</Text></Container>
            }
            </>
            :
            <Container mt="5" w="100%" h="3.5rem" bg="gray.500" textAlign={"center"} verticalAlign="center" rounded={"xl"} color="gray.700"><Text pt="2" fontSize={"2xl"}>Select a token {tokenA.token ? 'A' : 'B'}</Text></Container>
        }
        </>
    )
}

export default SwapButton
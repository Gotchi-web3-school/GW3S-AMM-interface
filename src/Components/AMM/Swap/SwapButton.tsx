import { useContext } from "react"
import { Button, Container, Spinner, Text, Stack, useToast } from "@chakra-ui/react"
import { Percent, Token } from "gotchiw3s-sdk"
import { useWeb3React } from "@web3-react/core"
import { isSufficientBalance } from "../../../Lib/Utils"
import { ContractContext } from "../../../Provider/ContractProvider"
import { 
    swapExactTokensForTokensSupportingFeeOnTransferTokensTx,
    swapExactETHForTokensSupportingFeeOnTransferTokensTx,
 
} from "../../../Lib/Smart-contracts/swap"
import { SwapContext } from "../../../Provider/SwapProvider"
import { getDeadLine } from "../../../Lib/Utils"
import { approveTx } from "../../../Lib/Smart-contracts/approve"
import { GlobalConst } from "../../../Constants"

const SwapButton: React.FC = () => {
    const contract = useContext(ContractContext)
    const { library, account } = useWeb3React()
    const toast = useToast()
    const { tokenA, tokenB, input, output, isPool, error, loading, trade, dispatch} = useContext(SwapContext)

    const handleSwapTx = async() => {
        dispatch({type: "LOADING", payload: true})
        if (tokenA.token!.address === GlobalConst.addresses.WMATIC || tokenB.token!.address === GlobalConst.addresses.WMATIC) {
            swapExactETHForTokensSupportingFeeOnTransferTokensTx({
                router2: contract.router2,
                amountIn: trade!.inputAmount!,
                amountOutMin: trade!.minimumAmountOut(new Percent("5", "1000")),
                path: [tokenA.token?.address!, tokenB.token?.address!],
                to: account ?? "",
                deadline: await getDeadLine(library),
                toast: toast,
                dispatch: dispatch,
            })
            .then(() => {
                dispatch({type: "LOADING", payload: false})
                dispatch({type: "RESET"})
            })
        } else {
            swapExactTokensForTokensSupportingFeeOnTransferTokensTx({
                router2: contract.router2,
                amountIn: trade!.inputAmount!,
                amountOutMin: trade!.minimumAmountOut(new Percent("5", "1000")),
                path: [tokenA.token?.address!, tokenB.token?.address!],
                to: account ?? "",
                deadline: await getDeadLine(library),
                toast: toast,
                dispatch: dispatch,
            })
            .then(() => {
                dispatch({type: "LOADING", payload: false})
                dispatch({type: "RESET"})
            })
        }
    }

    const handleApproveTx = async(token: Token) => {
        dispatch({type: "LOADING", payload: true})
        approveTx({
            router2: contract.router2!,
            spender: contract.router2!.address,
            amount: GlobalConst.utils.MAX_INT,
            token: token,
            toast: toast,
        })
    }

    return (
        <>
        {tokenA.token && tokenB.token ?
            <>
            {isPool && !error ? 
                <>
                {input.amount && output.amount ?
                    <>
                    {tokenA.balance.amount && tokenB.balance.amount && isSufficientBalance(input.amount.toExact(), tokenA.balance.amount!, output.amount.toExact(), tokenB.balance.amount!) ?
                        <Stack px="5" mt="3" direction="row">
                           {tokenA.approve.isApproved || tokenA.token.address === GlobalConst.addresses.WMATIC ?
                                <Button 
                                onClick={handleSwapTx} 
                                disabled={!tokenA.approve.isApproved || !tokenA.approve.isApproved || loading} 
                                mt="5" 
                                w="100%" 
                                h="4rem"
                                bg="transparent"
                                borderRadius={"3xl"}
                                _hover={{bg: "#0065fe"}}
                                boxShadow={"inset 1px 1px 10px 1px #54bafe"}
                                >
                                    {loading ? <Spinner /> : "Swap"}
                                </Button>
                                : 
                                <Button 
                                disabled={tokenA.approve.loading} 
                                key={0} 
                                onClick={() => handleApproveTx(tokenA.token!)}
                                h="4rem"
                                borderRadius={"3xl"}
                                bg="transparent"
                                boxShadow={"inset 1px 1px 10px 1px #ffa500"}
                                _hover={{bg: "yellow.700"}}
                                transition="0.4s ease-in-out"
                                w="100%">{tokenA.approve.loading ? <Spinner /> : `Approve ${tokenA.token.symbol}`}
                                </Button>
                            }
                        </Stack>
                        :
                        <Container mt="5" w="100%" h="4rem"  borderRadius={"3xl"} boxShadow={"inset 1px 1px 10px 1px #ff5d4b"} textAlign={"center"} rounded={"xl"}>
                            <Text pt='4' textAlign={"center"} fontSize={"xl"}>Insufficient balance</Text>
                        </Container>
                    }
                    </>
                    :
                    <Container mt="5" w="100%" h="3.5rem" bg="gray.500" textAlign={"center"} verticalAlign="center" rounded={"xl"} color="gray.700"><Text pt="2" fontSize={"2xl"}>Enter amount</Text></Container>
                }
                </>
                :
                <Container mt="5" w="100%" h="4rem" borderRadius={"3xl"} boxShadow={"inset 1px 1px 10px 1px #ff5d4b"} textAlign={"center"} rounded={"xl"}><Text pt="3" fontSize={"xl"}>Insufficient liquidity for this trade.</Text></Container>
            }
            </>
            :
            <Container mt="5" w="100%" h="3.5rem" bg="gray.500"  textAlign={"center"} verticalAlign="center" rounded={"xl"} color="gray.700"><Text pt="2" fontSize={"2xl"}>Select a token {tokenA.token ? 'B' : 'A'}</Text></Container>
        }
        </>
    )
}

export default SwapButton
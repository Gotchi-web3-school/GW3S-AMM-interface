import { useContext } from "react"
import { Button, Container, Text } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import { AddLiquidityContext } from "../../../Provider/AddLiquidityProvider"
import { isSufficientBalance } from "../../../lib/utils"
import { ContractContext } from "../../../Provider/ContractsProvider"
import { addLiquidityTx } from "../../../lib/smart-contracts/addLiquidity"

const MintButton: React.FC = () => {
    const contract = useContext(ContractContext)
    const { library, account } = useWeb3React()
    const { isPool, token0, token0Amount, token1, token1Amount, isApproved, token0Balance, token1Balance, pair } = useContext(AddLiquidityContext)

    const handleAddLiquidityTx = () => {
        try {
            if (token0Amount && token1Amount) {
                addLiquidityTx({
                    router2: contract.router2,
                    pair: pair,
                    amount0: token0Amount,
                    amount1: token1Amount,
                    userAddress: account ?? "",
                }, library).then()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        {token0 && token1 ?
            <>
            {token0Amount && token1Amount ?
                <>
                {token0Balance && token1Balance && isSufficientBalance(token0Amount.toExact(), token0Balance, token1Amount.toExact(), token1Balance) ?
                    <>
                    {isPool ? 
                        <Button onClick={handleAddLiquidityTx}  disabled={!isApproved?.token0  || !isApproved.token1} mt="5" w="100%" h="3.5rem" bg="blue.500" >Add Liquidity</Button>
                        :
                        <Button onClick={handleAddLiquidityTx} disabled={!isApproved?.token0  || !isApproved.token1} mt="5" w="100%" h="3.5rem" bg={!isApproved?.token0 || !isApproved.token1 ? "gray.700" : "blue.500"} >Create pool</Button>
                    }
                    </>
                    :
                    <Container mt="5" w="100%" h="3.5rem" bg="red.300" textAlign={"center"} verticalAlign="center" rounded={"xl"} color="gray.700"><Text pt="2" fontSize={"2xl"}>Insufficient balance</Text></Container>
                }
                </>
                :
                <Container mt="5" w="100%" h="3.5rem" bg="gray.500" textAlign={"center"} verticalAlign="center" rounded={"xl"} color="gray.700"><Text pt="2" fontSize={"2xl"}>Enter amount</Text></Container>
            }
            </>
            :
            <Container mt="5" w="100%" h="3.5rem" bg="gray.500" textAlign={"center"} verticalAlign="center" rounded={"xl"} color="gray.700"><Text pt="2" fontSize={"2xl"}>Invalid Pair</Text></Container>
        }
        </>
    )
}

export default MintButton
import { useContext } from "react"
import { Button, Container, Text } from "@chakra-ui/react"
import { ethers } from "ethers"
import { useWeb3React } from "@web3-react/core"
import { Percent, JSBI } from "quickswap-sdk"
import { AddLiquidityContext } from "../../../Provider/AddLiquidityProvider"
import { calculateSlippageAmount, isSufficientBalance } from "../../../utils"
import { GlobalConst } from "../../../Constants"
import { ContractContext } from "../../../Provider/ContractsProvider"

const MintButton: React.FC = () => {
    const { router2, factory } = useContext(ContractContext)
    const { library, account } = useWeb3React()
    const { isPool, token0, token0Amount, token1, token1Amount, isApproved, token0Balance, token1Balance, pair } = useContext(AddLiquidityContext)
    const handleCreatePool = async() => {
        try {
            console.log(router2 , factory , pair , token0Amount?.bigAmount , token1Amount?.bigAmount)
            if (router2 && factory && pair && token0Amount?.bigAmount && token1Amount?.bigAmount) {
                const slippage = new Percent(JSBI.BigInt(GlobalConst.utils.INITIAL_ALLOWED_SLIPPAGE), "10000")
                const amountA = pair.token0.equals(token0Amount.bigAmount.token) ? token0Amount.bigAmount : token1Amount.bigAmount;
                const amountB =  pair.token1.equals(token0Amount.bigAmount.token) ? token0Amount.bigAmount : token1Amount.bigAmount;
                const minAmount0 = calculateSlippageAmount(amountA, slippage)
                const minAmount1 = calculateSlippageAmount(amountB, slippage)
                const deadline = await library.getBlock().then((result: any) => ethers.BigNumber.from(result.timestamp + GlobalConst.utils.DEFAULT_DEADLINE_FROM_NOW * 10 ))

                console.log("token A: " + pair.token0.address)
                console.log("token B: " + pair.token1.address)
                console.log("amount A: " + amountA.raw.toString())
                console.log("amount B: " + amountB.raw.toString())
                console.log("minimum amount A: " + ethers.utils.parseEther(minAmount0[0].toString()).toString())
                console.log("minimum amount B: " + ethers.utils.parseEther(minAmount1[0].toString()).toString())
                console.log("account address: " + account)
                console.log("deadline: " + deadline)

                const gas = await router2.estimateGas.addLiquidity(
                    pair.token0.address,
                    pair.token1.address,
                    amountA.raw.toString(),
                    amountB.raw.toString(),
                    ethers.utils.parseEther(minAmount0[0].toString()),
                    ethers.utils.parseEther(minAmount1[0].toString()),
                    account,
                    deadline,
                    {gasLimit: 3000000}
                ) 

                console.log("Gas cost: " + ethers.utils.formatEther(gas.toString()))
                
                const tx = await router2.addLiquidity(
                    pair.token0.address,
                    pair.token1.address,
                    amountA.raw.toString(),
                    amountB.raw.toString(),
                    ethers.utils.parseEther(minAmount0[0].toString()),
                    ethers.utils.parseEther(minAmount1[0].toString()),
                    account,
                    deadline,
                    {gasLimit: gas}
                ) 
                const receipt = await tx.wait()
                console.log(receipt)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        {token0 && token1 ?
            <>
            {token0Amount?.value && token1Amount?.value ?
                <>
                {token0Balance && token1Balance && isSufficientBalance(token0Amount.value, token0Balance, token1Amount.value, token1Balance) ?
                    <>
                    {isPool ? 
                        <Button onClick={handleCreatePool} mt="5" w="100%" h="3.5rem" bg="blue.500" >Add Liquidity</Button>
                        :
                        <Button onClick={handleCreatePool} disabled={!isApproved?.token0  || !isApproved.token1} mt="5" w="100%" h="3.5rem" bg={!isApproved?.token0 || !isApproved.token1 ? "gray.700" : "blue.500"} >Create pool</Button>
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
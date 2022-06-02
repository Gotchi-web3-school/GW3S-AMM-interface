import { useContext } from "react"
import { Button, Container, Text } from "@chakra-ui/react"
import { ethers } from "ethers"
import { useWeb3React } from "@web3-react/core"
import { Percent, JSBI } from "quickswap-sdk"
import { AddLiquidityContext } from "../../../Provider/AddLiquidityProvider"
import { calculateSlippageAmount } from "../../../utils"
import { GlobalConst } from "../../../constants"
import { ContractContext } from "../../../Provider/ContractsProvider"

const MintButton: React.FC = () => {
    const { router2, factory } = useContext(ContractContext) 
    const { library, account } = useWeb3React()
    const { isPool, pair, token0, token1, isApproved, token0Balance, token1Balance } = useContext(AddLiquidityContext)
    const handleCreatePool = async() => {
        try {
            if (pair && router2 && token0 && token1 && factory) {
                const  slippage = new Percent(JSBI.BigInt(GlobalConst.utils.INITIAL_ALLOWED_SLIPPAGE), "10000")
                const minAmount0 = calculateSlippageAmount(pair?.reserve0, slippage)
                const minAmount1 = calculateSlippageAmount(pair?.reserve1, slippage)
                const deadline = await library.getBlock().then((result: any) => ethers.BigNumber.from(result.timestamp + GlobalConst.utils.DEFAULT_DEADLINE_FROM_NOW * 10 ))
                // console.log(token0.address)
                // console.log(token1.address)
                // console.log(ethers.BigNumber.from(pair.reserve0.raw.toString()))
                // console.log(ethers.BigNumber.from(pair.reserve1.raw.toString()))
                // console.log(ethers.utils.parseEther(minAmount0[0].toString()))
                // console.log(ethers.utils.parseEther(minAmount1[0].toString()))
                // console.log(account)
                // console.log(deadline)
            
                
                const tx = await router2.addLiquidity(
                    token0.address,
                    token1.address,
                    ethers.BigNumber.from(pair.reserve0.raw.toString()),
                    ethers.BigNumber.from(pair.reserve1.raw.toString()),
                    ethers.utils.parseEther(minAmount0[0].toString()),
                    ethers.utils.parseEther(minAmount1[0].toString()),
                    account,
                    deadline,
                    {gasLimit: 20000000}
                ) 
                // const tx = await factory.createPair(token0.address, token1.address)
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
            {pair ?
                <>
                {(pair?.reserve0.lessThan(token0Balance ?? '0') || pair?.reserve0.equalTo(token0Balance ?? '0')) &&
                 (pair?.reserve1.lessThan(token1Balance ?? '0') || pair?.reserve1.equalTo(token1Balance ?? '0')) ?
                    <>
                    {isPool ? 
                        <Button onClick={handleCreatePool} mt="5" w="100%" h="3.5rem" bg="blue.500" >Add Liquidity</Button>
                        :
                        <Button onClick={handleCreatePool} disabled={!isApproved.token0 || !isApproved.token1} mt="5" w="100%" h="3.5rem" bg={!isApproved.token0 || !isApproved.token1 ? "gray.700" : "blue.500"} >Create pool</Button>
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
import { useContext } from "react"
import { Button, Container, Text } from "@chakra-ui/react"
import { AddLiquidityContext } from "../../../Provider/AddLiquidityProvider"

const MintButton: React.FC = () => {
    const { isPool, pair, token0, token1, token0Amount, token1Amount, isApproved, token0Balance, token1Balance } = useContext(AddLiquidityContext)

    return (
        <>
        {token0 && token1 ?
            <>
            {token0Amount >'0' && token1Amount > '0' ?
                <>
                {token0Balance && token1Balance && 
                 (pair?.reserve0.lessThan(token0Balance) || pair?.reserve0.equalTo(token0Balance)) &&
                 (pair?.reserve1.lessThan(token1Balance) || pair?.reserve1.equalTo(token1Balance)) ?
                    <>
                    {isPool ? 
                        <Button mt="5" w="100%" h="3.5rem" bg="blue.500" >Add Liquidity</Button>
                        :
                        <Button disabled={!isApproved.token0 || !isApproved.token1} mt="5" w="100%" h="3.5rem" bg={!isApproved.token0 || !isApproved.token1 ? "gray.700" : "blue.500"} >Create pool</Button>
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
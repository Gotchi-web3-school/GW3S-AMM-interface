import { useContext } from "react"
import { Button, Container, Text } from "@chakra-ui/react"
import { AddLiquidityContext } from "../../../Provider/AddLiquidityProvider"
import { JSBI } from "quickswap-sdk"

const MintButton: React.FC = () => {
    const { isPool, token0, token1, token0Amount, token1Amount, isApproved, token0Balance, token1Balance } = useContext(AddLiquidityContext)
    const disabled = !isApproved.token0 || !isApproved.token1
    return (
        <>
        {token0 && token1 ?
            <>
            {token0Amount && token1Amount ?
                <>
                {(token0Balance?.equalTo(JSBI.BigInt(token0Amount)) || token0Balance?.greaterThan(JSBI.BigInt(token0Amount))) && (token1Balance?.equalTo(JSBI.BigInt(token1Amount)) || token1Balance?.greaterThan(JSBI.BigInt(token1Amount))) ?
                    <>
                    { isPool ? 
                        <Button mt="5" w="100%" h="3.5rem" bg="blue.500" >Add Liquidity</Button>
                        :
                        <Button disabled={disabled} mt="5" w="100%" h="3.5rem" bg={disabled ? "gray.700" : "blue.500"} >Create pool</Button>
                    }
                    </>
                    :
                    <Container mt="5" w="100%" h="3.5rem" bg="red.300" textAlign={"center"} verticalAlign="center" rounded={"xl"} color="gray.700"><Text pt="2" fontSize={"2xl"}>Insufficient amount</Text></Container>
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
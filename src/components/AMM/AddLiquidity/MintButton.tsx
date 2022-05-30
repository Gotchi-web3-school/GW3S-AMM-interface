import { useContext } from "react"
import { Button, Container, Text } from "@chakra-ui/react"
import { AddLiquidityContext } from "../../../Provider/AddLiquidityProvider"

const MintButton: React.FC = () => {
    const { isPool, token0, token1, token0Amount, token1Amount, isApproved } = useContext(AddLiquidityContext)
    const disabled = !isApproved.token0 || !isApproved.token1
    return (
        <>
            {token0 && token1 ?
                <>
                {token0Amount && token1Amount ?
                    <>
                    { isPool ? 
                        <Button mt="5" w="100%" h="3.5rem" bg="blue.500" >Add Liquidity</Button>
                        :
                        <Button disabled={disabled} mt="5" w="100%" h="3.5rem" bg={disabled ? "gray.700" : "blue.500"} >Create pool</Button>
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
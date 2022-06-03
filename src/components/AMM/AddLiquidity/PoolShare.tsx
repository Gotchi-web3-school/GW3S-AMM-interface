import { useState, useContext, useEffect } from "react"
import { Text, Stack, Box, Center, Spacer } from "@chakra-ui/react"
import { AddLiquidityContext } from "../../../Provider/AddLiquidityProvider"
import { calculateShare } from "../../../utils"

const PoolShare: React.FC = () => {
    const { isPool, token0, token1, reserves, token0Amount} = useContext(AddLiquidityContext)
    const [share, setShare] = useState<string>("100")

    useEffect(() => {
        if (isPool && token0Amount?.bigAmount && token0) {
            try {
                calculateShare(token0, token0Amount.bigAmount, reserves).then((result: string) => setShare(result))
               // console.log(share)
            } catch (error) {
                console.log(error)
            }
        }
    }, [isPool, token0, token0Amount, reserves])

    return (
        <Box
            mt="2rem"
            border={"1px"}
            borderRadius={"3xl"}
            borderColor={"gray.700"}>
            <Text p="3">Initial prices and pool share</Text>
            <Stack 
                direction={"row"}  
                p="1rem"
                border={"1px"}
                borderRadius={"3xl"}
                borderColor={"gray.700"} 
                justifyContent="center">
                <Box>
                    <Center>
                        <Text>{reserves.toSignificant(2)}</Text>
                    </Center>
                    <Text fontSize="sm">{token0?.symbol} per {token1?.symbol}</Text>
                </Box>
                <Spacer />
                <Box>
                    <Center>
                        <Text>{reserves.invert().toSignificant(2)}</Text>
                    </Center>
                    <Text fontSize="sm">{token1?.symbol} per {token0?.symbol}</Text>
                </Box>
                <Spacer />
                <Box>
                    <Center>
                        <Text>{share}%</Text>
                    </Center>
                    <Text fontSize="sm">Share of pool</Text>
                </Box>
            </Stack>
        </Box>
    )
}

export default PoolShare
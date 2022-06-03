import { useState, useContext, useEffect } from "react"
import { Text, Stack, Box, Center, Spacer } from "@chakra-ui/react"
import { AddLiquidityContext } from "../../../Provider/AddLiquidityProvider"
import { calculateShare, rate } from "../../../utils"

const PoolShare: React.FC = () => {
    const { isPool, token0, token1, reserves, token0Amount, token1Amount} = useContext(AddLiquidityContext)
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
    console.log(reserves.toSignificant(2))
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
                        <Text>{rate(reserves, token0Amount?.value ?? '0', token1Amount?.value ?? '0')}</Text>
                    </Center>
                    <Text fontSize="sm">{token0?.symbol} per {token1?.symbol}</Text>
                </Box>
                <Spacer />
                <Box>
                    <Center>
                        <Text>{rate(reserves, token1Amount?.value ?? '0', token0Amount?.value ?? '0')}</Text>
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
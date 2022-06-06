import { useState, useContext, useEffect } from "react"
import { Text, Stack, Box, Center, Spacer } from "@chakra-ui/react"
import { AddLiquidityContext } from "../../../Provider/AddLiquidityProvider"
import { calculateShare, rate } from "../../../utils"

const PoolShare: React.FC = () => {
    const { isPool, reserves, token0Amount, token1Amount, pair} = useContext(AddLiquidityContext)
    const [share, setShare] = useState<string>("100")

    useEffect(() => {
        if (isPool && token0Amount?.bigAmount && pair) {
            try {
                setShare(calculateShare(pair, token0Amount.bigAmount, reserves))
            } catch (error) {
                console.log(error)
            }
        } else {
            setShare("100")
        }
    }, [isPool, pair, token0Amount, reserves])
    
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
                        <Text>{isPool ? reserves.toSignificant(2) : rate(token0Amount?.value, token1Amount?.value)}</Text>
                    </Center>
                    <Text fontSize="sm">{pair?.token0?.symbol} per {pair?.token1?.symbol}</Text>
                </Box>
                <Spacer />
                <Box>
                    <Center>
                        <Text>{isPool ? reserves.invert().toSignificant(2) : rate(token1Amount?.value, token0Amount?.value)}</Text>
                    </Center>
                    <Text fontSize="sm">{pair?.token1?.symbol} per {pair?.token0?.symbol}</Text>
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
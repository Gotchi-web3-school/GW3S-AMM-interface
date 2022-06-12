import { useState, useEffect } from "react"
import { Text, Stack, Box, Center, Spacer } from "@chakra-ui/react"
import { calculateShare, rate } from "../../../../lib/utils"
import { IPool } from "../../../../Models"

const BabyPoolShare: React.FC<{pool: IPool}> = ({pool}) => {
    const [share, setShare] = useState("0")
    const { isPool, tokenA, tokenB, pair, totalReserves} = pool

    useEffect(() => {
        if (isPool && tokenA.input) {
            try {
                setShare(calculateShare(pair, tokenA.input, totalReserves))
            } catch (error) {
                console.log(error)
            }
        } else {
            setShare("100")
        }
    }, [isPool, pair,  tokenA.input, totalReserves])
    
    return (
        <Stack 
            direction={"row"}  
            justifyContent="center">
            <Box>
                <Center>
                    <Text>{isPool ? totalReserves.toSignificant(2) : rate(tokenA.input?.toExact(), tokenB.input?.toExact())}</Text>
                </Center>
                <Text fontSize="sm">{tokenA.token?.symbol} per {tokenB.token?.symbol}</Text>
            </Box>
            <Spacer />
            <Box>
                <Center>
                    <Text>{share}%</Text>
                </Center>
                <Text fontSize="sm">Share of pool</Text>
            </Box>
            <Spacer />
            <Box>
                <Center>
                    <Text>{isPool ? totalReserves.invert().toSignificant(2) : rate(tokenB.input?.toExact(), tokenA.input?.toExact())}</Text>
                </Center>
                <Text fontSize="sm">{tokenB.token?.symbol} per {tokenA.token?.symbol}</Text>
            </Box>
        </Stack>
    )
}

export default BabyPoolShare
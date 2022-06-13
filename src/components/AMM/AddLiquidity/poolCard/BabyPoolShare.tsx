import { useState, useEffect } from "react"
import { Text, Stack, Box, Spacer } from "@chakra-ui/react"
import { calculateShare, rate } from "../../../../lib/utils"
import { IPool } from "../../../../Models"

const BabyPoolShare: React.FC<{pool: IPool}> = ({pool}) => {
    const [share, setShare] = useState("0")
    const { isPool, tokenA, tokenB, pair, totalReserves} = pool

    useEffect(() => {
        if (isPool && tokenA.inputAdd) {
            try {
                setShare(calculateShare(pair, tokenA.inputAdd, totalReserves))
            } catch (error) {
                console.log(error)
            }
        } else {
            setShare("100")
        }
    }, [isPool, pair,  tokenA.inputAdd, totalReserves])
    
    return (
        <Stack 
            mt="2"
            px="1rem"
            direction={"row"}  
            justifyContent="center">
            <Box>
                <Text fontWeight={"bold"} fontSize="sm" >{isPool ? totalReserves.toSignificant(2) : rate(tokenA.inputAdd?.toExact(), tokenB.inputAdd?.toExact())}</Text>
                <Text  fontSize="xs">{tokenA.token?.symbol} per {tokenB.token?.symbol}</Text>
            </Box>
            <Spacer />
            <Box>
                <Text fontWeight={"bold"} fontSize="sm">{share}%</Text>
                <Text fontSize="xs">Share of pool</Text>
            </Box>
            <Spacer />
            <Box>
                <Text fontWeight={"bold"} fontSize="sm">{isPool ? totalReserves.invert().toSignificant(2) : rate(tokenB.inputAdd?.toExact(), tokenA.inputAdd?.toExact())}</Text>
                <Text fontSize="xs">{tokenB.token?.symbol} per {tokenA.token?.symbol}</Text>
            </Box>
        </Stack>
    )
}

export default BabyPoolShare
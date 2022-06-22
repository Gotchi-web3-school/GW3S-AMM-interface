import { useState, useEffect } from "react"
import { Text, Stack, Box, Spacer } from "@chakra-ui/react"
import { calculateShare, rate } from "../../../../../Lib/Utils"
import { IPool } from "../../../../../Models"

const BabyPoolShare: React.FC<{pool: IPool}> = ({pool}) => {
    const [share, setShare] = useState("0")
    const { isPool, tokenA, tokenB, pair, totalReserves} = pool

    useEffect(() => {
        if (isPool && tokenA.inputAdd.amount) {
            try {
                setShare(calculateShare(pair, tokenA.inputAdd.amount!, totalReserves))
            } catch (error) {
                console.log(error)
            }
        } else {
            setShare("100")
        }
    }, [isPool, pair,  tokenA.inputAdd, totalReserves])
    
    return (
        <Stack 
            mt="4"
            px="1rem"
            direction={"row"}  
            justifyContent="center">
            <Box>
                <Text fontWeight={"bold"} fontSize="sm" >{isPool ? totalReserves.tokenA.divide(totalReserves.tokenB).toSignificant(2) ?? "0" : rate(tokenA.inputAdd.input, tokenB.inputAdd.input)}</Text>
                <Text fontSize="xs">{tokenA.token?.symbol} per {tokenB.token?.symbol}</Text>
            </Box>
            <Spacer />
            <Box>
                <Text fontWeight={"bold"} fontSize="sm">{share}%</Text>
                <Text fontSize="xs">Share of pool</Text>
            </Box>
            <Spacer />
            <Box>
                <Text fontWeight={"bold"} fontSize="sm">{isPool ? totalReserves?.tokenB.divide(totalReserves.tokenA).toSignificant(2) ?? "0" : rate(tokenB.inputAdd.input, tokenA.inputAdd.input)}</Text>
                <Text fontSize="xs">{tokenB.token?.symbol} per {tokenA.token?.symbol}</Text>
            </Box>
        </Stack>
    )
}

export default BabyPoolShare
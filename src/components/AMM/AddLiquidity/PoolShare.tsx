import { Text, Stack, Box, Center, Spacer } from "@chakra-ui/react"
import { useContext } from "react"
import { AddLiquidityContext } from "../../../Provider/AddLiquidityProvider"

const PoolShare: React.FC = () => {
    const { isPool, pair, token0, token1} = useContext(AddLiquidityContext)

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
                        <Text>{pair?.token1Price.toSignificant(2)}</Text>
                    </Center>
                    <Text fontSize="sm">{token0?.symbol} per {token1?.symbol}</Text>
                </Box>
                <Spacer />
                <Box>
                    <Center>
                        <Text>{pair?.token0Price.toSignificant(2)}</Text>
                    </Center>
                    <Text fontSize="sm">{token1?.symbol} per {token0?.symbol}</Text>
                </Box>
                <Spacer />
                <Box>
                    <Center>
                        <Text>{isPool ? "" : "100%"}</Text>
                    </Center>
                    <Text fontSize="sm">Share of pool</Text>
                </Box>
            </Stack>
        </Box>
    )
}

export default PoolShare
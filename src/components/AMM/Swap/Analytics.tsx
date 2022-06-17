import { Box, Flex, Text, Spacer, Divider, useColorModeValue } from "@chakra-ui/react"
import { Percent } from "quickswap-sdk"
import { useContext } from "react"
import { SwapContext } from "../../../Provider/SwapProvider"
import { calculFee } from "../../../lib/utils/swap"

const SwapDetails: React.FC = () => {
    const { trade, tokenA, tokenB } = useContext(SwapContext)
    return (
        <Box 
            flexDirection="column"
            bg={useColorModeValue("gray.200", "gray.700")}
            mx={"auto"}
            mt={-2}
            px={{ base: 2, sm: 5, md: 17 }}
            rounded="xl"
            zIndex={0}
            shadow="lg">
            <Box py='2vh' w="20rem">
                <Flex direction="row">
                    <Text>Minimum received</Text>
                    <Spacer />
                    <Text>{trade?.minimumAmountOut(new Percent("5", "1000")).toSignificant(5) ?? ""} {tokenB.token?.symbol ?? ""}</Text>
                </Flex>

                <Flex direction="row">
                    <Text>Price Impact</Text>
                    <Spacer />
                    <Text>{trade?.priceImpact.toFixed(2) ?? ""}</Text>
                </Flex>
                
                <Flex direction="row">
                    <Text>Liquidity provider fee</Text>
                    <Spacer />
                    <Text>{trade ? calculFee(trade.inputAmount): ""} {tokenA.token?.symbol ?? ""}</Text>
                </Flex>
            </Box>
            <Divider />
        </Box>
    )
}

export default SwapDetails
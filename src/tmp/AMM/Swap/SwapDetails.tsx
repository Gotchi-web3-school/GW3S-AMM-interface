import { Box, Flex, Text, Spacer, Image, useColorModeValue } from "@chakra-ui/react"
import { BiTrendingDown } from "react-icons/bi"
import { Percent } from "gotchiw3s-sdk"
import { useContext } from "react"
import { SwapContext } from "../../../Provider/SwapProvider"
import { calculFee } from "../../../Lib/Utils/swap"

const SwapDetails: React.FC = () => {
    const { trade, tokenA, tokenB } = useContext(SwapContext)
    return (
        <Box 
            flexDirection="column"
            bg={useColorModeValue("blackAlpha.200", "whiteAlpha.200")}
            mt="5"
            p="4" 
            border="1px solid white" 
            borderRadius={"3xl"} 
            justifyContent="center" 
            opacity={"0.9"} 
            boxShadow={useColorModeValue("inset 1px 1px 10px black" ,"inset 1px 1px 5px white")}
        >
            <Box>
                <Flex direction="row">
                    <Text>Minimum received</Text>
                    <Spacer />
                    <Flex>
                        <Text>{trade?.minimumAmountOut(new Percent("5", "1000")).toSignificant(5) ?? ""} {tokenB.token?.symbol ?? ""}</Text>
                        <Image  m="1" boxSize='17px' alignSelf={'center'} src={tokenB.logo}/>
                    </Flex>
                </Flex>

                <Flex direction="row">
                    <Text>Price Impact</Text>
                    <Spacer />
                    <Flex>
                        <Text>{trade?.priceImpact.toFixed(2) ?? ""}%</Text>
                        <Box m="1" color="red" alignSelf={"center"}>
                            <BiTrendingDown />
                        </Box>
                    </Flex>
                </Flex>
                
                <Flex direction="row">
                    <Text>Liquidity provider fee</Text>
                    <Spacer />
                    <Flex>
                        <Text>{trade ? calculFee(trade.inputAmount): ""} {tokenA.token?.symbol ?? ""}</Text>
                        <Image  m="1" boxSize='17px' alignSelf={'center'} src={tokenA.logo}/>
                    </Flex>
                </Flex>
            </Box>
        </Box>
    )
}

export default SwapDetails
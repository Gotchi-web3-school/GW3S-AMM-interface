import { Box, Flex, Text, Spacer, Image, useColorModeValue } from "@chakra-ui/react"
import { BiTrendingDown } from "react-icons/bi"
import { Percent } from "gotchiw3s-sdk"
import { useContext } from "react"
import { SwapContext } from "../../../Provider/SwapProvider"
import { calculFee, getColorPriceImpact } from "../../../Lib/Utils/swap"
import { QuestionIcon } from "@chakra-ui/icons"

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
                        <Text>
                            {parseFloat(trade?.minimumAmountOut(new Percent("5", "1000")).toSignificant(5) ?? "0") > 0 ?
                            trade?.minimumAmountOut(new Percent("5", "1000")).toFixed(2) :
                            trade?.minimumAmountOut(new Percent("5", "1000")).toSignificant(2)} {tokenB.token?.symbol ?? ""}
                        </Text>
                        {tokenB.logo ? <Image  m="1" boxSize='17px' alignSelf={'center'} src={tokenB.logo}/> : <QuestionIcon m="1"/>}
                    </Flex>
                </Flex>

                <Flex direction="row">
                    <Text>Price Impact</Text>
                    <Spacer />
                    <Flex>
                        <Text color={getColorPriceImpact(trade?.priceImpact.toFixed(2) ?? "0")}>{parseFloat(trade?.priceImpact.toSignificant(3) ?? "0") > parseFloat("0.3") ? trade?.priceImpact.toSignificant(3) : "<0.01"}%</Text>
                        <Box m="1" color="red" alignSelf={"center"}>
                            <BiTrendingDown />
                        </Box>
                    </Flex>
                </Flex>
                
                <Flex direction="row">
                    <Text>Liquidity provider fee</Text>
                    <Spacer />
                    <Flex>
                        <Text>{trade ? calculFee(trade.inputAmount) : ""} {tokenA.token?.symbol ?? ""}</Text>
                        {tokenA.logo ? <Image  m="1" boxSize='17px' alignSelf={'center'} src={tokenA.logo}/> : <QuestionIcon m="1"/>}
                    </Flex>
                </Flex>
            </Box>
        </Box>
    )
}

export default SwapDetails
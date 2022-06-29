import { useContext, useState } from "react";
import {
    Stack,
    Button,
    Box,
    Center,
    Spacer,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
import { ArrowDownIcon, RepeatIcon } from "@chakra-ui/icons";
import { SwapContext } from "../../../Provider/SwapProvider";
import InputSwapA from "./InputSwapA"
import InputSwapB from "./InputSwapB"
import SwapDetails from "./SwapDetails";
import SwapButton from "./SwapButton";
import ConnectorButton from "../../Buttons/ConnectorButton";

const Swap: React.FC = () => {
    const [quote, setQuote] = useState(true)
    const { route, dispatch, trade, input, isPool } = useContext(SwapContext)
    const color = useColorModeValue("black", "white")
    
    return (
      <Box>
        <InputSwapA />
          <Center m={-4} zIndex={2}>
            <Button onClick={() => dispatch({type: "SWAP"})} bg={useColorModeValue("white", "gray.900")}  border="1px solid" borderColor="gray.700" _hover={{bg: useColorModeValue("gray.200" ,"purple.800"),}} p="3">
              <ArrowDownIcon  />
            </Button>
          </Center>
        <InputSwapB />
        <Box m="4">
          <Stack direction={'row'} >
            {trade &&
            <>
            <Text fontSize="sm" fontWeight="bold">Price</Text>
            <Spacer />
              {quote ? 
              <Text fontSize="sm" >{
                `${parseFloat(route?.midPrice.toFixed(2) ?? "0") < 1 ?
                              route?.midPrice.toSignificant(2) : 
                              route?.midPrice.toFixed(2)} 
                ${route?.output.symbol} per ${route?.input.symbol}`}
              </Text> 
              :
              <Text fontSize="sm" >{
                `${parseFloat(route?.midPrice.invert().toFixed(2) ?? "0") < 1 ?
                              route?.midPrice.invert().toSignificant(2) : 
                              route?.midPrice.invert().toFixed(2)} 
                ${route?.input.symbol} per ${route?.output.symbol}`}
              </Text> 
              }
              <button onClick={() => setQuote(!quote)}><RepeatIcon color={color} /></button>
            </>
            }
          </Stack>
          <Stack direction={'row'} mr="6" >
            {trade &&
            <>
            <Text fontSize="sm" fontWeight="bold">next Price</Text>
            <Spacer />
              {quote ? 
                <Text fontSize="sm" >{
                  `${parseFloat(trade.nextMidPrice.toFixed(2) ?? "0") < 1 ?
                                trade.nextMidPrice.toSignificant(2) : 
                                trade.nextMidPrice.toFixed(2)} 
                  ${route?.output.symbol} per ${route?.input.symbol}`}
                </Text> 
                :
                <Text fontSize="sm" >{
                  `${parseFloat(trade.nextMidPrice.invert().toFixed(2) ?? "0") < 1 ?
                                trade.nextMidPrice.invert().toSignificant(2) : 
                                trade.nextMidPrice.invert().toFixed(2)} 
                  ${route?.input.symbol} per ${route?.output.symbol}`}
                </Text> 
              }
            </>
            }
          </Stack>
        </Box>
        
        <ConnectorButton>
          <SwapButton /> 
        </ConnectorButton>

        {isPool && parseFloat(input.input ?? '0') > 0 && <SwapDetails />}
      </Box>
    )
}

export default Swap
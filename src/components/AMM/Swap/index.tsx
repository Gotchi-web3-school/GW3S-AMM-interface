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
import SwapDetails from "./Analytics";
import SwapButton from "./SwapButton";

const Swap: React.FC = () => {
    const [quote, setQuote] = useState(true) 
    const { route, dispatch, trade } = useContext(SwapContext)
    const color = useColorModeValue("black", "white")
    
    return (
      <Box overflow={"scroll"} >
        <InputSwapA />
          <Center m={-4} zIndex={2}>
            <Button onClick={() => dispatch({type: "SWAP"})} bg={useColorModeValue("white", "gray.900")}  border="1px solid" borderColor="gray.700" _hover={{bg: useColorModeValue("gray.200" ,"purple.800"),}} p="3">
              <ArrowDownIcon  />
            </Button>
          </Center>
        <InputSwapB />
        <Box m="4">
          <Stack direction={'row'} >
            <Text fontSize="sm" fontWeight="bold">Price</Text>
            <Spacer />
            {route &&
            <>
              {quote ? 
              <Text fontSize="sm" >{`${route?.midPrice.toSignificant(5)} ${route?.output.symbol} per ${route?.input.symbol}`}</Text> :
              <Text fontSize="sm" >{`${route?.midPrice.invert().toSignificant(5)} ${route?.input.symbol} per ${route?.output.symbol}`}</Text>
              }
              <button onClick={() => setQuote(!quote)}><RepeatIcon color={color} /></button>
            </>
            }
          </Stack>
          <Stack direction={'row'} >
            <Text fontSize="sm" fontWeight="bold">next Price</Text>
            <Spacer />
            {trade &&
            <>
              {quote ? 
                <Text fontSize="sm" pr="6" >{`${trade.nextMidPrice.toSignificant(5)} ${route?.output.symbol} per ${route?.input.symbol}`}</Text> :
                <Text fontSize="sm" pr="6" >{`${trade.nextMidPrice.invert().toSignificant(5)} ${route?.input.symbol} per ${route?.output.symbol}`}</Text>
              }
            </>
            }
          </Stack>
        </Box>

        <SwapButton />
        
        {trade && <SwapDetails />}
      </Box>
    )
}

export default Swap
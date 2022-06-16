import { useContext } from "react";
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
  import InputSwapA from "./InputSwapA"
  import InputSwapB from "./InputSwapB"
import { SwapContext } from "../../../Provider/SwapProvider";

const Swap: React.FC = () => {
    const {route, pair } = useContext(SwapContext)
    console.log(pair)
    return (
      <Box overflow={"scroll"} >
        <InputSwapA />
          <Center m={-4} zIndex={2}>
            <Button bg={useColorModeValue("white", "gray.900")}  border="1px solid" borderColor="gray.700" _hover={{bg: useColorModeValue("gray.200" ,"purple.800"),}} p="3">
              <ArrowDownIcon  />
            </Button>
          </Center>
        <InputSwapB />

        <Stack direction={'row'} m="4" >
          <Text fontSize="sm" fontWeight="bold">Price</Text>
          <Spacer />
         {route && <Text fontSize="sm" >{`${route?.midPrice.toSignificant(2)} ${route?.input.symbol} per ${route?.output.symbol}`}</Text>}
          <button><RepeatIcon color={useColorModeValue("black", "white")} /></button>
        </Stack>

        <Stack direction={'row'} m="4" >
          <Button w="100%" h="3rem">Approve</Button>
          <Button w="100%" h="3rem">Swap</Button>
        </Stack>
      </Box>
    )
}

export default Swap
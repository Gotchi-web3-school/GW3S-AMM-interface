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
  import InputSwap from "../InputToken"

const Swap: React.FC = () => {
    return (
      <Box >
        <InputSwap idx={0} />
          <Center m={-4} zIndex={2}>
            <Button bg={useColorModeValue("white", "gray.900")}  border="1px solid" borderColor="gray.700" _hover={{bg: useColorModeValue("gray.200" ,"purple.800"),}} p="3">
              <ArrowDownIcon  />
            </Button>
          </Center>
        <InputSwap idx={1} />

        <Stack direction={'row'} m="4" >
          <Text fontSize="sm" fontWeight="bold">Price</Text>
          <Spacer />
          <Text fontSize="sm" >20 nana per nana</Text>
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
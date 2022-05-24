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
        <InputSwap />
          <Center m={-4} zIndex={2}>
            <Button  border="2px solid" borderColor="gray.700" bg="gray.900" _hover={{bg: "purple.800",}} p="3">
              <ArrowDownIcon  />
            </Button>
          </Center>
        <InputSwap />

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
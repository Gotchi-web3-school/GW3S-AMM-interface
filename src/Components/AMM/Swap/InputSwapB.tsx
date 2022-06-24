import { useContext } from "react"
import { Box, Text, Button, Input, Image, Flex, Stack, Spacer, useColorModeValue, useDisclosure} from "@chakra-ui/react"
import { ArrowDownIcon, QuestionIcon } from "@chakra-ui/icons"
import ModalSwap from "../../Modal/ModalSwap"
import { SwapContext } from "../../../Provider/SwapProvider"

const InputSwapB : React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {tokenB, output, dispatch} = useContext(SwapContext)
  const color = useColorModeValue("black", "white")

  return (
    <>
    <ModalSwap isOpen={isOpen} onClose={onClose} idx={1} />
    <Box
      p="1rem"
      border={"1px"}
      borderRadius={"3xl"}
      borderColor={"gray.700"}>
        <Stack direction="row">
          <Text mb="2" textAlign="left">
            To
          </Text>
          <Spacer />
          <Text fontSize="xs" mb="2" textAlign="left">
          {`Balance: ${tokenB.balance.amount?.toFixed(2) ?? '-'}`}
          </Text>
        </Stack>
        <Stack spacing="6">
          <Flex color="white">
            <Input
              variant="unstyled"
              name="from"
              type="number"
              min={0}
              max={tokenB.balance.amount?.toExact()}
              placeholder="0.0"
              mr="5px"
              fontSize="2xl"
              fontWeight="bold"
              color={useColorModeValue("gray.900", "white")}
              id="swap"
              value={output.input ?? ""}
              onChange={(e) => dispatch({type: "HANDLE_INPUT_B", payload: e.target.value})}
              required
            />
            <Button
              onClick={() => dispatch({type: "HANDLE_INPUT_B", payload: tokenB.balance?.amount?.toExact() ?? '0'})} 
              size={"sm"} 
              bg="blue.500" 
              mt="1" 
              mr="3">
              Max
            </Button>

            {tokenB.token ?
              <Button color={color} onClick={onOpen} size="sm" p="5">
                {tokenB.logo ? <Image mx="2" borderRadius='full' boxSize="25px" src={tokenB.logo}/> : <QuestionIcon mx="2" color={color} />}
                {tokenB.token?.symbol ?? ''}
                <ArrowDownIcon mx="2" />
              </Button>
              :
              <Button bg="blue.500" onClick={onOpen}><Text px="5" fontSize={"sm"} >Select<ArrowDownIcon ml="2" /></Text></Button>
            }
          </Flex>
        </Stack>
    </Box>
    </>
  )
}

export default InputSwapB
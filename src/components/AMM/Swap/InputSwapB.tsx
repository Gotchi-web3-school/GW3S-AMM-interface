import { useState, useContext } from "react"
import { Box, Text, Button, Input, Image, Flex, Stack, Spacer, useColorModeValue, useDisclosure} from "@chakra-ui/react"
import { ArrowDownIcon, QuestionOutlineIcon } from "@chakra-ui/icons"
import ModalSwap from "../../Modal/ModalSwap"
import { SwapContext } from "../../../Provider/SwapProvider"

const InputSwapB : React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [tokenAmount, setTokenAmount] = useState<string>("")
  const {tokenB, dispatch} = useContext(SwapContext)
  const color = useColorModeValue("black", "white")

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTokenAmount(e.target.value)
  }

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
              placeholder="0.0"
              mr="5px"
              fontSize="2xl"
              fontWeight="bold"
              color={useColorModeValue("gray.900", "white")}
              id="swap"
              value={tokenAmount}
              onChange={onChange}
              required
            />
            <Button
              onClick={() => dispatch({type: "HANDLE_INPUTS", payload: {id: 0, amount: tokenB.balance?.amount}})} 
              size={"sm"} 
              bg="blue.500" 
              mt="1" 
              mr="3">
              Max
            </Button>

            {tokenB.token ?
              <Button color={color} onClick={onOpen} size="sm" p="5">
                {tokenB.logo ? <Image mx="2" borderRadius='full' boxSize="25px" src={tokenB.logo}/> : <QuestionOutlineIcon mx="2" color={color} />}
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
import { useState, useContext } from "react"
import { Box, Text, Button, Input, Flex, Stack, Spacer, useColorModeValue, useDisclosure} from "@chakra-ui/react"
import { ArrowDownIcon, QuestionOutlineIcon } from "@chakra-ui/icons"
import ModalTokens from "../../Modal/ModalToken"
import { SwapContext } from "../../../Provider/SwapProvider"

const InputSwapB : React.FC<{idx: number}> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [tokenAmount, setTokenAmount] = useState<string>("")
  const {tokenB} = useContext(SwapContext)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTokenAmount(e.target.value)
  }

  return (
    <>
    <ModalTokens isOpen={isOpen} onClose={onClose} idx={1} />
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
            Balance:
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
              color={useColorModeValue("gray.900", "white")}
              onClick={onOpen}
              size="sm"
            >
              <QuestionOutlineIcon mx="2" color={useColorModeValue("black", "white")} />
              {}
              <ArrowDownIcon mx="2" />
            </Button>
          </Flex>
        </Stack>
    </Box>
    </>
  )
}

export default InputSwapB
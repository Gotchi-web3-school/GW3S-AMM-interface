import { useState, useContext } from "react"
import { AddLiquidityContext } from "../../../Provider/AddLiquidityProvider"
import { Box, Text, Button, Input, Image, Flex, Stack, Spacer, useColorModeValue, useDisclosure} from "@chakra-ui/react"
import { ArrowDownIcon, QuestionOutlineIcon } from "@chakra-ui/icons"
import ModalTokens from "../../Modal/ModalToken"

const InputToken0 : React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [tokenAmount, setTokenAmount] = useState<string>("")
  const { token0, token0Logo, token0Balance } = useContext(AddLiquidityContext)
  const color = useColorModeValue("black", "white")

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTokenAmount(e.target.value)
  }

  return (
    <>
    <ModalTokens isOpen={isOpen} onClose={onClose} idx={0} />
    <Box
      p="1rem"
      border={"1px"}
      borderRadius={"3xl"}
      borderColor={"gray.700"}>
        <Stack direction="row">
          <Text mb="2" textAlign="left">
            Token 0
          </Text>
          <Spacer />
          <Text fontSize="xs" mb="2" textAlign="left">
            Balance: {token0Balance}
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
            {token0 ?
            <Button color={color} onClick={onOpen} size="sm" p="5">
              {token0Logo ? <Image mx="2" borderRadius='full' boxSize="25px" src={token0Logo}/> : <QuestionOutlineIcon mx="2" color={color} />}
              {token0?.symbol ?? ''}
              <ArrowDownIcon mx="2" />
            </Button>
            :
            <Button bg="blue.500" onClick={onOpen}><Text px="5" >Select a token<ArrowDownIcon ml="2" /></Text></Button>
            } 
          </Flex>
        </Stack>
    </Box>
    </>
  )
}

export default InputToken0
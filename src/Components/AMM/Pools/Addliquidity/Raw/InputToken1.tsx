import { useContext } from "react"
import { Box, Text, Button, Input, Image, Flex, Stack, Spacer, useColorModeValue, useDisclosure} from "@chakra-ui/react"
import { ArrowDownIcon, QuestionOutlineIcon } from "@chakra-ui/icons"
import { AddLiquidityContext } from "../../../../../Provider/AddLiquidityProvider"
import ModalTokens from "../../../../Modal/ModalToken"

const InputToken1: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {token1, token1Logo, token1Balance, token1Amount, dispatch} = useContext(AddLiquidityContext)
  const color = useColorModeValue("black", "white")

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
            Token B
          </Text>
          <Spacer />
          <Text fontSize="xs" mb="2" textAlign="left">
            Balance: {token1Balance?.toFixed(2) ?? '-'}
          </Text>
        </Stack>
        <Stack spacing="6">
          <Flex color="white">
            <Input
              mr="5px"
              fontSize="2xl"
              fontWeight="bold"
              min={0}
              variant="unstyled"
              name="from"
              type="number"
              placeholder="0.0"
              color={useColorModeValue("gray.900", "white")}
              id="swap"
              value={token1Amount?.toExact() ?? ''}
              onChange={e =>  dispatch({type: "HANDLE_INPUTS", payload: {id: 1, amount: e.target.value}})}
              required
            />
            <Button onClick={() => dispatch({type: "HANDLE_INPUTS", payload: {id: 1, amount: token1Balance?.toFixed(0) ?? "0"}})} size={"sm"} bg="blue.500" mt="1" mr="3">Max</Button>
            {token1 ?
            <Button color={color} onClick={onOpen} size="sm" p="5">
              {token1Logo ? <Image mx="2" borderRadius='full' boxSize="25px" src={token1Logo}/> : <QuestionOutlineIcon mx="2" color={color} />}
              {token1?.symbol ?? ''}
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

export default InputToken1
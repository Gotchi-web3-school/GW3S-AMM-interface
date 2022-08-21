import { useContext } from "react"
import { AddLiquidityContext } from "../../../../../Provider/AMM/AddLiquidityProvider"
import { Box, Text, Button, Input, Image, Flex, Stack, Spacer, useColorModeValue, useDisclosure} from "@chakra-ui/react"
import { ArrowDownIcon, QuestionOutlineIcon } from "@chakra-ui/icons"
import ModalTokens from "../../../../Modal/ModalToken"

const InputToken0 : React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { token0, token0Logo, token0Balance, token0Amount, dispatch } = useContext(AddLiquidityContext)
  const color = useColorModeValue("black", "white")

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
            Token A
          </Text>
          <Spacer />
          <Text fontSize="xs" mb="2" textAlign="left">
            Balance: {token0Balance?.toFixed(2) ?? '-'}
          </Text>
        </Stack>
        <Stack spacing="6">
          <Flex color="white">
            <Input
              mr="5px"
              fontSize="2xl"
              fontWeight="bold"
              variant="unstyled"
              min={0}
              name="from"
              type="number"
              placeholder="0.0"
              color={useColorModeValue("gray.900", "white")}
              id="swap"
              value={token0Amount?.toExact() ?? ''}
              onChange={e => dispatch({type: "HANDLE_INPUTS", payload: {id: 0, amount: e.target.value}})}
              required
            />
            <Button 
              onClick={() => dispatch({type: "HANDLE_INPUTS", payload: {id: 0, amount: token0Balance?.toFixed(0) ?? "0"}})} 
              size={"sm"} 
              bg="blue.500" 
              mt="1" 
              mr="3">
              Max
            </Button>

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
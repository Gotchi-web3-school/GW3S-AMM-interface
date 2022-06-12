import { Box, Text, Button, Input, Image, Flex, Stack, Spacer, useColorModeValue} from "@chakra-ui/react"
import { QuestionOutlineIcon } from "@chakra-ui/icons"
import { TokenPool } from "../../../../Models"
import React from "react"

const InputToken : React.FC<{token: TokenPool, dispatch: React.Dispatch<any>}> = ({token, dispatch}) => {
  const color = useColorModeValue("black", "white")

  return (
    <>
    <Box
      p="1rem"
      border={"1px"}
      borderRadius={"3xl"}
      borderColor={"gray.700"}>
        <Stack direction="row">
          <Text mb="2" textAlign="left">
            Token {token.id === 0 ? 'A' : 'B'}
          </Text>
          <Spacer />
          <Text fontSize="xs" mb='2' textAlign="left">
            Balance: {token.balance?.toFixed(2) ?? '-'}
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
              value={token.input?.toExact() ?? ''}
              onChange={e => dispatch({type: "HANDLE_INPUTS", payload: {id: token.id, amount: e.target.value}})}
              required
            />
            <Button 
              onClick={() => dispatch({type: "HANDLE_INPUTS", payload: {id: token.id, amount: token.balance?.toFixed(0) ?? "0"}})} 
              size={"sm"} 
              bg="blue.500" 
              mt="1" 
              mr="3">
              Max
            </Button>

            <Button color={color} size="sm" p="5">
              {token.logo ? <Image borderRadius='full' boxSize="25px" src={token.logo}/> : <QuestionOutlineIcon mx="2" color={color} />}
              {token.token.symbol ?? ''}
            </Button>
          </Flex>
        </Stack>
    </Box>
    </>
  )
}

export default InputToken
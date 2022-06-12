import { Box, Input, Flex, Stack, useColorModeValue} from "@chakra-ui/react"
import { TokenPool } from "../../../../Models"
import React from "react"
import MaxButton from "./MaxButton"

const InputToken : React.FC<{token: TokenPool, dispatch: React.Dispatch<any>}> = ({token, dispatch}) => {
  //const color = useColorModeValue("black", "white")

  return (
    <>
    <Box
      p="1rem"
      border={"1px"}
      borderRadius={"3xl"}
      borderColor={"gray.700"}>
        <Stack spacing="6">
          <Flex color="white">
            {token.id === 0 && <MaxButton token={token} dispatch={dispatch}/>}
            <Input
              mr="5px"
              fontSize="xl"
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
            {token.id === 1 && <MaxButton token={token} dispatch={dispatch}/>}
          </Flex>
        </Stack>
    </Box>
    </>
  )
}

export default InputToken
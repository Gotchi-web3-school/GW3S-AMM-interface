import { Box, Text, Button, Input, Flex, Stack, Spacer, useColorModeValue } from "@chakra-ui/react"
import { ArrowDownIcon, QuestionOutlineIcon } from "@chakra-ui/icons"

const InputSwap: React.FC = () => {
  return (
    <Box
      p="1rem"
      border={"1px"}
      borderRadius={"3xl"}
      borderColor={"gray.700"}>
        <Stack direction="row">
          <Text mb="2" textAlign="left">
            From
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
              value={0}
              id="swap"
              required
            />
            <Button
              color={useColorModeValue("gray.900", "white")}
              size="sm"
            >
              <QuestionOutlineIcon mx="2" color={useColorModeValue("black", "white")} />
              ETH
              <ArrowDownIcon mx="2" />
            </Button>
          </Flex>
        </Stack>
    </Box>
  )
}

export default InputSwap
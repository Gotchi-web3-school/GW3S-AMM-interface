import { Box, Flex, Text, Spacer, Divider, useColorModeValue } from "@chakra-ui/react"
import Route from "./Route"

const Analytics: React.FC = () => {
    return (
        <Box 
            flexDirection="column"
            bg={useColorModeValue("gray.200", "gray.700")}
            mx={"auto"}
            mt={-2}
            px={{ base: 2, sm: 5, md: 17 }}
            rounded="xl"
            zIndex={0}
            shadow="lg">
            <Box py='2vh' w="20rem">
                <Flex direction="row">
                    <Text>Minimum received</Text>
                    <Spacer />
                    <Text>45</Text>
                </Flex>

                <Flex direction="row">
                    <Text>Price Impact</Text>
                    <Spacer />
                    <Text>45</Text>
                </Flex>
                
                <Flex direction="row">
                    <Text>Liquidity provider fee</Text>
                    <Spacer />
                    <Text>45</Text>
                </Flex>
            </Box>
            <Divider />
            <Route />
        </Box>
    )
}

export default Analytics
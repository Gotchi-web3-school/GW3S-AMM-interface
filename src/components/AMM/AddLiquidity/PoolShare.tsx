import { Text, Stack, Box, Center, Spacer } from "@chakra-ui/react"

const PoolShare: React.FC = () => {
    return (
        <Box
            mt="2rem"
            border={"1px"}
            borderRadius={"3xl"}
            borderColor={"gray.700"}>
            <Text p="3">Initial prices and pool share</Text>
            <Stack 
                direction={"row"}  
                p="1rem"
                border={"1px"}
                borderRadius={"3xl"}
                borderColor={"gray.700"} 
                justifyContent="center">
                <Box>
                    <Center>
                        <Text>10</Text>
                    </Center>
                    <Text fontSize="sm">DAI per MATIC</Text>
                </Box>
                <Spacer />
                <Box>
                    <Center>
                        <Text>0.1</Text>
                    </Center>
                    <Text fontSize="sm">MATIC per DAI</Text>
                </Box>
                <Spacer />
                <Box>
                    <Center>
                        <Text>10%</Text>
                    </Center>
                    <Text fontSize="sm">Share of pool</Text>
                </Box>
            </Stack>
        </Box>
    )
}

export default PoolShare
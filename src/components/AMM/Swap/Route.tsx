import { Box, Text, Wrap } from "@chakra-ui/react"

const Route: React.FC = () => {
    return (
        <Box py='2vh'>
            <Text>Route</Text>
            <Wrap spacing='30px' align='center' borderWidth='1px' borderColor="grey.200" borderRadius='full'>
                {/* Token.map toute la route */}
            </Wrap>
        </Box>
    )
}

export default Route
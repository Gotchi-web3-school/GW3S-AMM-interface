import { Box, Container, Text, Center, Button, useColorModeValue } from "@chakra-ui/react"

const MaticFaucet: React.FC = () => {
   return (
        <Box ml="1rem" maxW='md' borderWidth='1px' borderRadius='lg' boxShadow={useColorModeValue("0 0 10px 1px black", "0 0 10px 1px white")}>
            <Container p='0.5rem' textAlign={'center'}>
                <p>👇 Don't have MATIC ? Get some here 👇</p>
                <Center m={'0.5rem'}>
                <Button as='a' href="https://mumbaifaucet.com/" target="_blank">Get 1 MATIC</Button>
                </Center>
                <Text fontSize={"sm"} fontStyle="italic">Since transaction requiert to pay gas fees you will need some MATIC token in your wallet to interact with them.</Text>
            </Container>
        </Box>
   )
}

export default MaticFaucet
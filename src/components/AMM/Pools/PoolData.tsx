import { SimpleGrid, Text, HStack, Button, Spacer, Image } from "@chakra-ui/react"
import { QuestionOutlineIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Pool } from "../../../Models"

const PoolData: React.FC<{pool: Pool, setState: React.Dispatch<string>}> = ({pool, setState}) => {
    return ( 
    <>
        <SimpleGrid columns={2} spacing={3}>
            <Text textAlign={"left"}>Your pooled tokens:</Text><Text textAlign={"right"}>195 </Text>
            <Text textAlign={"left"}>Pooled tokenA:</Text><Text textAlign={"right"}>195 {pool.logoURI?.tokenA ? <Image display={"initial"} borderRadius='full' boxSize='20px' src={pool.logoURI.tokenA} alt={pool.pair.token0.name}/> : <QuestionOutlineIcon />}</Text>
            <Text textAlign={"left"}>Pool tokenB:</Text><Text textAlign={"right"}>195 {pool.logoURI?.tokenB ? <Image display={"initial"} borderRadius='full' boxSize='20px' src={pool.logoURI.tokenB} alt={pool.pair.token1.name}/> : <QuestionOutlineIcon />}</Text>
            <Text textAlign={"left"}>Your pool share</Text><Text textAlign={"right"}>10%</Text>
        </SimpleGrid>
         <HStack m="5" mt="5rem">
            <Button w="45%" pl="0" bgGradient='linear(to-r, green.500, transparent)' _hover={{bg: 'green.500'}} justifyContent={"left"} onClick={() => setState("add")}>
                <Text fontSize={"sm"}><ChevronLeftIcon />Add liquidity</Text>
            </Button>
            <Spacer />
            <Button w="45%" pr="0" bgGradient='linear(to-l, red.500, transparent)' _hover={{bg: 'red.500'}} justifyContent={"right"} onClick={() => setState("remove")}>
                <Text fontSize={"sm"}>Remove liquidity<ChevronRightIcon /></Text>
            </Button>
        </HStack>
    </>
    )
}

export default PoolData
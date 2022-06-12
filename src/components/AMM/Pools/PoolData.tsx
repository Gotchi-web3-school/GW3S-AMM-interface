import { SimpleGrid, Text, Flex, HStack, Button, Spacer, Image } from "@chakra-ui/react"
import { QuestionOutlineIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { IPool } from "../../../Models"

const PoolData: React.FC<{pool: IPool, setState: React.Dispatch<string>}> = ({pool, setState}) => {
    return ( 
    <>
        <SimpleGrid columns={2} spacing={3}>
            <Text textAlign={"left"}>Your pooled tokens:</Text><Text textAlign={"right"}>{pool?.balance ?? "0"}</Text>
            <Text textAlign={"left"}>Pooled tokenA:</Text>
            <Flex justifyContent={"right"}>
                <Text textAlign={"right"}>{pool?.tokenA?.pooled ?? "0"}</Text>
                {pool.tokenA.logo ? <Image ml="2" display={"initial"} borderRadius='full' boxSize='20px' src={pool.tokenA.logo} alt={pool.pair.token0.name}/> : <QuestionOutlineIcon />}
            </Flex>
            <Text textAlign={"left"}>Pooled tokenB:</Text>
            <Flex justifyContent={"right"}>
                <Text textAlign={"right"}>{pool?.tokenB?.pooled ?? "0"}</Text>
                {pool.tokenB.logo  ? <Image ml="2" display={"initial"} borderRadius='full' boxSize='20px' src={pool.tokenB.logo} alt={pool.pair.token1.name}/> : <QuestionOutlineIcon />}
            </Flex>
            <Text textAlign={"left"}>Your pool share</Text><Text textAlign={"right"}>{pool?.share.toSignificant(2) ?? "0"}%</Text>
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
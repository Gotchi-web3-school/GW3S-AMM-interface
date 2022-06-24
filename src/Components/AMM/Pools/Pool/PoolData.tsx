import { SimpleGrid, Text, Flex, HStack, Button, Spacer, Image, Box, Container, } from "@chakra-ui/react"
import { QuestionOutlineIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { IPool } from "../../../../Models"
import { motion } from "framer-motion"

const PoolData: React.FC<{pool: IPool, setState: React.Dispatch<string>}> = ({pool, setState}) => {
    const {tokenA, tokenB, pair, totalReserves} = pool
    
    return ( 
    <Box
    as={motion.div}
    initial={{ x: 30, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -30, opacity: 0 }}
    >
        <Container centerContent={true}>
            <Text mt="-4" mb="1" alignSelf={"center"} fontWeight={"bold"} mx="6" fontSize={"lg"}>Total in pool</Text>
            <Flex>
                <Box>
                    <Text fontSize={"xl"} fontWeight={"bold"} fontStyle={"italic"}>{totalReserves.tokenA.lessThan("1") ? totalReserves.tokenA.toSignificant(18) : totalReserves.tokenA.toFixed(2)}</Text>
                    <Text fontSize={"xs"}>{tokenA.token.symbol}</Text>
                </Box>
                <Box  ml="4rem" >
                    <Text fontSize={"xl"} fontWeight={"bold"} fontStyle={"italic"}>{totalReserves.tokenB.lessThan("1") ? totalReserves.tokenB.toSignificant(18) : totalReserves.tokenB.toFixed(2)}</Text>
                    <Text fontSize={"xs"}>{tokenB.token.symbol}</Text>
                </Box>
            </Flex>
        </Container>

        <SimpleGrid 
        columns={2} 
        spacing={3} 
        borderRadius={"3xl"} 
        mx="4" 
        p="5"
        >
            <Text textAlign={"left"}>Your LP tokens:</Text>
            <Flex justifyContent={"right"}>
                <Text position={"relative"} left="12px" textAlign={"right"} fontWeight="bold">{pool?.lpToken.balance?.toFixed(2) ?? "0"}</Text>
                {tokenA.logo ? <Image zIndex={1} position={"relative"} left="20px" borderRadius='full' boxSize='20px' src={tokenA.logo} alt={pair.token0.name}/> : <QuestionOutlineIcon zIndex={1} position={"relative"} left="15px"/>}
                {tokenB.logo  ? <Image position={"relative"} left="10px" borderRadius='full' boxSize='20px' src={tokenB.logo} alt={pair.token1.name}/> : <QuestionOutlineIcon position={"relative"} left="10px"/>}
            </Flex>

            <Text textAlign={"left"}>Pooled tokenA:</Text>
            <Flex justifyContent={"right"}>
                <Text textAlign={"right"} fontWeight="bold">{pool?.tokenA?.pooled.toSignificant(3) ?? "0"}</Text>
                {tokenA.logo ? <Image ml="2" display={"initial"} borderRadius='full' boxSize='20px' src={tokenA.logo} alt={pair.token0.name}/> : <QuestionOutlineIcon ml="2"/>}
            </Flex>

            <Text textAlign={"left"}>Pooled tokenB:</Text>
            <Flex justifyContent={"right"}>
                <Text textAlign={"right"} fontWeight="bold">{pool?.tokenB?.pooled.toSignificant(3) ?? "0"}</Text>
                {tokenB.logo  ? <Image ml="2" display={"initial"} borderRadius='full' boxSize='20px' src={tokenB.logo} alt={pair.token1.name}/> : <QuestionOutlineIcon ml="2"/>}
            </Flex>

            <Text textAlign={"left"} >Your pool share</Text><Text textAlign={"right"} fontWeight="bold">{pool?.lpToken.share.toSignificant(2) ?? "0"}%</Text>
        </SimpleGrid>

        <HStack m="5">
            <Button w="45%" pl="0" bgGradient={'linear(to-r, green.500, transparent)'} _hover={{bg: 'green.500'}} justifyContent={"left"} onClick={() => setState("add")}>
                <Text fontSize={"sm"}><ChevronLeftIcon />Add liquidity</Text>
            </Button>
            <Spacer />
            <Button w="45%" pr="0" bgGradient='linear(to-l, red.500, transparent)' _hover={{bg: 'red.500'}} justifyContent={"right"} onClick={() => setState("remove")}>
                <Text fontSize={"sm"}>Remove liquidity<ChevronRightIcon /></Text>
            </Button>
        </HStack>
    </Box>
    )
}

export default PoolData
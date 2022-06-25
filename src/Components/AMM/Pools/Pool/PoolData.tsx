import { SimpleGrid, Text, Flex, HStack, Button, Spacer, Image, Box, Container, Spinner, } from "@chakra-ui/react"
import { QuestionIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { motion } from "framer-motion"
import { PoolCardContextType } from "../../../../Models"

const PoolData: React.FC<{context: PoolCardContextType}> = ({context}) => {
    const { pool, setState } = context
    const {tokenA, tokenB, pair, totalReserves, isFetchingPool} = context.pool
    
    return ( 
    <Box
    as={motion.div}
    initial={{ x: 30, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -30, opacity: 0 }}
    mx="2"
    >
        <Container mt="-2" centerContent={true} border="0.5px solid gray" rounded="2xl" p="2" >
            <Text mb="1" alignSelf={"center"} fontWeight={"bold"} fontSize={"lg"}>Total in pool</Text>
            <Flex>
                <Box>
                    <Text fontSize={"xl"} fontWeight={"bold"} fontStyle={"italic"}>
                        {isFetchingPool ? <Spinner /> : totalReserves.tokenA.lessThan("1") ?
                                                        totalReserves.tokenA.toSignificant(18) : 
                                                        totalReserves.tokenA.toFixed(2)
                        }
                    </Text>
                    <Text fontSize={"xs"}>{tokenA.token.symbol}</Text>
                </Box>
                <Box  ml="4rem" >
                    <Text fontSize={"xl"} fontWeight={"bold"} fontStyle={"italic"}>
                        {isFetchingPool ? <Spinner /> : totalReserves.tokenB.lessThan("1") ? 
                                                        totalReserves.tokenB.toSignificant(18) : 
                                                        totalReserves.tokenB.toFixed(2)
                        }
                    </Text>
                    <Text fontSize={"xs"}>{tokenB.token.symbol}</Text>
                </Box>
            </Flex>
        </Container>

        <SimpleGrid columns={2} spacing={3} borderRadius={"3xl"} mx="1" p="5">
            <Text textAlign={"left"}>Your LP tokens:</Text>
            <Flex justifyContent={"right"}>
                <Text position={"relative"} left="12px" textAlign={"right"} fontWeight="bold">
                    {isFetchingPool ? <Spinner /> : parseFloat(pool?.lpToken.balance?.toFixed(2) ?? "0") < 1 ? 
                                                    pool?.lpToken.balance?.toSignificant(2) : 
                                                    pool?.lpToken.balance?.toFixed(2)
                    }
                </Text>
                {tokenA.logo ? 
                    <Image 
                    zIndex={1} 
                    position={"relative"} 
                    left="20px" 
                    borderRadius='full' 
                    boxSize='20px' 
                    src={tokenA.logo} 
                    alt={pair.token0.name}/> 
                    : 
                    <QuestionIcon zIndex={1} position={"relative"} left="15px"/>
                }
                {tokenB.logo  ? 
                    <Image 
                    position={"relative"} 
                    left="10px" 
                    borderRadius='full' 
                    boxSize='20px' 
                    src={tokenB.logo} 
                    alt={pair.token1.name}/> 
                    : 
                    <QuestionIcon position={"relative"} left="10px"/>}
            </Flex>

            <Text textAlign={"left"}>Pooled tokenA:</Text>
            <Flex justifyContent={"right"}>
                <Text textAlign={"right"} fontWeight="bold">
                {isFetchingPool ? <Spinner /> : parseFloat(pool?.tokenA.pooled?.toFixed(2) ?? "0") < 1 ? 
                                                pool?.tokenA.pooled?.toSignificant(2) : 
                                                pool?.tokenA.pooled?.toFixed(2)
                }
                </Text>
                {tokenA.logo ? 
                    <Image ml="2" display={"initial"} borderRadius='full' boxSize='20px' src={tokenA.logo} alt={pair.token0.name}/> : 
                    <QuestionIcon ml="2"/>
                }
            </Flex>

            <Text textAlign={"left"}>Pooled tokenB:</Text>
            <Flex justifyContent={"right"}>
                <Text textAlign={"right"} fontWeight="bold">
                    {isFetchingPool ? <Spinner /> : parseFloat(pool?.tokenB.pooled?.toFixed(2) ?? "0") < 1 ? 
                                                    pool?.tokenB.pooled?.toSignificant(2) : 
                                                    pool?.tokenB.pooled?.toFixed(2)
                    }
                </Text>
                {tokenB.logo  ? <Image ml="2" display={"initial"} borderRadius='full' boxSize='20px' src={tokenB.logo} alt={pair.token1.name}/> : <QuestionIcon ml="2"/>}
            </Flex>

            <Text textAlign={"left"} >Your pool share</Text>
            <Text textAlign={"right"} fontWeight="bold">
                {isFetchingPool ? <Spinner mr="3"/> : pool?.lpToken.share.toSignificant(2) ?? "0"}%
            </Text>
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
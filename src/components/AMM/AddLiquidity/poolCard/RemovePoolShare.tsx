import React from "react"
import { Text, Flex, Image, HStack, Box, Input } from "@chakra-ui/react"
import { QuestionOutlineIcon, ArrowRightIcon } from "@chakra-ui/icons"
import { IPool } from "../../../../Models"

const RemovePoolShare: React.FC<{pool: IPool, dispatch: React.Dispatch<any>}> = ({pool, dispatch}) => {
    const { tokenA, tokenB, balance} = pool
    console.log(tokenA.pooled)
    
    return (
        <HStack my="7" mx="4" border="1px solid white" p="5" borderRadius={"3xl"} justifyContent="center" boxShadow="inset 1px 1px 5px white">
            <Flex w="33%">
                {pool.tokenA.logo ? <Image zIndex={1} borderRadius='full' boxSize='20px' src={pool.tokenA.logo} alt={pool.pair.token0.name}/> : <QuestionOutlineIcon />}
                {pool.tokenB.logo  ? <Image position={"relative"} right="10px" borderRadius='full' boxSize='20px' src={pool.tokenB.logo} alt={pool.pair.token1.name}/> : <QuestionOutlineIcon />}
                <Input 
                    h="5" 
                    type="number" 
                    min={0}
                    max={balance}
                    value={balance ?? "0"} 
                    defaultValue="0" 
                    border="none" 
                    p="0" 
                    m="0"
                    fontWeight={"bold"}
                    _hover={{textShadow: "1px 1px 5px white"}}
                    _focus={{border: "none"}}
                    onChange={e => dispatch({type: "HANDLE_INPUTS", payload: {id: tokenA.id, amount: e.target.value}})}
                />
            </Flex>
            <ArrowRightIcon  />
            <Box w="33%">
                <Flex pb="2">
                    <Input 
                        h="5" 
                        type="number" 
                        min={0}
                        max={tokenA.pooled}
                        textAlign={"right"}
                        fontWeight={"bold"}
                        value={tokenA?.inputRemove?.toExact() ?? "0"} 
                        defaultValue="0" 
                        border="none" 
                        p="0" 
                        m="0"
                        _hover={{textShadow: "1px 1px 5px white"}}
                        _focus={{border: "none"}}
                        onChange={e => dispatch({type: "HANDLE_INPUTS", payload: {id: tokenA.id, amount: e.target.value}})}
                    />
                    {pool.tokenA.logo ? <Image ml="2" display={"initial"} borderRadius='full' boxSize='20px' src={pool.tokenA.logo} alt={pool.pair.token0.name}/> : <QuestionOutlineIcon />}
                </Flex>
                <Flex justifyContent={"right"}>
                    <Input 
                        h="5" 
                        type="number" 
                        min={0}
                        max={tokenB.pooled}
                        textAlign={"right"}
                        fontWeight={"bold"}
                        value={tokenB?.inputRemove?.toExact() ?? "0"} 
                        defaultValue="0" 
                        border="none" 
                        p="0" 
                        m="0"
                        _hover={{textShadow: "1px 1px 5px white"}}
                        _focus={{border: "none"}}
                        onChange={e => dispatch({type: "HANDLE_REMOVE_INPUTS", payload: {id: tokenB.id, amount: e.target.value}})}
                    />
                    {pool.tokenB.logo  ? <Image ml="2" display={"initial"} borderRadius='full' boxSize='20px' src={pool.tokenB.logo} alt={pool.pair.token1.name}/> : <QuestionOutlineIcon />}
                </Flex>
            </Box>
            <Box fontSize={"sm"} justifyContent={"right"} alignContent="center">
                <Text pb="2">{tokenA.token.symbol}</Text>
                <Text>{tokenB.token.symbol}</Text>
            </Box>
        </HStack>
    )
}

export default RemovePoolShare
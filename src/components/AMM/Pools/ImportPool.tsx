import { useCallback, useContext, useState } from "react";
import { Text, Button, Box, Image, Flex, useDisclosure, useColorModeValue } from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons"
import ModalPool from "../../Modal/ModalPool"
import { PoolContext } from "../../../Provider/PoolsProvider";

const ImportPool: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {tokenA, tokenALogo, tokenB, tokenBLogo, dispatch} = useContext(PoolContext)
    const [idx, setIdx] = useState(0)
    const color = useColorModeValue("black", "white")

    const setNewPool = useCallback(() => {
      dispatch({type: "SET_POOL"})
    }, [dispatch])
  
    return (
        <>
        <ModalPool isOpen={isOpen} onClose={onClose} idx={idx} />
        <Box p="2rem" my="5rem" borderRadius={"2rem"} justifyContent={"center"} border="1px solid gray">
          <Flex justifyContent={"center"}>
            {tokenA ?
              <Button color={color} onClick={() => {setIdx(0); onOpen()}} size="sm" p="5">
                {tokenALogo ? <Image mx="2" borderRadius='full' boxSize="25px" src={tokenALogo}/> : <QuestionOutlineIcon mx="2" color={color} />}
                {tokenA?.symbol ?? ''}
              </Button>
              :
              <Button w="40%" bg="gray.600" border={"1px solid gray"} onClick={() => {setIdx(0); onOpen()}}>TokenA</Button>
            }
            <Text mx="2rem" fontSize={"xl"}> + </Text>
            {tokenB ?
              <Button color={color} onClick={() => {setIdx(1); onOpen()}} size="sm" p="5">
                {tokenBLogo ? <Image mx="2" borderRadius='full' boxSize="25px" src={tokenBLogo}/> : <QuestionOutlineIcon mx="2" color={color} />}
                {tokenB?.symbol ?? ''}
              </Button>
              :
              <Button w="40%" bg="gray.600" border={"1px solid gray"} onClick={() => {setIdx(1); onOpen()}}>TokenB</Button>
            }
          </Flex>
          <Button mt="2rem" w="40%" bg="blue.500" _hover={{bg: "blue.500"}} disabled={!tokenA || !tokenB} onClick={setNewPool}>Import pool</Button>
        </Box>
        </>
    )
}

export default ImportPool
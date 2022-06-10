import { useState } from "react";
import { 
    Text, 
    Image,
    Box,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    useColorModeValue,
   } from "@chakra-ui/react"
import { QuestionOutlineIcon } from "@chakra-ui/icons"
import { IPool } from "../../../Models";
import PoolData from "./PoolData"

const PoolCard: React.FC<{pool: IPool}> = ({pool}) => {
    const [expanded, setExpanded] = useState(false)
    const [state, setState] = useState("pool")
    const background = expanded ? "linear(to-b, purple.900, purple.800, purple.900, gray.800)" : ""

    return (
    <AccordionItem  m="3" border={"none"} borderTopRadius={expanded ? "xl" : "none"} bgGradient={background}>
        <Box>
            <AccordionButton
            _expanded={{
                bgGradient: "none",
            }}
            _hover={{
                bgGradient :useColorModeValue(
                "linear(whiteAlpha.100, pink.200, pink.300, pink.200, pink.100)",
                "linear(gray.800, purple.900, purple.800, purple.900, gray.800)"),
            }}
            bgGradient={useColorModeValue(
            "radial(whiteAlpha.100, pink.200, pink.300, pink.200, whiteAlpha.100)",
            "radial(gray.800, purple.900, purple.800, purple.900, gray.800)")}
            h="5rem"
            borderRadius={"full"}
            _focus={{border: "none"}}
            alignContent="center"
            onClick={() => setExpanded(!expanded)}
            >
                <Box display={"flex"} justifyContent="center" alignContent={"center"} pl="4" w="100%">
                    {pool?.logoURI?.tokenA ? <Image borderRadius='full' boxSize='30px' src={pool.logoURI.tokenA} alt={pool.pair.token0.name}/> : < QuestionOutlineIcon />}
                    <Text mx="5">{pool.name}</Text>
                    {pool?.logoURI?.tokenB ? <Image borderRadius='full' boxSize='30px' src={pool.logoURI.tokenB} alt={pool.pair.token1.name}/> : < QuestionOutlineIcon />}
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
               {state === "pool" && <PoolData pool={pool} setState={setState}/>}
               {state === "add" && <PoolData pool={pool} setState={setState}/>}
               {state === "remove" && <PoolData pool={pool} setState={setState}/>}
            </AccordionPanel>
        </Box>
    </AccordionItem>
    )
}

export default PoolCard
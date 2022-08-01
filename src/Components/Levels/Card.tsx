import { LevelCard } from "../../Constants/levels"
import { Text, Box, Stack, Spacer } from "@chakra-ui/react"
import Ressource from "./Ressources"

const Card: React.FC<{level: LevelCard}> = ({level}) => {
    return (
        <Box
        display={"flex"}
        margin="auto"
        height={"50vh"}
        maxW="33%"
        mt="5rem" 
        p="1rem"
        bg="rgba(0, 0, 0, 0.21)" 
        boxShadow="0px 0px 10px 7px #FFFFFF" 
        backdropFilter=" blur(15px)" 
        borderRadius="20px"
        overflow={"hidden"}
        >
            <Stack direction={"column"} w="100%">
                <Stack direction={"row"}>
                    <Text fontSize={"5xl"} fontWeight="bold">{level.id}</Text>
                    <Spacer />
                    <Text pl="5" fontSize={"4xl"} fontWeight="bold">{level.title}</Text>
                    <Spacer />
                    <Ressource ressource={level.ressources} learn={level.learn} />
                </Stack>
                <Spacer />
                <Box alignItems="center">
                    <Text textAlign={"center"}>{level.description}</Text>
                </Box>
                <Spacer />
                <Box marginX={"auto"} minH="5rem" background="rgba(153, 114, 193, 0.99)" border="3px solid #7F00FE" borderRadius="50px">
                    <Text mt="1.5rem" textAlign={"center"}>{level.help}</Text>
                </Box>
            </Stack>
        </Box>
    )
}

export default Card
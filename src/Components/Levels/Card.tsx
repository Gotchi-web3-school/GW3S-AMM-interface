import { useContext } from "react"
import { LevelCard } from "../../Constants/levels"
import { Text, Box, Stack, Spacer, Link, Image, Center, Button } from "@chakra-ui/react"
import Ressource from "./Ressources"
import { LevelContext } from "../../Provider/LevelProvider"
import { useParams } from "react-router-dom"
const metamask = require("../../Assets/Metamask-face.png")

const Card: React.FC<{level: LevelCard}> = ({level}) => {
    const { id } = useParams()
    const {running} = useContext(LevelContext)

    return (
        <Box
        display={"flex"}
        height={"50vh"}
        minW="28%"
        maxW="28%"
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
                    <Ressource  title={level.learn.title} text={level.learn.text} extraRessources={level.ressources}/>
                </Stack>
                <Spacer />
                <Box alignItems="center">
                    <Text textAlign={"center"}>{level.description}</Text>
                </Box>
                <Spacer />
                <Box marginX={"auto"} minH="5rem" background="rgba(153, 114, 193, 0.99)" border="3px solid #7F00FE" borderRadius="50px">
                   {running === parseInt(id ?? '0') || id === '0' ? 
                        <Box>
                            <Text ml="7" pt="1" fontSize={"xs"}>Things that might help</Text>
                            <Link color="blue.300" href={`${level.help}`} isExternal>
                                <Center>
                                    <Image boxSize={20} src={metamask}/>
                                </Center>
                            </Link>
                        </Box>
                        :
                        <Center mt="4">
                            <Button bg="teal.500" _hover={{background: "teal.600"}} onClick={() => "lfg"}>Start Level</Button>
                        </Center>
                    }

                </Box>
            </Stack>
        </Box>
    )
}

export default Card
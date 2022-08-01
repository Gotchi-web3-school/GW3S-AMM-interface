import { Wrap, Box, Text, WrapItem, Image, useColorModeValue } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { levels } from "../../Constants/levels"
const closedChest = require('../../assets/closedChest.png')

const LevelPills: React.FC = () => {
    const textShadow = useColorModeValue("0px 0px 10px purple", "0px 0px 8px white")

    return (
    <Box margin={"auto"} mt="2rem" maxW="85%" justifyContent={"center"}>
        <Wrap spacing={"3rem"} p="0.3rem">
            {levels.map((level, idx) => {
                return(
                    <Link key={idx} to={`level/${idx}`}>
                        <WrapItem 
                        key={idx}
                        rounded="full"
                        border={"1px solid rgba(0, 0, 0, 0.21)"}
                        bg="rgba(0, 0, 0, 0.21)"
                        backdropFilter="blur(13px)"
                        h={["1rem", "2rem", "3rem"]} 
                        w={["1rem", "2rem", "3rem"]}
                        justifyContent="center"
                        alignItems={"center"}
                        _hover={{
                            boxShadow: "0px 1px 5px 1px #FFFFFF",
                            border: "2px solid rgba(255, 255, 255, 0.51)",
                        }}
                        >
                            <Text 
                            textAlign={"center"} 
                            fontWeight={"bold"} 
                            fontSize={["sm", "md", "lg", "xl"]}
                            textShadow={textShadow}
                            >{level.id}</Text>
                        </WrapItem>
                    </Link>
                )
            })}
        </Wrap>
        <Box as="button" display={"flex"} margin="auto" onClick={() => alert("You need to finish all the levels !")}>
            <Image boxSize={"6rem"} src={closedChest}/>
        </Box>
    </Box>
    )
}

export default LevelPills
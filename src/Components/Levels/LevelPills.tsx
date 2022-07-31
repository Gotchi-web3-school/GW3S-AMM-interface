import { Wrap, Box, Text, WrapItem, useColorModeValue } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { levels } from "../../Constants/levels"

const LevelPills: React.FC = () => {
    const textShadow = useColorModeValue("0px 0px 10px purple", "0px 0px 8px white")

    return (
    <Box margin={"auto"} mt="2rem" maxW="85%" justifyContent={"center"}>
        <Wrap spacing={"3rem"} p="0.3rem">
            {levels.map((level, idx) => {
                return(
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
                        <Link key={idx} to={`level/${idx}`}>
                            <Text 
                            textAlign={"center"} 
                            fontWeight={"bold"} 
                            fontSize={["sm", "md", "lg", "xl"]}
                            textShadow={textShadow}
                            >{level.id}</Text>
                        </Link>
                    </WrapItem>
                )
            })}
        </Wrap>
    </Box>
    )
}

export default LevelPills
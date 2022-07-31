import { LevelCard } from "../../Constants/levels"
import { Container, Stack, Text, Box, Spacer } from "@chakra-ui/react"
import Ressource from "./Ressources"

const Card: React.FC<LevelCard> = (level) => {
    return (
        <Container boxSizing="border-box" position="relative" bg="rgba(0, 0, 0, 0.71)" border="5px solid #FFFFFF" boxShadow="0px 4px 18px 7px #FFFFFF" backdropFilter=" blur(15px)" borderRadius="20px">
            <Stack direction={"row"}>
                <Text>{level.id}</Text>
                <Spacer />
                <Text>{level.title}</Text>
                <Spacer />
                <Ressource ressource={level.ressources} learn={level.learn} />
            </Stack>
            <Text>
                {level.description}
            </Text>
            <Box>
                {level.help}
            </Box>
        </Container>
    )
}

export default Card
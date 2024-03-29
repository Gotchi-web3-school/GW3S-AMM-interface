import {Box, Stack, Spacer} from "@chakra-ui/react"
import Card from "./Card"
import { levels } from "../../Constants/levels"

const Level13: React.FC = () => {
    return (
        <Box margin={"auto"}>
        <Stack direction={"row"} m="5rem" align="center">
            <Spacer />

            <Spacer />
            <Card level={levels[13]}/>
        </Stack>
    </Box>
    )
}

export default Level13
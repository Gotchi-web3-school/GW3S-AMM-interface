import { Box } from "@chakra-ui/react"
import { levels } from "../../Constants/levels"
import Card from "./Card"

const Level0: React.FC = () => {
    return (
    <Box>
        <Card level={levels[0]}/>
    </Box>
    )
}

export default Level0
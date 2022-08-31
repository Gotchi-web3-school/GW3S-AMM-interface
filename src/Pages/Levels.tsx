import { useParams } from "react-router-dom"
import { Box } from "@chakra-ui/react"
import Level0 from "../Components/Levels/Level0"
import Level1 from "../Components/Levels/Level1"
import Level2 from "../Components/Levels/Level2"
import Level3 from "../Components/Levels/Level3"
import Level4 from "../Components/Levels/Level4"
import Level5 from "../Components/Levels/Level5"
import Level6 from "../Components/Levels/Level6"
import Level7 from "../Components/Levels/Level7"
import Level8 from "../Components/Levels/Level8"
import Level9 from "../Components/Levels/Level9"
import Level10 from "../Components/Levels/Level10"
import Level11 from "../Components/Levels/Level11"
import Level12 from "../Components/Levels/Level12"
import Level13 from "../Components/Levels/Level13"
import { LevelProvider } from "../Provider/LevelProvider"

const levels = [
<Level0 />,<Level1 />,<Level2 />,<Level3 />,<Level4 />,<Level5 />,<Level6 />,<Level7 />,<Level8 />,<Level9 />,   
<Level10 />,<Level11 />,<Level12 />,<Level13 />
]

const Levels: React.FC = () => {
    const { id } = useParams()
    return (
    <Box height="100vh">
        {id && <LevelProvider levelId={parseInt(id)}>
        {levels[parseInt(id!)]}
        </LevelProvider>}
    </Box>
    )
}

export default Levels
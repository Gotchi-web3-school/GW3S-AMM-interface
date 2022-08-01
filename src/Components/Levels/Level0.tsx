import { Box, Spacer, Stack, Image } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import { levels } from "../../Constants/levels"
import ConnectorButtonL0 from "../Buttons/ConnectorButtonL0"
import Card from "./Card"
const closeChest = require("../../assets/closedChest.png")

const Level0: React.FC = () => {
    const signer = useWeb3React()

    const claim_l0 = async() => {
        
    }
    return (
    <Box margin={"auto"}>
        <Stack direction={"row"} m="5rem">
            <Spacer />
            {signer.active && signer.chainId === 80001 ? 
                <Box as="button" display={"flex"} margin="auto" onClick={claim_l0}>
                    <Image src={closeChest}/>
                </Box>
                :
                <ConnectorButtonL0 />
            }
            <Spacer />
            <Card level={levels[0]}/>
        </Stack>
    </Box>
    )
}

export default Level0
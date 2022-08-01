import { Box, Spacer, Stack, Image, useToast } from "@chakra-ui/react"
import { useWeb3React } from "@web3-react/core"
import { useContext } from "react"
import { levels } from "../../Constants/levels"
import { ContractContext } from "../../Provider/ContractProvider"
import { claim_l0 } from "../../Lib/Smart-contracts/Levels/level0Facet"
import ConnectorButtonL0 from "../Buttons/ConnectorButtonL0"
import Card from "./Card"
const closeChest = require("../../Assets/closedChest.png")
const opennedChest = require("../../Assets/opennedChest.png")

const Level0: React.FC = () => {
    const signer = useWeb3React()
    const {ILevel0Facet} = useContext(ContractContext)
    const toast = useToast()
    
    return (
    <Box margin={"auto"}>
        <Stack direction={"row"} m="5rem">
            <Spacer />
            {signer.active && signer.chainId === 80001 ? 
                <Box as="button" display={"flex"} margin="auto" onClick={() => claim_l0({ILevel0: ILevel0Facet,toast: toast})}>
                    <Image src={closeChest || opennedChest}/>
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
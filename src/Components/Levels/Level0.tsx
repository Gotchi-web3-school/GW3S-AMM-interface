import { useContext, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { Box, Spacer, Stack, Image, useToast } from "@chakra-ui/react"
import { levels } from "../../Constants/levels"
import { ContractContext } from "../../Provider/ContractProvider"
import { claim_l0 } from "../../Lib/Smart-contracts/Levels/level0Facet"
import { LevelContext } from "../../Provider/LevelProvider"
import { fetchLevelState } from "../../Lib/Smart-contracts/Levels"
import Card from "./Card"
import ConnectorButtonL0 from "../Buttons/ConnectorButtonL0"
const closeChest = require("../../Assets/chests/closedChest.png")
const opennedChest = require("../../Assets/chests/opennedChest.png")

const Level0: React.FC = () => {
    const signer = useWeb3React()
    const {ILevel0Facet, LevelLoupeFacet} = useContext(ContractContext)
    const {hasClaimed, dispatch} = useContext(LevelContext)
    const toast = useToast()

    useEffect(() => {
        try {
            fetchLevelState(LevelLoupeFacet!, signer, 0).then(result => {
                dispatch({type: "SET_LEVEL_STATE", payload: result})
            })
        } catch (error) {
            console.log(error)
        }
    }, [LevelLoupeFacet, signer, dispatch])
    
    return (
    <Box margin={"auto"}>
        <Stack direction={"row"} m="5rem">
            <Spacer />
            {signer.active && signer.chainId === 80001 ? 
                <Box as="button" display={"flex"} margin="auto" onClick={() => claim_l0({Facet: ILevel0Facet,toast: toast, dispatch: dispatch})}>
                    <Image src={hasClaimed ? opennedChest : closeChest}/>
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
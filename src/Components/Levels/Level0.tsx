import { useContext, useEffect, useState } from "react"
import useSound from "use-sound"
import { useWeb3React } from "@web3-react/core"
import { Box, Spacer, Stack, Image, useToast, useDisclosure } from "@chakra-ui/react"
import { levels } from "../../Constants/levels"
import { ContractContext } from "../../Provider/ContractProvider"
import { openL0Chest } from "../../Lib/Smart-contracts/Levels/level0Facet"
import { LevelContext } from "../../Provider/LevelProvider"
import { fetchLevelState } from "../../Lib/Smart-contracts/Levels"
import Card from "./Card"
import { Reward } from "../../Lib/Smart-contracts/Rewards"
import ConnectorButtonL0 from "../Buttons/ConnectorButtonL0"
import ModalOpenChest from "../Modal/ModalChestOpen"
const closeChest = require("../../Assets/chests/closedChest.png")
const opennedChest = require("../../Assets/chests/opennedChest.png")
const openLockedChestSound = require("../../Assets/sounds/openning locked chest.mp3")
const openChestSound = require("../../Assets/sounds/openning chest.mp3")

const Level0: React.FC = () => {
    const signer = useWeb3React()
    const {ILevel0Facet, LevelLoupeFacet} = useContext(ContractContext)
    const {hasClaimed, dispatch} = useContext(LevelContext)
    const {isOpen, onOpen, onClose } = useDisclosure()
    const [play] = useSound(openLockedChestSound, {volume: 0.6})
    const [play1] = useSound(openChestSound, {volume: 0.6})
    const [chest, setChest] = useState<Array<Reward | undefined>>([])
    const toast = useToast()

    const openChest = async() => {
        try {
            play()
            const result = await openL0Chest({Facet: ILevel0Facet,toast: toast, dispatch: dispatch, signer: signer})

            if (result) {
                play1()
                setChest(result)
                onOpen()
            }
        } catch (error) {} //Something went wrong
    }

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
        <ModalOpenChest chest={chest} isOpen={isOpen} onClose={onClose} />
        <Stack direction={"row"} m="5rem">
            <Spacer />
            {signer.active && signer.chainId === 80001 ? 
                <Box as="button" display={"flex"} margin="auto" onClick={openChest}>
                    <Image src={isOpen ? opennedChest : closeChest}/>
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
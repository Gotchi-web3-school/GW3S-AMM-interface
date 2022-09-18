import { Box, Image, useToast, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import useSound from 'use-sound';
import { events } from "../../Lib/Smart-contracts/Levels"
import { useWeb3React } from "@web3-react/core"
import ModalChest from "../Modal/ModalChest";
const closeChest = require("../../Assets/chests/closedChest.png")
const opennedChest = require("../../Assets/chests/opennedChest.png")
const openLockedChestSound = require("../../Assets/sounds/openning locked chest.mp3")
const openChestSound = require("../../Assets/sounds/openning chest.mp3")

const Chest: React.FC = () => {
    const toast = useToast()
    const signer = useWeb3React()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [play] = useSound(openLockedChestSound, {volume: 0.6})
    const [play1] = useSound(openChestSound, {volume: 0.6})
    const [chest, setChest] = useState<number>(0)

    const openChest = async() => {
        try {
            play()
            const result = await events[0](signer, toast)

            if (result) {
                setChest(result)
                onOpen()
                play1()
            }
        } catch (error) {
            //Something went wrong
        }
    }

    return (
        <Box as="button" onClick={openChest}>
            <ModalChest content={chest} isOpen={isOpen} onClose={onClose} />
            <Image boxSize={100} mt="-8" src={isOpen ? opennedChest : closeChest}/>
        </Box>
    )
}

export default Chest
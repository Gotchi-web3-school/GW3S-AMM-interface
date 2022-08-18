import { Box, Image, useToast, useDisclosure } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { ContractContext } from "../../Provider/ContractProvider"
import { LevelContext } from "../../Provider/LevelProvider"
import { opens } from "../../Lib/Smart-contracts/Levels"
import ModalChestOpen from "../Modal/ModalChestOpen"
import { OpennedChest } from "../../Models"
const lockedChest = require("../../Assets/chests/lockedChest.png")
const closeChest = require("../../Assets/chests/closedChest.png")
const opennedChest = require("../../Assets/chests/opennedChest.png")

const ChestLevel: React.FC<{id: number}> = ({id}) => {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [chest, setChest] = useState<OpennedChest>({loots: [], amounts: []})
    const {LevelFacets} = useContext(ContractContext)
    const {hasCompleted, dispatch} = useContext(LevelContext)

    const openChest = async() => {
        try {
            const result = await opens[id]({
                Facet: LevelFacets[id], 
                toast: toast,
                dispatch: dispatch,
                })

            if (result) {
                setChest(result)
                onOpen()
            }
        } catch (error) {
            //Something went wrong
        }
    }

    return (
        <Box as="button" display={"flex"} margin="auto" onClick={openChest}>
            <ModalChestOpen chest={chest} isOpen={isOpen} onClose={onClose} />
            <Image boxSize={100} src={isOpen ? opennedChest : hasCompleted ? closeChest : lockedChest}/>
        </Box>
    )
}

export default ChestLevel
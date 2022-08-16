import { Box, Image, useToast, useDisclosure } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { ContractContext } from "../../Provider/ContractProvider"
import { LevelContext } from "../../Provider/LevelProvider"
import { useWeb3React } from "@web3-react/core"
import { opens } from "../../Lib/Smart-contracts/Levels"
import ModalChestOpen from "../Modal/ModalChestOpen"
import { OpennedChest } from "../../Models"
const lockedChest = require("../../Assets/chests/lockedChest.png")
const closeChest = require("../../Assets/chests/closedChest.png")
const opennedChest = require("../../Assets/chests/opennedChest.png")

const ChestLevel: React.FC<{id: number}> = ({id}) => {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loots, setLoots] = useState<OpennedChest>({addresses: [], quantities: []})
    const {LevelFacets} = useContext(ContractContext)
    const {hasCompleted, dispatch} = useContext(LevelContext)

    const openChest = async() => {
        try {
            const result = await opens[id]({
                Facet: LevelFacets[id], 
                toast: toast,
                dispatch: dispatch,
                })
                
            setLoots(result)
            onOpen()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box as="button" display={"flex"} margin="auto" onClick={openChest}>
            <ModalChestOpen loots={loots} isOpen={isOpen} onClose={onClose} />
            <Image boxSize={100} src={isOpen ? opennedChest : hasCompleted ? closeChest : lockedChest}/>
        </Box>
    )
}

export default ChestLevel
import { useContext } from "react"
import { useWeb3React } from "@web3-react/core"
import { Box, Spacer, Stack, Text, useToast, Button, Center } from "@chakra-ui/react"
import { levels } from "../../Constants/levels"
import { ContractContext } from "../../Provider/ContractProvider"
import { CompleteTx } from "../../Models"
import { LevelContext } from "../../Provider/LevelProvider"
import { completes } from "../../Lib/Smart-contracts/Levels"
import Card from "./Card"
import ChestLevel from "../Chests/ChestLevel"

const Level1: React.FC = () => {
    const signer = useWeb3React()
    const contracts = useContext(ContractContext)
    const {dispatch} = useContext(LevelContext)
    const toast = useToast()
    const message = " I hereby confirm that i will pursue the challenges ahead and be devoted to protect the Gotchiverse against the baad lickuidators"

    const complete = () => {
        const tx: CompleteTx = {
            signer: signer,
            Facet: contracts.LevelFacets[1],
            LoupeFacet: contracts.LevelLoupeFacet,
            toast: toast,
            dispatch: dispatch
        }
        completes[1]!(tx)
    }
    
    return (
    <Box margin={"auto"}>
        <Stack direction={"row"} m="5rem" align="center">
            <Spacer />
                <Box margin="auto" maxW="25%">
                    <Stack spacing="5">
                        <Text textAlign={"center"}>{message}</Text>
                        <Center>
                            <Button margin="auto" maxW="25%" onClick={complete}>Sign</Button>
                        </Center>
                    </Stack>
                </Box>
            <Spacer />
            <ChestLevel id={1} />
            <Spacer />
            <Card level={levels[1]}/>
        </Stack>
    </Box>
    )
}

export default Level1
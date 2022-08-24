import { useContext, useState } from "react"
import {Box, Stack, Text, Spacer, Image, Input, Button, useToast} from "@chakra-ui/react"
import { levels } from "../../Constants/levels"
import { LevelContext } from "../../Provider/LevelProvider"
import Card from "./Card"
import { useWeb3React } from "@web3-react/core"
import { InsertTx, insert } from "../../Lib/Smart-contracts/Levels/level5Facet"

const Level5: React.FC = () => {
    const signer = useWeb3React()
    const toast = useToast()
    const {instanceAddress} = useContext(LevelContext)
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState("")

    const insertTx = () => {
        const tx: InsertTx = {
            signer: signer,
            toast: toast,
            instance: instanceAddress,
            address: input
        }
        setLoading(true)
        insert(tx)
        .then(() => setLoading(false))
        .catch(() => setLoading(false))
    }

    return (
        <Box margin={"auto"}>
        <Stack direction={"row"} m="5rem" align="center">
            <Spacer />
            <Stack w="26%" textAlign={"center"} >
                <Text>Catch me !</Text>
                <Image src="" />
                <Input onChange={(e) => setInput(e.target.value)} />
                <Button isLoading={loading} onClick={insertTx}>insert</Button>
            </Stack>
            <Spacer />
            <Card level={levels[5]}/>
        </Stack>
    </Box>
    )
}

export default Level5
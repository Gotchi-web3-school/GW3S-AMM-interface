import { useEffect, useContext } from "react"
import { useWeb3React } from "@web3-react/core"
import { LevelContext } from "../../Provider/LevelProvider"
import { fetchAMMState } from "../../Lib/Smart-contracts/Levels/level10Facet"
import {Box, Stack, Spacer} from "@chakra-ui/react"
import { levels } from "../../Constants/levels"
import AMM from "../AMM"
import Card from "./Card"
import { GlobalConst } from "../../Constants"

const Level10: React.FC = () => {
    const signer = useWeb3React()
    const {amm, running, factories, instanceAddress, dispatch} = useContext(LevelContext)

    useEffect(() => {
        if (running === 10 && instanceAddress !== GlobalConst.addresses.ZERO_ADDRESS && factories) {
            fetchAMMState(signer, instanceAddress, factories[0])
            .then((result) => {
                dispatch({type: "SET_AMM_STATE", payload: result})
            })
        }
    }, [running, signer, instanceAddress, factories, dispatch])
    return (
        <Box margin={"auto"}>
        <Stack direction={"row"} m="5rem" align="center">
            <Spacer />
                {amm?.pools && running === 10 && <AMM id={0} factory={amm.factory} initCode={amm.initCode} tokenList={amm.list} pools={amm.pools} />}
            <Spacer />
            <Card level={levels[10]}/>
        </Stack>
    </Box>
    )
}

export default Level10
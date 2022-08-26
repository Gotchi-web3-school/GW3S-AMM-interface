import {Box, Stack, Spacer} from "@chakra-ui/react"
import { levels } from "../../Constants/levels"
import Card from "./Card"
import AMM from "../AMM"
import { useContext, useEffect } from "react"
import { fetchAMMState } from "../../Lib/Smart-contracts/Levels/level3Facet"
import { useWeb3React } from "@web3-react/core"
import { LevelContext } from "../../Provider/LevelProvider"
import { GlobalConst } from "../../Constants"

const Level3: React.FC = () => {
    const signer = useWeb3React()
    const {amm, running, instanceAddress, factories, dispatch} = useContext(LevelContext)

    useEffect(() => {
        if (running === 3 && instanceAddress !== GlobalConst.addresses.ZERO_ADDRESS && factories) {
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
                {amm && running === 3 && <AMM id={0} isPool={false} factory={amm.factory} initCode={amm.initCode} tokenList={amm.list} pools={amm.pools} />}
            <Spacer />
            <Card level={levels[3]}/>
        </Stack>
        </Box>
    )
}

export default Level3
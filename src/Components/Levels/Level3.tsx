import {Box, Stack, Spacer} from "@chakra-ui/react"
import { levels } from "../../Constants/levels"
import Card from "./Card"
import AMM from "../AMM"
import { useContext, useEffect } from "react"
import { fetchAMMState } from "../../Lib/Smart-contracts/Levels/level3Facet"
//import { fetchLevelState } from "../../Lib/Smart-contracts/Levels"
import { useWeb3React } from "@web3-react/core"
//import { ContractContext } from "../../Provider/ContractProvider"
import { LevelContext } from "../../Provider/LevelProvider"

const Level3: React.FC = () => {
    const signer = useWeb3React()
    //const contracts = useContext(ContractContext)
    const {amm, running, instanceAddress, factories, dispatch} = useContext(LevelContext)

    useEffect(() => {
        if (running === 3) {
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
                {amm && running === 3 && <AMM isPool={false} factory={amm.factory} initCode={amm.initCode} tokenList={amm.list} pools={amm.pools} />}
            <Spacer />
            <Card level={levels[3]}/>
        </Stack>
        </Box>
    )
}

export default Level3
import { useEffect, useContext } from "react"
import { useWeb3React } from "@web3-react/core"
import { LevelContext } from "../../Provider/LevelProvider"
import { ContractContext } from "../../Provider/ContractProvider"
import { fetchAMMState } from "../../Lib/Smart-contracts/Levels/level6Facet"
import {Box, Stack, Spacer} from "@chakra-ui/react"
import { levels } from "../../Constants/levels"
import AMM from "../AMM"
import Card from "./Card"

const Level6: React.FC = () => {
    const signer = useWeb3React()
    const contracts = useContext(ContractContext) 
    const {amm, running, factories, dispatch} = useContext(LevelContext)

    useEffect(() => {
        if (running === 6 && contracts && factories) {
            fetchAMMState(signer, contracts, factories[0])
            .then((result) => {
                dispatch({type: "SET_AMM_STATE", payload: result})
            })
        }
    }, [running, signer, contracts, factories, dispatch])


    return (
        <Box margin={"auto"}>
        <Stack direction={"row"} m="5rem" align="center">
            <Spacer />
                {amm?.pools && running === 6 && <AMM id={0} factory={amm.factory} initCode={amm.initCode} tokenList={amm.list} pools={amm.pools} />}
            <Spacer />
            <Card level={levels[6]}/>
        </Stack>
    </Box>
    )
}

export default Level6
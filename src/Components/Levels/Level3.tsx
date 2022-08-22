import {Box, Stack, Spacer} from "@chakra-ui/react"
import { levels } from "../../Constants/levels"
import Card from "./Card"
import AMM from "../AMM"
import { useContext, useEffect } from "react"
import { fetchLevel3State } from "../../Lib/Smart-contracts/Levels/level3Facet"
import { useWeb3React } from "@web3-react/core"
import { ContractContext } from "../../Provider/ContractProvider"
import { LevelContext } from "../../Provider/LevelProvider"

const Level3: React.FC = () => {
    const signer = useWeb3React()
    const contracts = useContext(ContractContext)
    const {amm, dispatch} = useContext(LevelContext)


    useEffect(() => {
        if (signer.account && contracts.LevelLoupeFacet) {
            console.log("fetchState")
            fetchLevel3State(signer, contracts)
            .then(result => {
                dispatch({type: "SET_LEVEL_STATE", payload: result})
                dispatch({type: "SET_AMM_STATE", payload: result})
            })
            .catch()
        }
    }, [signer, contracts, dispatch])
    
    return (
        <Box margin={"auto"}>
        <Stack direction={"row"} m="5rem" align="center">
            <Spacer />
            {amm && <AMM factory={amm.factory} initCode={amm.initCode} tokenList={amm.list} pools={amm.pools} />}
            <Spacer />
            <Card level={levels[3]}/>
        </Stack>
        </Box>
    )
}

export default Level3
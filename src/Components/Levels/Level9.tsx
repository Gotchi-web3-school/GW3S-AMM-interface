import { useEffect, useContext } from "react"
import { useWeb3React } from "@web3-react/core"
import { LevelContext } from "../../Provider/LevelProvider"
import { fetchAMMState } from "../../Lib/Smart-contracts/Levels/level9Facet"
import {Box, Wrap, Spacer} from "@chakra-ui/react"
import { levels } from "../../Constants/levels"
import AMM from "../AMM"
import Card from "./Card"
import { GlobalConst } from "../../Constants"
import Erc20Generator from "../Erc20Generator"

const Level9: React.FC = () => {
    const signer = useWeb3React()
    const {amm, running, factories, instanceAddress, dispatch} = useContext(LevelContext)

    useEffect(() => {
        if (running === 9 && instanceAddress !== GlobalConst.addresses.ZERO_ADDRESS && factories) {
            fetchAMMState(signer, instanceAddress, factories[0])
            .then((result) => {
                dispatch({type: "SET_AMM_STATE", payload: result})
            })
        }
    }, [running, signer, instanceAddress, factories, dispatch])

    return (
    <Box margin={"auto"} display={["block", "block", "block", "flex"]}  justifyItems="center" alignItems="center">
        <Wrap justify='center' align={"center"} spacing={"5rem"} p="3rem" >
            {amm?.pools && running === 9 &&
            <>
                <Erc20Generator instanceLevel={9} instanceAddress={instanceAddress} />
                <AMM factory={amm.factory} initCode={amm.initCode} tokenList={amm.list} pools={amm.pools} />
            </>
            }
            <Spacer />
            <Card level={levels[9]}/>
        </Wrap>
    </Box>
    )
}
export default Level9
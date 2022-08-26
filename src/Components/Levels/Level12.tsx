import { useEffect, useState, useContext } from "react"
import { useWeb3React } from "@web3-react/core"
import { LevelContext } from "../../Provider/LevelProvider"
import { fetchAMMState } from "../../Lib/Smart-contracts/Levels/level12Facet"
import {Box, Stack, Spacer} from "@chakra-ui/react"
import { levels } from "../../Constants/levels"
import AMM from "../AMM"
import Card from "./Card"
import { GlobalConst } from "../../Constants"
import { TokenList } from "../../Constants/list"
import { Pool } from "../../Models"
import { ContractContext } from "../../Provider/ContractProvider"

const Level12: React.FC = () => {
    const signer = useWeb3React()
    const {LevelLoupeFacet} = useContext(ContractContext)
    const {running, instanceAddress, dispatch} = useContext(LevelContext)
    const [amm0, setAmm0] = useState<{factory: string, initCode: string, list: TokenList[], pools: Pool[]} | undefined>()
    const [amm1, setAmm1] = useState<{factory: string, initCode: string, list: TokenList[], pools: Pool[]} | undefined>()

    useEffect(() => {
        if (running === 12 && instanceAddress !== GlobalConst.addresses.ZERO_ADDRESS) {
            fetchAMMState(signer, instanceAddress, LevelLoupeFacet!, 0).then((result) => setAmm0(result))
            fetchAMMState(signer, instanceAddress, LevelLoupeFacet!, 1).then((result) => setAmm1(result))
        }
    }, [running, signer, instanceAddress, LevelLoupeFacet, dispatch])

    return (
        <Box margin={"auto"}>
        <Stack direction={"row"} m="5rem" align="center">
            <Spacer />
            {amm0?.pools && running === 12 && <AMM id={0} factory={amm0.factory} initCode={amm0.initCode} tokenList={amm0.list} pools={amm0.pools} />}
            {amm1?.pools && running === 12 && <AMM id={1} factory={amm1.factory} initCode={amm1.initCode} tokenList={amm1.list} pools={amm1.pools} />}
            <Spacer />
            <Card level={levels[12]}/>
        </Stack>
    </Box>
    )
}

export default Level12
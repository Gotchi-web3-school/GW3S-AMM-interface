import { useWeb3React } from "@web3-react/core"
import { sign } from "crypto"
import { ethers } from "ethers"
import { createContext, useContext, useEffect, useReducer } from "react"
import { useParams } from "react-router-dom"
import { resourceLimits } from "worker_threads"
import { levelReducer } from "../Reducers/levelReducer"
import { ContractContext } from "./ContractProvider"

export type LevelContextType = {
    running: number,
    instanceAddress: string
    hasCompleted: boolean,
    hasClaimed: boolean,
    factories: string[],
    tokens: string[],
    dispatch: (state: any, action: any) => void,
}

const defaultContext = {
    running: 0,
    instanceAddress: '',
    hasCompleted: false,
    hasClaimed: false,
    factories: [],
    tokens: [],
    dispatch: (state: {}, action: any) => {},
} 

export const LevelContext = createContext<LevelContextType>(defaultContext)

export const LevelProvider = (props: any) => {
    const { id } = useParams()
    const signer = useWeb3React()
    const {LevelLoupeFacet} = useContext(ContractContext)
    const [level, dispatch] = useReducer(levelReducer, defaultContext)
    const {running, instanceAddress, hasCompleted, hasClaimed, factories, tokens} = level

    useEffect(() => {
        const fetchLevelState = async() => {
            const running = LevelLoupeFacet!.getRunningLevel(signer.account)
            const instanceAddress = LevelLoupeFacet!.getLevelInstanceByAddress(signer.account, id)
            const hasCompleted = LevelLoupeFacet!.hasCompletedLevel(signer.account, id)
            const hasClaimed = LevelLoupeFacet!.hasClaimedLevel(signer.account, id)
            const factories = LevelLoupeFacet!.getFactoryLevel(id, 0)
            //const tokens = LevelLoupeFacet!.getTokens(id)

            Promise.all([running, instanceAddress, hasCompleted, hasClaimed, factories]).then(result => {
                console.log(result)
            })
        }

        try {
            fetchLevelState()
        } catch (error) {
            console.log(error)
        }
    }, [LevelLoupeFacet, id, signer.account])

  return (
    <LevelContext.Provider value={{running, instanceAddress, hasCompleted, hasClaimed, factories, tokens, dispatch}}>
    {props.children}
    </LevelContext.Provider>
  )
}

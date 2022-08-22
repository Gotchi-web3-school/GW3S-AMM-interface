import { createContext, useReducer, useEffect, useContext } from "react"
import { levelReducer } from "../Reducers/levelReducer"
import { fetchLevelState } from "../Lib/Smart-contracts/Levels"
import { ContractContext } from "./ContractProvider"
import { useWeb3React } from "@web3-react/core"
import { useParams } from "react-router-dom"
import { TokenList } from "../Constants/list"
import { Pool } from "../Models"

export type LevelContextType = {
    running: number
    instanceAddress: string
    hasCompleted: boolean
    hasClaimed: boolean
    factories: string[]
    tokens: string[]
    amm: {
      factory?: string
      initCode?: string 
      list?: TokenList[]
      pools?: Pool[]
    } | undefined,
    dispatch: (state: any, action?: Object) => void,
}

const defaultContext = {
    running: -1,
    instanceAddress: '',
    hasCompleted: false,
    hasClaimed: false,
    factories: [],
    tokens: [],
    amm: undefined,
    dispatch: (state: {}, action: any) => {},
} 

export const LevelContext = createContext<LevelContextType>(defaultContext)

export const LevelProvider = (props: any) => {
  const signer = useWeb3React()
  const { id } = useParams()
  const {LevelLoupeFacet} = useContext(ContractContext)
  const [level, dispatch] = useReducer(levelReducer, defaultContext)
  const {running, instanceAddress, hasCompleted, hasClaimed, factories, tokens, amm} = level

  useEffect(() => {
    if (LevelLoupeFacet && signer.account && id && id !== '2') {
      try {
        fetchLevelState(LevelLoupeFacet!, signer, parseInt(id)).then(result => {
            dispatch({type: "SET_LEVEL_STATE", payload: result})
        })
      } catch (error) {
          console.log(error)
      }
    }
  }, [LevelLoupeFacet, signer, id, dispatch])

  return (
    <LevelContext.Provider value={{running, instanceAddress, hasCompleted, hasClaimed, factories, tokens, amm, dispatch}}>
    {props.children}
    </LevelContext.Provider>
  )
}

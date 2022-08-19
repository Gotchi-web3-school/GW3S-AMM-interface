import { createContext, useReducer, useEffect, useContext } from "react"
import { levelReducer } from "../Reducers/levelReducer"
import { fetchLevelState } from "../Lib/Smart-contracts/Levels"
import { ContractContext } from "./ContractProvider"
import { useWeb3React } from "@web3-react/core"
import { useParams } from "react-router-dom"

export type LevelContextType = {
    running: number,
    instanceAddress: string
    hasCompleted: boolean,
    hasClaimed: boolean,
    factories: string[],
    tokens: string[],
    dispatch: (state: any, action?: Object) => void,
}

const defaultContext = {
    running: -1,
    instanceAddress: '',
    hasCompleted: false,
    hasClaimed: false,
    factories: [],
    tokens: [],
    dispatch: (state: {}, action: any) => {},
} 

export const LevelContext = createContext<LevelContextType>(defaultContext)

export const LevelProvider = (props: any) => {
  const signer = useWeb3React()
  const { id } = useParams()
  const {LevelLoupeFacet} = useContext(ContractContext)
  const [level, dispatch] = useReducer(levelReducer, defaultContext)
  const {running, instanceAddress, hasCompleted, hasClaimed, factories, tokens} = level

  useEffect(() => {
    if (LevelLoupeFacet && signer.account && id) {
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
    <LevelContext.Provider value={{running, instanceAddress, hasCompleted, hasClaimed, factories, tokens, dispatch}}>
    {props.children}
    </LevelContext.Provider>
  )
}

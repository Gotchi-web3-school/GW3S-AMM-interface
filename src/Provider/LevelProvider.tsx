import { createContext, useReducer } from "react"
import { levelReducer } from "../Reducers/levelReducer"

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
    const [level, dispatch] = useReducer(levelReducer, defaultContext)
    const {running, instanceAddress, hasCompleted, hasClaimed, factories, tokens} = level

  return (
    <LevelContext.Provider value={{running, instanceAddress, hasCompleted, hasClaimed, factories, tokens, dispatch}}>
    {props.children}
    </LevelContext.Provider>
  )
}

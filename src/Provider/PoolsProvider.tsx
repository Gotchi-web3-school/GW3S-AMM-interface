import { createContext, useReducer } from "react"
import { DEFAULT_POOLS } from "../Constants";
import { PoolProvider as Pool} from "../Models";
import { poolReducer } from "../Reducers/poolReducer"

const defaultContext: Pool = {
    tokenA: undefined,
    tokenALogo: undefined,
    tokenB: undefined,
    tokenBLogo: undefined,
    pools: DEFAULT_POOLS,
    dispatch: (state: {}, action: any) => {},
} 

export const PoolContext = createContext<Pool>(defaultContext);

export const PoolProvider = (props: any) => {
    const [pool, dispatch] = useReducer(poolReducer, defaultContext)
    const { tokenA, tokenALogo, tokenB, tokenBLogo, pools} = pool

    return (
        <PoolContext.Provider value={{tokenA, tokenALogo, tokenB, tokenBLogo, pools, dispatch}}>
        {props.children}
        </PoolContext.Provider>)
}
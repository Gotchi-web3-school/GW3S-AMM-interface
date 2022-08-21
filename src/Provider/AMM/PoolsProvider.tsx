import { createContext, useReducer } from "react"
import { Token} from "gotchiw3s-sdk";
import { Pool, IPool } from "../../Models";
import { DEFAULT_POOLS } from "../../Constants";
import { poolReducer } from "../../Reducers/AMM/poolReducer"

export type PoolContextType = {
    tokenA: Token | undefined,
    tokenALogo: string | undefined,
    tokenB: Token | undefined,
    tokenBLogo: string | undefined,
    pools: Pool[],
    pool?: IPool,
    dispatch: (action: any, state?: Object,) => void,
}

const defaultContext: PoolContextType = {
    tokenA: undefined,
    tokenALogo: undefined,
    tokenB: undefined,
    tokenBLogo: undefined,
    pools: DEFAULT_POOLS,
    dispatch: (state: {}, action: any) => {},
} 

export const PoolContext = createContext<PoolContextType>(defaultContext);

export const PoolProvider = (props: any) => {
    const [pool, dispatch] = useReducer(poolReducer, defaultContext)
    const { tokenA, tokenALogo, tokenB, tokenBLogo, pools} = pool

    return (
        <PoolContext.Provider value={{tokenA, tokenALogo, tokenB, tokenBLogo, pools, dispatch}}>
        {props.children}
        </PoolContext.Provider>)
}
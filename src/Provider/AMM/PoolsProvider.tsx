import React, { createContext, useReducer } from "react"
import { Token} from "gotchiw3s-sdk";
import { Pool, IPool } from "../../Models";
import { DEFAULT_POOLS } from "../../Constants";
import { DEFAULT_TOKEN_LIST } from "../../Constants/list";
import { poolReducer } from "../../Reducers/AMM/poolReducer"
import { TokenList } from "../../Constants/list";

export type PoolContextType = {
    tokenA: Token | undefined,
    tokenALogo: string | undefined,
    tokenB: Token | undefined,
    tokenBLogo: string | undefined,
    pools: Pool[],
    pool?: IPool,
    defaultTokenList: TokenList[],
    dispatch: (action: any, state?: Object,) => void,
}

const defaultContext: PoolContextType = {
    tokenA: undefined,
    tokenALogo: undefined,
    tokenB: undefined,
    tokenBLogo: undefined,
    pools: [],
    defaultTokenList: [],
    dispatch: (state: {}, action: any) => {},
} 

export const PoolContext = createContext<PoolContextType>(defaultContext);

export const PoolProvider: React.FC<{pools?: Pool[], defaultTokenList?: TokenList[], children: React.ReactNode}> = ({
    pools=DEFAULT_POOLS, 
    defaultTokenList=DEFAULT_TOKEN_LIST, 
    children
}) => {
    const [pool, dispatch] = useReducer(poolReducer, defaultContext)
    const { tokenA, tokenALogo, tokenB, tokenBLogo} = pool

    return (
        <PoolContext.Provider value={{tokenA, tokenALogo, tokenB, tokenBLogo, pools, defaultTokenList, dispatch}}>
        {children}
        </PoolContext.Provider>)
}
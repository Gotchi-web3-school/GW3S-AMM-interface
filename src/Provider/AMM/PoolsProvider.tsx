import React, { createContext, useReducer } from "react"
import { Token} from "gotchiw3s-sdk";
import { Pool, IPool } from "../../Models";
import { DEFAULT_FACTORY_ADDRESS, DEFAULT_INIT_CODE_HASH, DEFAULT_POOLS } from "../../Constants";
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
    factory?: string
    initCode?: string 
    dispatch: (action: any, state?: Object,) => void,
}

const defaultContext: PoolContextType = {
    tokenA: undefined,
    tokenALogo: undefined,
    tokenB: undefined,
    tokenBLogo: undefined,
    pools: [],
    defaultTokenList: [],
    factory: undefined,
    initCode: undefined,
    dispatch: (state: {}, action: any) => {},
} 

export const PoolContext = createContext<PoolContextType>(defaultContext);

export const PoolProvider: React.FC<{defaultPools?: Pool[], defaultTokenList?: TokenList[], factory?: string, initCode?: string, children: React.ReactNode}> = ({
    defaultPools=DEFAULT_POOLS, 
    defaultTokenList=DEFAULT_TOKEN_LIST, 
    factory=DEFAULT_FACTORY_ADDRESS,
    initCode=DEFAULT_INIT_CODE_HASH,
    children
}) => {
    const [pool, dispatch] = useReducer(poolReducer, {...defaultContext, factory: factory, initCode: initCode, pools: defaultPools})
    const { tokenA, tokenALogo, tokenB, tokenBLogo, pools} = pool

    return (
        <PoolContext.Provider value={{tokenA, tokenALogo, tokenB, tokenBLogo, pools, defaultTokenList, factory, dispatch}}>
        {children}
        </PoolContext.Provider>)
}
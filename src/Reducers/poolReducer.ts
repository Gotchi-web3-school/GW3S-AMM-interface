import { Token, TokenAmount, Pair } from "quickswap-sdk"
import { PoolProvider, Pool } from "../Models"

export const poolReducer = (state: PoolProvider, action: any): PoolProvider => {
    const {tokenA, tokenALogo, tokenB, tokenBLogo, pools} = state;

    switch(action.type) {
        case 'SET_IMPORTED_TOKEN':
            const {id, token} = action.payload
            const newToken = new Token(token.chainId, token.address, token.decimals, token.symbol, token.name)
            if (id === 0)
                return {...state, tokenA: newToken, tokenALogo: token.logoURI}
            else
                return {...state, tokenB: newToken, tokenBLogo: token.logoURI}

        case 'SET_POOL':
            const amountA = new TokenAmount(tokenA!, "0")
            const amountB = new TokenAmount(tokenB!, "0")
            const pair = new Pair(amountA, amountB)
            const name = tokenA!.symbol + " - " + tokenB!.symbol
            const tokensUri = {tokenA: tokenALogo, tokenB: tokenBLogo}
            const pool = new Pool(name, pair, tokensUri)
            pools.unshift(pool)

            const array: number[] = []
            // Filter all the similar pool element
            const newPools = pools.filter((prev) => {
                if (array[parseInt(prev.pair.liquidityToken.address)] !== 1) {
                    array[parseInt(prev.pair.liquidityToken.address)] = 1
                    return true;
                } else {
                    return false
                }
            })
            return {...state, pools: newPools,  tokenA: undefined, tokenALogo: undefined, tokenB: undefined, tokenBLogo: undefined}

      default:
        throw new Error(`Unsupported action type ${action.type} in userReducer`)
    }
  }
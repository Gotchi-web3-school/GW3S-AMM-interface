import { ethers } from "ethers";
import { keccak256, arrayify } from "ethers/lib/utils";
import { Token} from "quickswap-sdk"
import { PoolProvider, Pool } from "../Models"
import { FACTORY_ADDRESS, INIT_CODE_HASH } from "quickswap-sdk";

export const poolReducer = (state: PoolProvider, action: any): PoolProvider => {
    const {tokenA, tokenALogo, tokenB, tokenBLogo, pools, pool} = state;

    // POOLS COMPONENT
    switch(action.type) {
        case 'SET_IMPORTED_TOKEN':
            const {id, token} = action.payload
            const newToken = new Token(token.chainId, token.address, token.decimals, token.symbol, token.name)
            if (id === 0)
                return {...state, tokenA: newToken, tokenALogo: token.logoURI}
            else
                return {...state, tokenB: newToken, tokenBLogo: token.logoURI}

        case 'SET_POOL':
            const name = tokenA!.symbol + " - " + tokenB!.symbol
            const tokensUri = {tokenA: tokenALogo, tokenB: tokenBLogo}
            const addrA = arrayify(tokenA!.address)
            const addrB = arrayify(tokenB!.address)
            const bytesArray = ethers.utils.concat([addrA, addrB])
            const newPool: Pool = new Pool(parseInt(keccak256(bytesArray)), name, tokenA!, tokenB!, FACTORY_ADDRESS, INIT_CODE_HASH, tokensUri)
            pools.unshift(newPool)

            const array: number[] = []
            // Filter all the similar pool element
            const newPools: Pool[] = pools.filter((prev) => {
                if (array[parseInt(prev.pair.liquidityToken.address)] !== 1) {
                    array[parseInt(prev.pair.liquidityToken.address)] = 1
                    return true;
                } else {
                    return false
                }
            })
            return {...state, pools: newPools,  tokenA: undefined, tokenALogo: undefined, tokenB: undefined, tokenBLogo: undefined}

        // CARD POOL ONLY
        case "SET_CARD_POOL_STATE":
            return {...state, pool: action.payload}
        
        case "SET_ISPOOL":
            pool!.isPool = true
            pool!.lpToken.token = action.payload
            return {...state, pool: pool};
        
        case "SET_POOL_BALANCE":
            pool!.lpToken.balance = action.payload.balance.toSignificant(3)
            pool!.tokenA.pooled = action.payload.amountA.toSignificant(3)
            pool!.tokenB.pooled = action.payload.amountB.toSignificant(3)
            pool!.lpToken.share = action.payload.share
            //const TokenABalance = new TokenAmount(action.payload.token , ethers.utils.parseEther(action.payload.amount).toString())
            return {...state, pool: pool}

        case "LOADING":
            action.payload === 0 ? pool!.tokenA.loading = !pool!.tokenA.loading :  pool!.tokenB.loading = !pool!.tokenB.loading
            return {...state, pool: pool}
        
        case "APPROVED":
            action.payload === 0 ? pool!.tokenA.isApproved = true : pool!.tokenB.isApproved = true
            return {...state, pool: pool}

      default:
        throw new Error(`Unsupported action type ${action.type} in userReducer`)
    }
  }
import { IPool } from "../Models"

export const poolCardReducer = (state: IPool, action: any): IPool => {
    let {isPool, liquidityToken, balance, tokenA, tokenB, share} = state;

    // POOLS COMPONENT
    switch(action.type) {
        
        case "SET_ISPOOL":
            isPool = true
            liquidityToken = action.payload
            return {...state, isPool: isPool, liquidityToken: liquidityToken};
        
        case "SET_POOL_BALANCE":
           balance = action.payload.balance.toSignificant(3)
           tokenA.pooled = action.payload.amountA.toSignificant(3)
           tokenB.pooled = action.payload.amountB.toSignificant(3)
           share = action.payload.share
            //const TokenABalance = new TokenAmount(action.payload.token , ethers.utils.parseEther(action.payload.amount).toString())
            return {...state, balance: balance, tokenA: tokenA, tokenB: tokenB, share: share }

        case "LOADING":
            action.payload === 0 ?tokenA.loading = !tokenA.loading : tokenB.loading = !tokenB.loading
            return {...state, tokenA: tokenA, tokenB: tokenB}
        
        case "APPROVED":
            action.payload === 0 ?tokenA.isApproved = true :tokenB.isApproved = true
            return {...state, tokenA: tokenA, tokenB: tokenB}

      default:
        throw new Error(`Unsupported action type ${action.type} in userReducer`)
    }
  }
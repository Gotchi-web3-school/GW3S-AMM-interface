
export const swapReducer = (state: any, action: any) => {
    let {tokenA, tokenB} = state;

    // POOLS COMPONENT
    switch(action.type) {
        
        case "RESET":
            tokenA.balance.amount = undefined
            tokenB.balance.amount = undefined
            return {...state, tokenA: tokenA, tokenB: tokenB}

      default:
        throw new Error(`Unsupported action type ${action.type} in userReducer`)
    }
  }